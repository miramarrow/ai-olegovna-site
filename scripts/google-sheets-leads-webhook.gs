const SHEET_NAME = "Leads";
const HEADERS = [
  "created_at",
  "lead_id",
  "form_type",
  "name",
  "preferred_contact",
  "phone",
  "telegram",
  "service",
  "start_format",
  "comment",
  "answers_json",
  "page_url",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
];

function doPost(event) {
  const expectedSecret = PropertiesService.getScriptProperties().getProperty("SHEETS_WEBHOOK_SECRET");
  const payload = JSON.parse((event.postData && event.postData.contents) || "{}");

  if (!expectedSecret || payload.secret !== expectedSecret) {
    return jsonResponse({ ok: false, error: "unauthorized" });
  }

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  ensureHeaders(sheet);

  const row = payload.row || {};
  sheet.appendRow(HEADERS.map(function (header) {
    return row[header] || "";
  }));

  return jsonResponse({ ok: true });
}

function ensureHeaders(sheet) {
  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = HEADERS.every(function (header, index) {
    return currentHeaders[index] === header;
  });

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
