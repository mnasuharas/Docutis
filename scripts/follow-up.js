"use strict";

const { loadData, loadFollowUpData, validateFollowUpReview } = require("./clinical-review");

const allowedModalities = new Set(["clinical_examination", "lymph_node_ultrasound", "s100b", "cross_sectional_imaging"]);
const allowedRecommendationStatuses = new Set(["scheduled", "conditional", "not_routinely_scheduled"]);
const allowedRecommendationCharacters = new Set(["soll", "sollte", "sollte (EK)", "Schema 9.2"]);
const allowedConsensusStrengths = new Set(["Konsens", "Starker Konsens", "Konsensstärke 100 %"]);

function validPartialDate(value) {
  return typeof value === "string" && /^\d{4}-(?:0[1-9]|1[0-2])$/.test(value);
}

function validIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function validateRange(protocolId, groupId, period) {
  const keys = Object.keys(period.range);
  const yearRange = keys.includes("fromYear") || keys.includes("toYear");
  const monthRange = keys.includes("fromMonth") || keys.includes("toMonth");
  if (yearRange === monthRange) throw new Error(`${protocolId}/${groupId}/${period.id}: range must use years or months`);
  const from = yearRange ? period.range.fromYear : period.range.fromMonth;
  const to = yearRange ? period.range.toYear : period.range.toMonth;
  if (!Number.isInteger(from) || from <= 0) throw new Error(`${protocolId}/${groupId}/${period.id}: invalid range start`);
  if (to !== null && (!Number.isInteger(to) || to < from)) throw new Error(`${protocolId}/${groupId}/${period.id}: invalid range end`);
}

function validateFrequency(context, recommendation) {
  const frequency = recommendation.frequency;
  if (recommendation.status === "not_routinely_scheduled") {
    if (frequency !== null) throw new Error(`${context}: non-routine recommendation cannot have a frequency`);
    return;
  }
  if (!frequency || typeof frequency !== "object") throw new Error(`${context}: scheduled/conditional recommendation needs structured frequency`);
  if (frequency.kind === "single_timepoint_month") {
    if (!Number.isInteger(frequency.month) || frequency.month <= 0) throw new Error(`${context}: single timepoint month must be greater than zero`);
    return;
  }
  if (!new Set(["interval_months", "occurrences_per_year"]).has(frequency.kind)) throw new Error(`${context}: unsupported frequency kind`);
  if (!Number.isInteger(frequency.min) || !Number.isInteger(frequency.max)) throw new Error(`${context}: frequency bounds must be integers`);
  if (frequency.kind === "interval_months" && frequency.min <= 0) throw new Error(`${context}: interval must be greater than zero`);
  if (frequency.kind === "occurrences_per_year" && frequency.min < 0) throw new Error(`${context}: occurrences cannot be negative`);
  if (frequency.max < frequency.min || frequency.max <= 0) throw new Error(`${context}: invalid frequency range`);
}

function validateFollowUpData(followUpData = loadFollowUpData(), diseaseData = loadData()) {
  if (followUpData.schemaVersion !== 1) throw new Error("Unsupported follow-up schema version");
  const modalityIds = followUpData.modalities.map(item => item.id);
  if (new Set(modalityIds).size !== modalityIds.length || modalityIds.some(id => !allowedModalities.has(id))) throw new Error("Invalid or duplicate modality identifiers");
  if (modalityIds.length !== allowedModalities.size) throw new Error("Follow-up modality registry is incomplete");

  const diseaseIds = new Set(diseaseData.diseases.map(disease => disease.id));
  const protocolIds = new Set();
  const diseaseJurisdictions = new Set();
  for (const protocol of followUpData.protocols) {
    if (!protocol.id?.trim() || protocolIds.has(protocol.id)) throw new Error("Missing or duplicate protocol ID");
    protocolIds.add(protocol.id);
    if (!diseaseIds.has(protocol.diseaseId)) throw new Error(`${protocol.id}: missing disease identifier`);
    if (!protocol.jurisdiction?.trim()) throw new Error(`${protocol.id}: missing jurisdiction`);
    const scope = `${protocol.diseaseId}:${protocol.jurisdiction}`;
    if (diseaseJurisdictions.has(scope)) throw new Error(`${protocol.id}: duplicate disease/jurisdiction protocol`);
    diseaseJurisdictions.add(scope);

    const guideline = protocol.guideline;
    for (const field of ["title", "organization", "guidelineSystem", "version", "registerNumber", "sourceUrl", "recommendationLocation"]) {
      if (typeof guideline?.[field] !== "string" || !guideline[field].trim()) throw new Error(`${protocol.id}: guideline ${field} is required`);
    }
    if (!validPartialDate(guideline.publishedAt)) throw new Error(`${protocol.id}: invalid guideline publication date`);
    if (!validIsoDate(guideline.sourceMetadataCheckedAt)) throw new Error(`${protocol.id}: invalid source metadata check date`);
    if (!/^https:\/\//.test(guideline.sourceUrl)) throw new Error(`${protocol.id}: guideline source must use HTTPS`);
    if (protocol.jurisdiction !== "DE" || protocol.jurisdictionLabel !== "Deutschland") throw new Error(`${protocol.id}: first release must be German guidance`);
    if (!Array.isArray(protocol.groups) || !protocol.groups.length) throw new Error(`${protocol.id}: at least one risk/stage group is required`);

    const groupIds = new Set();
    for (const group of protocol.groups) {
      if (!group.id?.trim() || groupIds.has(group.id)) throw new Error(`${protocol.id}: missing or duplicate group ID`);
      groupIds.add(group.id);
      if (!group.label?.trim() || !group.description?.trim()) throw new Error(`${protocol.id}/${group.id}: group label and description are required`);
      if (!Array.isArray(group.periods) || !group.periods.length) throw new Error(`${protocol.id}/${group.id}: at least one period is required`);
      const periodIds = new Set();
      for (const period of group.periods) {
        if (!period.id?.trim() || periodIds.has(period.id)) throw new Error(`${protocol.id}/${group.id}: missing or duplicate period ID`);
        periodIds.add(period.id);
        if (!period.label?.trim()) throw new Error(`${protocol.id}/${group.id}/${period.id}: period label is required`);
        validateRange(protocol.id, group.id, period);
        if (!Array.isArray(period.recommendations) || !period.recommendations.length) throw new Error(`${protocol.id}/${group.id}/${period.id}: recommendations are required`);
        const seenModalities = new Set();
        for (const recommendation of period.recommendations) {
          const context = `${protocol.id}/${group.id}/${period.id}/${recommendation.modality}`;
          if (!allowedModalities.has(recommendation.modality)) throw new Error(`${context}: unsupported modality`);
          if (seenModalities.has(recommendation.modality)) throw new Error(`${context}: duplicate conflicting recommendation`);
          seenModalities.add(recommendation.modality);
          if (!allowedRecommendationStatuses.has(recommendation.status)) throw new Error(`${context}: unsupported recommendation status`);
          if (!recommendation.recommendationBasis || typeof recommendation.recommendationBasis !== "object") throw new Error(`${context}: recommendation character and consensus are required`);
          for (const field of ["character", "consensus"]) {
            if (typeof recommendation.recommendationBasis[field] !== "string" || !recommendation.recommendationBasis[field].trim()) throw new Error(`${context}: recommendation basis ${field} is required`);
          }
          if (!allowedRecommendationCharacters.has(recommendation.recommendationBasis.character)) throw new Error(`${context}: unsupported recommendation character`);
          if (!allowedConsensusStrengths.has(recommendation.recommendationBasis.consensus)) throw new Error(`${context}: unsupported consensus strength`);
          validateFrequency(context, recommendation);
        }
      }
    }
    validateFollowUpReview(protocol);
  }

  const requiredDiseases = ["cutaneous-melanoma", "basal-cell-carcinoma", "cutaneous-squamous-cell-carcinoma"];
  for (const diseaseId of requiredDiseases) {
    if (!followUpData.protocols.some(protocol => protocol.diseaseId === diseaseId && protocol.jurisdiction === "DE")) throw new Error(`Missing German follow-up protocol for ${diseaseId}`);
  }
  return followUpData;
}

if (require.main === module) {
  try {
    const data = validateFollowUpData();
    console.log(`Validated ${data.protocols.length} German follow-up protocols. This automated check is not clinical review.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { allowedModalities, allowedRecommendationStatuses, allowedRecommendationCharacters, allowedConsensusStrengths, validateFollowUpData, validateRange, validateFrequency };
