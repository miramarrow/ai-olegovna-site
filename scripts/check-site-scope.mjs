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
  if (/AiCodora|aicodora\.com|info@aicodora\.com|@aicodora/.test(content)) {
    failures.push(`${file} still contains old AiCodora legal identity/contact`);
  }
  if (!/Ai, Олеговна!/.test(content)) {
    failures.push(`${file} should identify the project as Ai, Олеговна!`);
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
