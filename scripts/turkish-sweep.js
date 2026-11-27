"use strict";

const { spawn } = require("node:child_process");
const http = require("node:http");

const port = Number(process.env.SWEEP_PORT || 8765);
const widths = [1280, 390];
const englishWord = /\b(the|and|with|from|this|that|which|when|where|should|would|pattern|vessels|vessel|lesion|lesions|diagnosis|treatment|follow|review|required|only|clinical|skin|disease|not|between|after|before|without)\b/i;
const titleCase = /^[A-Z][a-z]+(?:\s+[A-Z][a-zA-Z]+){1,}$/;

function outsideParentheses(value) {
  return value.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
}

function intentional(value) {
  const text = value.trim();
  if (text.length < 3) return true;
  if (/[ğüşıöçĞÜŞİÖÇ]/.test(text)) return true;
  if (/^(Imiquimod|Aldara|Efudix|Tolak|Actikerall|Zyclara|Klisyri|Solaraze|Solacutan|Ameluz|Metvix|Erivedge|Odomzo|Libtayo|Diclofenac|Fluorouracil|Vismodegib|Sonidegib|Cemiplimab|Tirbanibulin|Mohs|MCS|S2k|SmPC|Fachinformation|ICD|Vitiligo|Tinea|BCC|BHK|AK|cSCC|PDT|ALA|MAL|DPD|NSAID)\b/.test(text)) return true;
  if (/^[A-Z]{1,4}\d/.test(text) || /\d{4}\/\d/.test(text)) return true;
  if (/^(GitHub|Docutis|JSON|DOI|WHO|AWMF|German|Germany|English|Türkçe)$/.test(text)) return true;
  return false;
}

function looksEnglish(value) {
  const text = outsideParentheses(value);
  if (!text || intentional(text) || intentional(value)) return false;
  if (titleCase.test(text)) return true;
  return englishWord.test(text) && /[A-Za-z]{4,}/.test(text);
}

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, response => {
      let body = "";
      response.on("data", chunk => { body += chunk; });
      response.on("end", () => resolve(body));
    }).on("error", reject);
  });
}

async function main() {
  const chrome = spawn("google-chrome", [
    "--headless=new", "--disable-gpu", "--no-first-run", "--user-data-dir=/tmp/chrome-docutis-sweep",
    "--remote-debugging-port=9333", "about:blank"
  ], { stdio: "ignore" });
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try { await get("http://127.0.0.1:9333/json/version"); break; }
    catch (error) { await new Promise(resolve => setTimeout(resolve, 200)); }
  }
  const targets = JSON.parse(await get("http://127.0.0.1:9333/json"));
  const page = targets.find(item => item.type === "page");
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) pending.get(message.id)(message.result);
  });
  function send(method, params = {}) {
    const messageId = ++id;
    return new Promise(resolve => {
      pending.set(messageId, resolve);
      socket.send(JSON.stringify({ id: messageId, method, params }));
    });
  }
  await new Promise(resolve => socket.addEventListener("open", resolve));
  const findings = new Map();
  async function scan(label, width) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 700 });
    const result = await send("Runtime.evaluate", {
      expression: `(() => {
        const nodes = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          const el = node.parentElement;
          if (!el || el.closest("script, style, noscript")) continue;
          const text = node.nodeValue.replace(/\\s+/g, " ").trim();
          if (text) nodes.push(text);
        }
        return nodes;
      })()`,
      returnByValue: true
    });
    for (const text of result.result.value || []) {
      if (!looksEnglish(text)) continue;
      const key = text.slice(0, 220);
      if (!findings.has(key)) findings.set(key, new Set());
      findings.get(key).add(`${label}@${width}`);
    }
  }
  await send("Page.navigate", { url: `http://127.0.0.1:${port}/index.html` });
  await new Promise(resolve => setTimeout(resolve, 700));
  await send("Runtime.evaluate", { expression: `localStorage.setItem("docutis-language","tr"); location.reload()` });
  await new Promise(resolve => setTimeout(resolve, 900));
  const list = await send("Runtime.evaluate", {
    expression: `JSON.stringify((window.DOCUTIS_DATA&&window.DOCUTIS_DATA.diseases||[]).map(item=>item.id))`,
    returnByValue: true
  });
  const ids = JSON.parse(list.result.value || "[]");
  const pages = ids.map(id => [`condition ${id}`, `http://127.0.0.1:${port}/index.html?condition=${id}`]);
  if (!process.argv.includes("--conditions-only")) {
    pages.unshift(["home", `http://127.0.0.1:${port}/index.html`]);
    pages.push(["reviewer", `http://127.0.0.1:${port}/academy-review.html`]);
  }
  for (const [label, url] of pages) {
    await send("Page.navigate", { url });
    await new Promise(resolve => setTimeout(resolve, 350));
    for (const width of widths) await scan(label, width);
  }
  socket.close();
  chrome.kill();
  const rows = [...findings.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  console.log(`flagged ${rows.length}`);
  for (const [text, where] of rows) console.log(`- ${text} [${[...where].slice(0, 2).join(", ")}]`);
  if (process.argv.includes("--fail") && rows.length) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exit(1); });
