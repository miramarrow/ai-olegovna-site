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

const pagesWorkflow = read(".github/workflows/static.yml");
if (!pagesWorkflow.includes("VITE_BASE_PATH: /ai-olegovna-site/")) {
  failures.push(".github/workflows/static.yml should build GitHub Pages with VITE_BASE_PATH: /ai-olegovna-site/");
}

if (existsSync(join(root, "public/CNAME"))) {
  failures.push("public/CNAME should be removed because sborkai.ru is served by the Russian VPS, not GitHub Pages");
}

const readme = read("README.md");
const deploymentGuidePath = "docs/deployment/sborkai-nginx.conf";

if (readme.includes("Добавьте `sborkai.ru` и `www.sborkai.ru` в Vercel Project")) {
  failures.push("README.md should not instruct Vercel custom-domain setup for the primary sborkai.ru domain");
}

if (readme.includes("apex ведет на A record `76.76.21.21`")) {
  failures.push("README.md should not point sborkai.ru DNS at Vercel's apex A record");
}

for (const [snippet, label] of [
  ["российский VPS", "README.md should describe the Russian VPS as the primary frontend host"],
  ["Nginx", "README.md should document Nginx static hosting/proxy setup"],
  ["proxy_pass", "README.md should include the API proxy directive"],
  ["/api/telegram-brief", "README.md should preserve the browser API endpoint"],
  ["www.sborkai.ru", "README.md should document the www redirect"],
]) {
  if (!readme.includes(snippet)) {
    failures.push(label);
  }
}

if (!existsSync(join(root, deploymentGuidePath))) {
  failures.push(`${deploymentGuidePath} should provide the VPS Nginx template`);
} else {
  const nginxConfig = read(deploymentGuidePath);
  for (const [snippet, label] of [
    ["try_files $uri $uri/ /index.html", `${deploymentGuidePath} should support SPA fallback routes`],
    ["proxy_pass https://", `${deploymentGuidePath} should proxy the API to Vercel over HTTPS`],
    ["proxy_ssl_server_name on", `${deploymentGuidePath} should enable SNI for the Vercel upstream`],
    ["return 301 https://sborkai.ru$request_uri", `${deploymentGuidePath} should redirect www to the apex domain`],
  ]) {
    if (!nginxConfig.includes(snippet)) {
      failures.push(label);
    }
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
  failures.push("src/config/site.ts should resolve logoUrl with import.meta.env.BASE_URL for GitHub Pages base paths");
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

for (const expected of [
  '<link rel="icon" type="image/png" href="/logo-sborkai.png">',
  '<meta property="og:image" content="/logo-sborkai.png">',
  '<meta name="twitter:image" content="/logo-sborkai.png">',
]) {
  if (!indexHtml.includes(expected)) {
    failures.push(`index.html should include ${expected}`);
  }
}

if (failures.length > 0) {
  console.error("Site scope check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Site scope check passed.");
