"use strict";

/**
 * Docutis URL inventory and optional live probes (dependency-free Node).
 *
 *   node scripts/link-check.js              Offline structural check (default); exit 0 with counts.
 *   node scripts/link-check.js --probe      HEAD/GET each URL (max 1/s, 8s timeout); never fails on network blocks.
 *
 * Scans data.js, case-data.js, followup-data.js, media-data.js, quiz-data.js,
 * pattern-data.js, and index.html for http(s) URLs.
 */

const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const SCANNED_FILES = [
  "data.js",
  "case-data.js",
  "followup-data.js",
  "media-data.js",
  "quiz-data.js",
  "pattern-data.js",
  "index.html"
];
const USER_AGENT = "DocutisLinkCheck/1.0";
const PROBE_TIMEOUT_MS = 8000;
const PROBE_INTERVAL_MS = 1000;

const URL_PATTERN = /https?:\/\/[^\s"'<>\\)]+/gi;

function stripTrailPunctuation(url) {
  return url.replace(/[),.;:'"\]]+$/g, "");
}

function collectUrlsFromText(text, sourceFile) {
  const found = [];
  for (const match of text.matchAll(URL_PATTERN)) {
    const raw = match[0];
    const url = stripTrailPunctuation(raw);
    found.push({ url, sourceFile, index: match.index });
  }
  return found;
}

function plausibleHost(url) {
  let host;
  try {
    host = new URL(url).hostname;
  } catch {
    return false;
  }
  if (!host) return false;
  if (host === "localhost") return true;
  if (host.includes(" ")) return false;
  return host.includes(".") && /^[a-z0-9.-]+$/i.test(host);
}

function structuralFailure(entry, reason) {
  return { url: entry.url, sourceFile: entry.sourceFile, reason };
}

function validateStructural(entries) {
  const failures = [];
  const seen = new Set();
  const unique = [];
  for (const entry of entries) {
    const key = `${entry.sourceFile}\0${entry.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(entry);
    if (/\s/.test(entry.url)) {
      failures.push(structuralFailure(entry, "URL contains whitespace"));
      continue;
    }
    if (!/^https?:\/\//i.test(entry.url)) {
      failures.push(structuralFailure(entry, "URL must use http or https"));
      continue;
    }
    if (!plausibleHost(entry.url)) {
      failures.push(structuralFailure(entry, "hostname is missing or not plausible"));
    }
  }
  return { unique, failures };
}

function scanRepository(rootDir = ROOT) {
  const entries = [];
  for (const file of SCANNED_FILES) {
    const full = path.join(rootDir, file);
    const text = fs.readFileSync(full, "utf8");
    entries.push(...collectUrlsFromText(text, file));
  }
  return validateStructural(entries);
}

function resolveLogPath(rootDir = ROOT) {
  const artifacts = "/opt/cursor/artifacts/link-check.log";
  if (fs.existsSync("/opt/cursor/artifacts")) return artifacts;
  return path.join(rootDir, "link-check.log");
}

function requestOnce(url, method) {
  return new Promise(resolve => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch (error) {
      resolve({ ok: false, status: null, error: error.message, blocked: false });
      return;
    }
    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.request(
      parsed,
      { method, headers: { "User-Agent": USER_AGENT }, timeout: PROBE_TIMEOUT_MS },
      res => {
        res.resume();
        const status = res.statusCode || 0;
        const ok = status >= 200 && status < 400;
        resolve({ ok, status, error: null, blocked: false });
      }
    );
    req.on("timeout", () => {
      req.destroy();
      resolve({ ok: false, status: null, error: "timeout", blocked: true });
    });
    req.on("error", error => {
      const blocked = /ENOTFOUND|ECONNREFUSED|ECONNRESET|ETIMEDOUT|EAI_AGAIN|EPROTO/i.test(error.code || error.message);
      resolve({ ok: false, status: null, error: error.message, blocked });
    });
    req.end();
  });
}

async function probeUrl(url) {
  const head = await requestOnce(url, "HEAD");
  if (head.ok) return head;
  if (head.status === 405 || head.status === 501 || head.status === 403) {
    const get = await requestOnce(url, "GET");
    return get;
  }
  if (head.blocked) return head;
  if (head.status && head.status >= 400) return head;
  return requestOnce(url, "GET");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function probeUrls(urlList) {
  const results = [];
  for (let index = 0; index < urlList.length; index += 1) {
    const url = urlList[index];
    if (index > 0) await sleep(PROBE_INTERVAL_MS);
    const outcome = await probeUrl(url);
    results.push({ url, ...outcome });
  }
  const broken = results.filter(item => !item.ok && !item.blocked && item.status && item.status >= 400);
  const blocked = results.filter(item => !item.ok && item.blocked);
  const unreachable = results.filter(item => !item.ok && !item.blocked && (item.status === null || item.status < 400));
  return { results, broken, blocked, unreachable };
}

function formatSummary({ unique, failures }, probeReport) {
  const lines = [
    `Docutis link check: ${unique.length} unique URL(s) in ${SCANNED_FILES.length} files`,
    `Structural failures: ${failures.length}`
  ];
  for (const failure of failures) {
    lines.push(`  [structural] ${failure.url} (${failure.sourceFile}): ${failure.reason}`);
  }
  if (probeReport) {
    lines.push(
      `Probe: ${probeReport.results.length} checked, ${probeReport.broken.length} broken (4xx/5xx), ` +
        `${probeReport.blocked.length} blocked, ${probeReport.unreachable.length} inconclusive`
    );
    for (const row of probeReport.broken) {
      lines.push(`  [broken] ${row.url} HTTP ${row.status}`);
    }
    for (const row of probeReport.blocked.slice(0, 20)) {
      lines.push(`  [blocked] ${row.url}: ${row.error || "network blocked"}`);
    }
    if (probeReport.blocked.length > 20) {
      lines.push(`  … ${probeReport.blocked.length - 20} more blocked`);
    }
  }
  return lines.join("\n");
}

async function main(argv = process.argv.slice(2), rootDir = ROOT) {
  const probe = argv.includes("--probe");
  const report = scanRepository(rootDir);
  let probeReport = null;
  if (probe) {
    const urls = report.unique.map(item => item.url).sort((a, b) => a.localeCompare(b));
    probeReport = await probeUrls(urls);
  }
  const summary = formatSummary(report, probeReport);
  console.log(summary);
  if (probe) {
    const logPath = resolveLogPath(rootDir);
    try {
      fs.mkdirSync(path.dirname(logPath), { recursive: true });
      fs.writeFileSync(logPath, `${summary}\n`, "utf8");
    } catch {
      fs.writeFileSync(logPath, `${summary}\n`, "utf8");
    }
    console.log(`Wrote ${logPath}`);
  }
  if (report.failures.length) process.exitCode = 1;
  return { ...report, probeReport, summary };
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.message || error);
    process.exitCode = 1;
  });
}

module.exports = {
  SCANNED_FILES,
  collectUrlsFromText,
  validateStructural,
  scanRepository,
  probeUrls,
  main
};