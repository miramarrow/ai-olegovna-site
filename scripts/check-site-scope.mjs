import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const read = (path) => readFileSync(join(root, path), "utf8");

const failures = [];

const forbiddenFiles = [
  "src/pages/Cases.tsx",
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
  [/\/cases\b/, "cases route/link"],
  [/\/reviews\b/, "reviews route/link"],
  [/\/blog\b/, "blog route/link"],
  [/Кейсы|Отзывы|Блог/, "retired Russian nav labels"],
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

if (!existsSync(join(root, "public/CNAME"))) {
  failures.push("public/CNAME should exist for sborkai.ru");
} else if (read("public/CNAME").trim() !== "sborkai.ru") {
  failures.push("public/CNAME should contain sborkai.ru");
}

const brandMark = read("src/components/BrandMark.tsx");

if (!existsSync(join(root, "public/logo-sborkai-wordmark.png"))) {
  failures.push("public/logo-sborkai-wordmark.png should exist as the active header/footer wordmark");
}

if (!brandMark.includes("<img") || !brandMark.includes("siteConfig.logoUrl")) {
  failures.push("src/components/BrandMark.tsx should render the configured PNG logo");
}

const siteConfig = read("src/config/site.ts");

if (!siteConfig.includes("import.meta.env.BASE_URL")) {
  failures.push("src/config/site.ts should resolve logoUrl with import.meta.env.BASE_URL for GitHub Pages base paths");
}

if (siteConfig.includes('logoUrl: "/logo-sborkai-wordmark.png"')) {
  failures.push("src/config/site.ts should not hard-code the logo as a root-relative URL");
}

if (!siteConfig.includes("logo-sborkai-wordmark.png")) {
  failures.push("src/config/site.ts should expose logoUrl for the active brand logo");
}

const header = read("src/components/Header.tsx");
const footer = read("src/components/Footer.tsx");

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
