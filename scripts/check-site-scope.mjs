import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const read = (path) => readFileSync(join(root, path), "utf8");

const failures = [];

const forbiddenFiles = [
  "src/pages/Reviews.tsx",
  "src/pages/Blog.tsx",
  "src/pages/BlogPost.tsx",
  "src/components/TestimonialsSection.tsx",
  "src/components/BlogSliderSection.tsx",
  "src/components/BlogSection.tsx",
  "src/data/blogArticles.ts",
];

for (const file of forbiddenFiles) {
  if (existsSync(join(root, file))) {
    failures.push(`Remove retired site area file: ${file}`);
  }
}

const scopedFiles = [
  "src/App.tsx",
  "src/pages/Index.tsx",
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/pages/Privacy.tsx",
  "src/pages/Terms.tsx",
];

const forbiddenPatterns = [
  [/\/reviews\b/, "reviews route/link"],
  [/\/blog\b/, "blog route/link"],
  [/Отзывы|Блог/, "retired Russian nav labels"],
];

const retiredBuilderPattern = new RegExp(`${"love" + "able"}|${"gpt" + "-" + "engineer"}`, "i");
const retiredBrandPattern = new RegExp(
  [
    "Ai, " + "Оле" + "говна!",
    "Ai" + "O",
    "Оле" + "говна",
    "ai-" + "ole" + "govna",
    "Заявка " + "Ai",
  ].join("|")
);

for (const file of scopedFiles) {
  const content = read(file);
  for (const [pattern, label] of forbiddenPatterns) {
    if (pattern.test(content)) {
      failures.push(`${file} still contains ${label}`);
    }
  }
}

for (const file of ["src/pages/Privacy.tsx", "src/pages/Terms.tsx"]) {
  const content = read(file);
  const oldBrand = "Ai" + "Codora";
  const oldHandle = "@ai" + "codora";
  const oldDomain = "ai" + "codora\\.com";
  const oldMail = "info" + "@" + "ai" + "codora\\.com";
  const oldIdentityPattern = new RegExp(`${oldBrand}|${oldDomain}|${oldMail}|${oldHandle}`);
  if (oldIdentityPattern.test(content)) {
    failures.push(`${file} still contains retired legal identity/contact`);
  }
  if (!/Sborkai|siteConfig\.name/.test(content)) {
    failures.push(`${file} should identify the project as Sborkai through the site config`);
  }
}

const brandScanFiles = [
  "index.html",
  "package.json",
  "package-lock.json",
  "vite.config.ts",
  "README.md",
  "src/config/site.ts",
  "src/components/BrandMark.tsx",
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/data/briefTemplates.ts",
  "src/pages/BriefWebsite.tsx",
  "src/pages/Privacy.tsx",
  "src/pages/Terms.tsx",
];

for (const file of brandScanFiles) {
  const content = read(file);
  if (retiredBuilderPattern.test(content)) {
    failures.push(`${file} still contains retired builder branding`);
  }
  if (retiredBrandPattern.test(content)) {
    failures.push(`${file} still contains retired brand identity`);
  }
}

const indexHtml = read("index.html");
if (!indexHtml.includes("https://sborkai.ru")) {
  failures.push("index.html should include https://sborkai.ru canonical social URL");
}

const defaultSeoTitle = "Sborkai — AI-системы для бизнеса";
const defaultSeoDescription =
  "Разрабатываем AI-системы для бизнеса: нейроофисы, агенты, автоматизации, контент-заводы, сайты и боты для Telegram и MAX.";
const defaultSeoImage = "https://sborkai.ru/logo-sborkai.png";

for (const [snippet, label] of [
  [`<title>${defaultSeoTitle}</title>`, "index.html should expose the default search/share title"],
  [`<meta name="description" content="${defaultSeoDescription}">`, "index.html should expose the default search description"],
  [`<meta property="og:title" content="${defaultSeoTitle}">`, "index.html should expose the default Open Graph title"],
  [`<meta property="og:description" content="${defaultSeoDescription}">`, "index.html should expose the default Open Graph description"],
  [`<meta property="og:image" content="${defaultSeoImage}">`, "index.html should expose an absolute Open Graph image URL"],
  [`<meta name="twitter:title" content="${defaultSeoTitle}">`, "index.html should expose the default Twitter title"],
  [`<meta name="twitter:description" content="${defaultSeoDescription}">`, "index.html should expose the default Twitter description"],
  [`<meta name="twitter:image" content="${defaultSeoImage}">`, "index.html should expose an absolute Twitter image URL"],
  ['<link rel="icon" type="image/png" sizes="1024x1024" href="/logo-sborkai.png">', "index.html should expose the logo PNG favicon"],
  ['<link rel="apple-touch-icon" href="/logo-sborkai.png">', "index.html should expose the logo touch icon"],
]) {
  if (!indexHtml.includes(snippet)) {
    failures.push(label);
  }
}

const canonicalUrls = [
  "https://sborkai.ru/",
  "https://sborkai.ru/about",
  "https://sborkai.ru/services",
  "https://sborkai.ru/services/neuro-office",
  "https://sborkai.ru/services/ai-agents",
  "https://sborkai.ru/services/content-factory",
  "https://sborkai.ru/services/automation",
  "https://sborkai.ru/services/website-development",
  "https://sborkai.ru/services/telegram-max-bots",
  "https://sborkai.ru/services/max-automation",
  "https://sborkai.ru/services/support",
  "https://sborkai.ru/cases",
  "https://sborkai.ru/pricing",
  "https://sborkai.ru/faq",
  "https://sborkai.ru/contacts",
  "https://sborkai.ru/privacy",
  "https://sborkai.ru/terms",
];

if (!existsSync(join(root, "public/sitemap.xml"))) {
  failures.push("public/sitemap.xml should exist for search engine discovery");
} else {
  const sitemap = read("public/sitemap.xml");
  for (const url of canonicalUrls) {
    if (!sitemap.includes(`<loc>${url}</loc>`)) {
      failures.push(`public/sitemap.xml should include ${url}`);
    }
  }
}

const robots = read("public/robots.txt");
if (!robots.includes("Sitemap: https://sborkai.ru/sitemap.xml")) {
  failures.push("public/robots.txt should include the sborkai sitemap URL");
}

if (!existsSync(join(root, "src/config/seo.ts"))) {
  failures.push("src/config/seo.ts should define route SEO metadata");
} else {
  const seoConfig = read("src/config/seo.ts");
  for (const expected of [
    "getSeoForPath",
    "structuredData",
    "Organization",
    "WebSite",
    "ProfessionalService",
    "servicesData",
  ]) {
    if (!seoConfig.includes(expected)) {
      failures.push(`src/config/seo.ts should include ${expected}`);
    }
  }
  for (const url of canonicalUrls) {
    const pathname = new URL(url).pathname;
    const routePath = pathname === "/" ? "/" : pathname;
    if (!seoConfig.includes(`"${routePath}"`)) {
      failures.push(`src/config/seo.ts should include metadata for ${routePath}`);
    }
  }
}

if (!existsSync(join(root, "src/components/Seo.tsx"))) {
  failures.push("src/components/Seo.tsx should apply route metadata in the SPA");
} else {
  const seoComponent = read("src/components/Seo.tsx");
  for (const expected of [
    "document.title",
    "link[rel=\"canonical\"]",
    "og:title",
    "twitter:title",
    "application/ld+json",
    "sborkai-jsonld",
  ]) {
    if (!seoComponent.includes(expected)) {
      failures.push(`src/components/Seo.tsx should include ${expected}`);
    }
  }
}

const readme = read("README.md");

if (existsSync(join(root, ".github/workflows/static.yml"))) {
  failures.push(".github/workflows/static.yml should not deploy GitHub Pages after the VPS migration");
}

if (existsSync(join(root, "public/CNAME"))) {
  failures.push("public/CNAME should not claim sborkai.ru after the VPS migration");
}

for (const [snippet, label] of [
  ["Beget VPS", "README.md should describe Beget VPS as the production host"],
  ["109.172.36.182", "README.md should document the Beget VPS A record"],
  ["sborkai.ru", "README.md should document the custom domain"],
  ["/api/telegram-brief", "README.md should preserve the browser API endpoint"],
  ["server/production-server.ts", "README.md should document the standalone Node runtime"],
]) {
  if (!readme.includes(snippet)) {
    failures.push(label);
  }
}

if (existsSync(join(root, "vercel.json"))) {
  failures.push("vercel.json should not remain after the Beget VPS migration");
}

if (!existsSync(join(root, "server/production-server.ts"))) {
  failures.push("server/production-server.ts should provide the VPS Node runtime");
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

const packageJson = JSON.parse(read("package.json"));
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

const brandMark = read("src/components/BrandMark.tsx");

if (!existsSync(join(root, "public/logo-sborkai-wordmark.png"))) {
  failures.push("public/logo-sborkai-wordmark.png should exist as the active header/footer wordmark");
}

if (!brandMark.includes("<img") || !brandMark.includes("siteConfig.logoUrl")) {
  failures.push("src/components/BrandMark.tsx should render the configured PNG logo");
}

const siteConfig = read("src/config/site.ts");
const app = read("src/App.tsx");
const indexPage = read("src/pages/Index.tsx");

if (!siteConfig.includes("import.meta.env.BASE_URL")) {
  failures.push("src/config/site.ts should resolve logoUrl with import.meta.env.BASE_URL");
}

if (siteConfig.includes('logoUrl: "/logo-sborkai-wordmark.png"')) {
  failures.push("src/config/site.ts should not hard-code the logo as a root-relative URL");
}

if (!siteConfig.includes("logo-sborkai-wordmark.png")) {
  failures.push("src/config/site.ts should expose logoUrl for the active brand logo");
}

if (!existsSync(join(root, "src/pages/Cases.tsx"))) {
  failures.push("src/pages/Cases.tsx should exist as the cases page");
}

if (!existsSync(join(root, "src/components/CasesSection.tsx"))) {
  failures.push("src/components/CasesSection.tsx should exist as the homepage cases section");
}

if (!app.includes('import Cases from "./pages/Cases"') || !app.includes('path="/cases"')) {
  failures.push("src/App.tsx should register the /cases route");
}

if (!app.includes('import Seo from "@/components/Seo"') || !app.includes("<Seo />")) {
  failures.push("src/App.tsx should mount the route SEO component inside the router");
}

if (!indexPage.includes("CasesSection") || !indexPage.includes("<CasesSection />")) {
  failures.push("src/pages/Index.tsx should render the homepage cases section");
}

const casesLinkCount = siteConfig.match(/\{ name: "Кейсы", href: "\/cases" \}/g)?.length ?? 0;
if (casesLinkCount < 2) {
  failures.push("src/config/site.ts should expose Cases in top navigation and footer links");
}

const header = read("src/components/Header.tsx");
const footer = read("src/components/Footer.tsx");
const contacts = read("src/pages/Contacts.tsx");

const activeContactExpectations = [
  [siteConfig, 'telegramLabel: "@sborkairu"', "src/config/site.ts should expose @sborkairu as the direct Telegram contact"],
  [siteConfig, 'telegramUrl: "https://t.me/sborkairu"', "src/config/site.ts should expose the direct Telegram URL"],
  [siteConfig, 'instagramLabel: "@ai_olegovnaa"', "src/config/site.ts should expose the Instagram handle"],
  [siteConfig, 'instagramUrl: "https://www.instagram.com/ai_olegovnaa"', "src/config/site.ts should expose the Instagram URL"],
  [siteConfig, 'telegramChannelLabel: "@ai_olegovna"', "src/config/site.ts should expose the Telegram channel handle"],
  [siteConfig, 'telegramChannelUrl: "https://t.me/ai_olegovna"', "src/config/site.ts should expose the Telegram channel URL"],
  [header, "instagramUrl", "src/components/Header.tsx should include Instagram in contact actions"],
  [header, "telegramChannelUrl", "src/components/Header.tsx should include the Telegram channel in contact actions"],
  [footer, "instagramUrl", "src/components/Footer.tsx should include Instagram in contact actions"],
  [footer, "telegramChannelUrl", "src/components/Footer.tsx should include the Telegram channel in contact actions"],
  [contacts, "instagramUrl", "src/pages/Contacts.tsx should include Instagram on the contacts page"],
  [contacts, "telegramChannelUrl", "src/pages/Contacts.tsx should include the Telegram channel on the contacts page"],
];

for (const [content, expected, label] of activeContactExpectations) {
  if (!content.includes(expected)) {
    failures.push(label);
  }
}

for (const [content, label] of [
  [siteConfig, "src/config/site.ts"],
  [header, "src/components/Header.tsx"],
  [footer, "src/components/Footer.tsx"],
  [contacts, "src/pages/Contacts.tsx"],
]) {
  if (content.includes("@miramarrow") || content.includes("https://t.me/miramarrow")) {
    failures.push(`${label} should not expose the retired Telegram contact`);
  }
}

if (header.includes('className="hidden text-base font-semibold text-foreground sm:inline">{siteConfig.name}</span>')) {
  failures.push("src/components/Header.tsx should use the wordmark image instead of separate brand text");
}

if (footer.includes('className="text-xl font-bold">{siteConfig.name}</span>')) {
  failures.push("src/components/Footer.tsx should use the wordmark image instead of separate brand text");
}

if (failures.length > 0) {
  console.error("Site scope check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Site scope check passed.");
