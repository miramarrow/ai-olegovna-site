import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const read = (path) => readFileSync(join(root, path), "utf8");

const failures = [];

const packageJson = JSON.parse(read("package.json"));
const readme = read("README.md");

if (existsSync(join(root, "vercel.json"))) {
  failures.push("vercel.json should be removed now that production runs on the Beget VPS");
}

if (readme.includes("Vercel")) {
  failures.push("README.md should not describe Vercel as part of the active production path");
}

for (const expected of [
  "Beget VPS",
  "109.172.36.182",
  "POST /api/telegram-brief",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
]) {
  if (!readme.includes(expected)) {
    failures.push(`README.md should document ${expected}`);
  }
}

if (!existsSync(join(root, "server/production-server.ts"))) {
  failures.push("server/production-server.ts should provide the standalone VPS runtime");
}

for (const file of [
  "deploy/nginx/sborkai.conf",
  "deploy/systemd/sborkai.service",
  "deploy/sborkai.env.example",
]) {
  if (!existsSync(join(root, file))) {
    failures.push(`${file} should document the VPS deployment shape`);
  }
}

for (const [scriptName, expectedCommand] of [
  ["build:client", "vite build"],
  ["build:server", "esbuild server/production-server.ts"],
  ["build:production", "npm run build:client && npm run build:server"],
  ["start", "node dist/server.mjs"],
]) {
  const actual = packageJson.scripts?.[scriptName];
  if (typeof actual !== "string" || !actual.includes(expectedCommand)) {
    failures.push(`package.json should define ${scriptName} with ${expectedCommand}`);
  }
}

if (failures.length > 0) {
  console.error("VPS runtime check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("VPS runtime check passed.");
