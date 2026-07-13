import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const failures = [];

const walk = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const absolutePath = join(directory, entry);
    return statSync(absolutePath).isDirectory() ? walk(absolutePath) : [absolutePath];
  });

const sourceFiles = ["src", "server", "api"]
  .map((directory) => join(root, directory))
  .filter(existsSync)
  .flatMap(walk)
  .filter((file) => /\.(?:ts|tsx)$/.test(file));

const forbiddenFiles = [
  "api/telegram-brief.ts",
  "src/components/CookieConsentBanner.tsx",
  "src/components/MobileBriefCta.tsx",
  "src/components/PersonalDataConsentCheckbox.tsx",
  "src/components/ProjectDiscussForm.tsx",
  "src/components/QuickServiceBriefDialog.tsx",
  "src/lib/leadDelivery.ts",
  "src/pages/Contacts.tsx",
  "src/pages/PersonalDataConsent.tsx",
];

for (const file of forbiddenFiles) {
  if (existsSync(join(root, file))) failures.push(`Remove data-collection surface: ${file}`);
}

const forbiddenPatterns = [
  [/\/api\/telegram-brief/, "lead API route"],
  [/siteConfig\.contacts/, "public contact configuration"],
  [/href=["'{][^\n]*(?:mailto:|tel:|https:\/\/t\.me\/)/, "contact link"],
  [/<form\b/, "interactive form"],
  [/ProjectDiscussForm|QuickServiceBriefDialog|PersonalDataConsentCheckbox/, "lead form component"],
  [/CookieConsentBanner/, "cookie consent UI"],
  [/submitLeadPayload/, "lead submission helper"],
  [/["']\/contacts(?:[#"'])/, "contacts route or link"],
  [/legal@sborkai\.ru|\+7 993 257-77-40|\+79932577740|@sborkairu/, "published contact detail"],
];

for (const absolutePath of sourceFiles) {
  const content = readFileSync(absolutePath, "utf8");
  const file = relative(root, absolutePath);

  for (const [pattern, label] of forbiddenPatterns) {
    if (pattern.test(content)) failures.push(`${file} still contains ${label}`);
  }
}

const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
for (const retiredUrl of ["/contacts", "/personal-data-consent"]) {
  if (sitemap.includes(`https://sborkai.ru${retiredUrl}`)) {
    failures.push(`public/sitemap.xml should not publish ${retiredUrl}`);
  }
}

const privacy = readFileSync(join(root, "src/pages/Privacy.tsx"), "utf8");
for (const requiredText of [
  "не использует формы",
  "не использует системы веб-аналитики",
  "не устанавливает необязательные cookie",
]) {
  if (!privacy.includes(requiredText)) failures.push(`Privacy notice should state: ${requiredText}`);
}

if (failures.length > 0) {
  throw new Error(`Informational-site check failed:\n- ${failures.join("\n- ")}`);
}

console.log("Informational-site check passed");
