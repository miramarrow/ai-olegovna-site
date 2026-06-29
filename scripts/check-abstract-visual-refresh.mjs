import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const read = (path) => readFileSync(join(process.cwd(), path), "utf8");
const assertIncludes = (content, expected, label) => {
  if (!content.includes(expected)) {
    throw new Error(`${label} should include ${expected}`);
  }
};
const assertNotIncludes = (content, forbidden, label) => {
  if (content.includes(forbidden)) {
    throw new Error(`${label} should not include ${forbidden}`);
  }
};
const listFiles = (dir) =>
  readdirSync(join(process.cwd(), dir), { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      return listFiles(path);
    }
    return path;
  });

const requiredFiles = [
  "src/components/HeroAbstractVisual.tsx",
  "src/components/AbstractServiceMark.tsx",
  "src/components/ServiceAbstractVisual.tsx",
  "src/components/QuickServiceBriefDialog.tsx",
  "src/components/LaunchProcessSection.tsx",
  "src/components/MobileBriefCta.tsx",
];

for (const path of requiredFiles) {
  if (!existsSync(join(process.cwd(), path))) {
    throw new Error(`Missing ${path}`);
  }
}

const hero = read("src/components/Hero.tsx");
assertIncludes(hero, "<h1", "Hero");
assertIncludes(hero, "aria-label=\"Разрабатываем под ключ нейроофисы, AI-агентов, контент-заводы, боты Telegram/MAX, автоматизации и сайты\"", "Hero headline");
assertIncludes(hero, "Разрабатываем под ключ", "Hero headline");
assertIncludes(hero, "<RotatingText", "Hero headline");
assertIncludes(hero, "<HeroAbstractVisual", "Hero");
assertNotIncludes(hero, "const directions", "Hero");
assertNotIncludes(hero, "BrainCircuit", "Hero");
assertNotIncludes(hero, "Factory", "Hero");
assertNotIncludes(hero, "Workflow", "Hero");
assertNotIncludes(hero, "<span>Делаем</span>", "Hero");
assertIncludes(hero, "initial={{ opacity: 0, y: 8 }}", "Hero rotating text");
assertIncludes(hero, "exit={{ opacity: 0, y: -8 }}", "Hero rotating text");
assertNotIncludes(hero, "mainClassName=\"max-w-full overflow-hidden", "Hero rotating text");
assertNotIncludes(hero, "splitLevelClassName=\"overflow-hidden pb-1\"", "Hero rotating text");
assertNotIncludes(hero, "initial={{ y: \"100%\" }}", "Hero rotating text");
assertNotIncludes(hero, "exit={{ y: \"-120%\" }}", "Hero rotating text");

const servicesData = read("src/pages/services/servicesData.ts");
assertNotIncludes(servicesData, "lucide-react", "servicesData");
assertNotIncludes(servicesData, "LucideIcon", "servicesData");
assertNotIncludes(servicesData, "icon:", "servicesData");
assertNotIncludes(servicesData, "@/assets/services", "servicesData");
assertNotIncludes(servicesData, ".jpg", "servicesData");
assertNotIncludes(servicesData, ".png", "servicesData");
assertNotIncludes(servicesData, ".mp4", "servicesData");
assertNotIncludes(servicesData, "image:", "servicesData");
assertNotIncludes(servicesData, "image: string", "servicesData");

const serviceMarkCount = [...servicesData.matchAll(/mark:\s*"/g)].length;
if (serviceMarkCount !== 8) {
  throw new Error(`servicesData should define 8 abstract mark keys, got ${serviceMarkCount}`);
}

const servicesSection = read("src/components/ServicesSection.tsx");
assertIncludes(servicesSection, "ServiceAbstractVisual", "ServicesSection");
assertIncludes(servicesSection, "AbstractServiceMark", "ServicesSection");
assertIncludes(servicesSection, "QuickServiceBriefDialog", "ServicesSection quick dialog");
assertIncludes(servicesSection, "Carousel", "ServicesSection carousel");
assertIncludes(servicesSection, "CarouselContent", "ServicesSection carousel");
assertIncludes(servicesSection, "CarouselItem", "ServicesSection carousel");
assertIncludes(servicesSection, "basis-full md:basis-1/2 lg:basis-1/3", "ServicesSection responsive slides");
assertIncludes(servicesSection, "padStart(2, \"0\")", "ServicesSection numbering");
assertIncludes(servicesSection, "Обсудить", "ServicesSection discuss CTA");
assertIncludes(servicesSection, "lg:grid-cols-[1fr_auto]", "ServicesSection intro CTA alignment");
assertNotIncludes(servicesSection, "featuredMark", "ServicesSection intro visual");
assertNotIncludes(servicesSection, "Card", "ServicesSection");
assertNotIncludes(servicesSection, "service.icon", "ServicesSection");
assertNotIncludes(servicesSection, "service.image", "ServicesSection");
assertNotIncludes(servicesSection, "<img", "ServicesSection");
assertNotIncludes(servicesSection, "<video", "ServicesSection");

const servicesPage = read("src/pages/Services.tsx");
assertIncludes(servicesPage, "activeService", "Services page active panel");
assertIncludes(servicesPage, "setActiveSlug", "Services page active panel");
assertIncludes(servicesPage, "AbstractServiceMark", "Services page");
assertIncludes(servicesPage, "ServiceAbstractVisual", "Services page active visual");
assertIncludes(servicesPage, "QuickServiceBriefDialog", "Services page quick dialog");
assertIncludes(servicesPage, "Carousel", "Services page carousel");
assertIncludes(servicesPage, "CarouselContent", "Services page carousel");
assertIncludes(servicesPage, "CarouselItem", "Services page carousel");
assertIncludes(servicesPage, "padStart(2, \"0\")", "Services page numbering");
assertIncludes(servicesPage, "Подробнее", "Services page CTA");
assertIncludes(servicesPage, "Обсудить", "Services page discuss CTA");
assertNotIncludes(servicesPage, "min-h-[20rem] border border-border", "Services page active visual frame");
assertNotIncludes(servicesPage, "Card", "Services page");
assertNotIncludes(servicesPage, "service.icon", "Services page");
assertNotIncludes(servicesPage, "service.image", "Services page");
assertNotIncludes(servicesPage, "<img", "Services page");
assertNotIncludes(servicesPage, "<video", "Services page");

const serviceTemplate = read("src/pages/services/ServiceTemplate.tsx");
assertIncludes(serviceTemplate, "ServiceAbstractVisual", "ServiceTemplate");
assertIncludes(serviceTemplate, "QuickServiceBriefDialog", "ServiceTemplate quick dialog");
assertIncludes(serviceTemplate, "feature-grid", "ServiceTemplate features");
assertIncludes(serviceTemplate, "case-slider", "ServiceTemplate examples");
assertIncludes(serviceTemplate, "Carousel", "ServiceTemplate examples");
assertIncludes(serviceTemplate, "CarouselContent", "ServiceTemplate examples");
assertIncludes(serviceTemplate, "CarouselItem", "ServiceTemplate examples");
assertIncludes(serviceTemplate, "Ключевые возможности", "ServiceTemplate features");
assertIncludes(serviceTemplate, "Примеры использования", "ServiceTemplate examples");
assertIncludes(serviceTemplate, "padStart(2, \"0\")", "ServiceTemplate numbering");
assertIncludes(serviceTemplate, "Результат", "ServiceTemplate example result");
assertIncludes(serviceTemplate, "Обсудить", "ServiceTemplate hero discuss CTA");
assertNotIncludes(serviceTemplate, "Заполнить бриф", "ServiceTemplate hero CTA");
assertNotIncludes(serviceTemplate, "h-72 border border-border", "ServiceTemplate hero visual frame");
assertNotIncludes(serviceTemplate, "service.image", "ServiceTemplate");
assertNotIncludes(serviceTemplate, "<img", "ServiceTemplate");
assertNotIncludes(serviceTemplate, "<video", "ServiceTemplate");
assertNotIncludes(serviceTemplate, "Card", "ServiceTemplate");
assertNotIncludes(serviceTemplate, "CheckCircle2", "ServiceTemplate");

const index = read("src/pages/Index.tsx");
assertIncludes(index, "<LaunchProcessSection", "Index page");
assertIncludes(index, "<MobileBriefCta", "Index page");
assertIncludes(index, "<CodeRain intensity=\"home\" />", "Index page CodeRain intensity");

const mobileCta = read("src/components/MobileBriefCta.tsx");
assertIncludes(mobileCta, "md:hidden", "MobileBriefCta");
assertIncludes(mobileCta, "fixed bottom-0", "MobileBriefCta");
assertIncludes(mobileCta, "Заполнить бриф", "MobileBriefCta");
assertIncludes(mobileCta, "IntersectionObserver", "MobileBriefCta");

const processSection = read("src/components/LaunchProcessSection.tsx");
assertIncludes(processSection, "Как проходит запуск", "LaunchProcessSection");
assertIncludes(processSection, "Описать задачу", "LaunchProcessSection CTA");
assertIncludes(processSection, "timelineSteps", "LaunchProcessSection timeline");
assertIncludes(processSection, "aria-hidden=\"true\"", "LaunchProcessSection timeline connector");
for (const step of ["Диагностика", "Сценарий", "Сборка", "Проверка", "Передача"]) {
  assertIncludes(processSection, step, "LaunchProcessSection step");
}
const processStepCount = [...processSection.matchAll(/title:\s*"/g)].length;
if (processStepCount !== 5) {
  throw new Error(`LaunchProcessSection should define 5 launch steps, got ${processStepCount}`);
}
assertNotIncludes(processSection, "Card", "LaunchProcessSection");
assertNotIncludes(processSection, "<img", "LaunchProcessSection");
assertNotIncludes(processSection, "<video", "LaunchProcessSection");

const serviceMark = read("src/components/AbstractServiceMark.tsx");
assertNotIncludes(serviceMark, "<rect", "AbstractServiceMark frame");

const quickDialog = read("src/components/QuickServiceBriefDialog.tsx");
assertIncludes(quickDialog, "interface QuickServiceBriefDialogProps", "QuickServiceBriefDialog props");
assertIncludes(quickDialog, "service: ServiceData", "QuickServiceBriefDialog service prop");
assertIncludes(quickDialog, "open: boolean", "QuickServiceBriefDialog open prop");
assertIncludes(quickDialog, "onOpenChange: (open: boolean) => void", "QuickServiceBriefDialog open handler");
assertIncludes(quickDialog, "fetch(\"/api/telegram-brief\"", "QuickServiceBriefDialog submission");
assertIncludes(quickDialog, "startFormat: \"Нужна бесплатная консультация\"", "QuickServiceBriefDialog start format");
assertIncludes(quickDialog, "service: service.slug", "QuickServiceBriefDialog selected service payload");
assertIncludes(quickDialog, "answers: {}", "QuickServiceBriefDialog compact payload");
assertIncludes(quickDialog, "toast({", "QuickServiceBriefDialog toast feedback");
assertIncludes(quickDialog, "siteConfig.contacts.telegramLabel", "QuickServiceBriefDialog telegram fallback");
assertIncludes(quickDialog, "Коротко о задаче", "QuickServiceBriefDialog task field");

const aboutSection = read("src/components/AboutSection.tsx");
assertIncludes(aboutSection, "principleMatrix", "AboutSection matrix");
assertIncludes(aboutSection, "md:grid-cols-2 lg:grid-cols-3", "AboutSection desktop matrix");
assertIncludes(aboutSection, "padStart(2, \"0\")", "AboutSection numbering");
assertNotIncludes(aboutSection, "Card", "AboutSection");
assertNotIncludes(aboutSection, "lucide-react", "AboutSection");
assertNotIncludes(aboutSection, "icon:", "AboutSection");
assertNotIncludes(aboutSection, "🤖", "AboutSection");
assertNotIncludes(aboutSection, "💻", "AboutSection");
assertNotIncludes(aboutSection, "📱", "AboutSection");

const aboutPage = read("src/pages/About.tsx");
assertIncludes(aboutPage, "BlueprintPanel", "About page blueprint split");
assertIncludes(aboutPage, "LaunchStepper", "About page timeline");
assertIncludes(aboutPage, "Tabs", "About page tabs");
assertIncludes(aboutPage, "handoffOutcomes", "About page outcome blocks");
assertIncludes(aboutPage, "Что делает проект", "About page");
assertIncludes(aboutPage, "Как подходим к запуску", "About page");
assertIncludes(aboutPage, "Принципы работы", "About page");
assertIncludes(aboutPage, "После передачи", "About page");
assertIncludes(aboutPage, "padStart(2, \"0\")", "About page numbering");
assertNotIncludes(aboutPage, "Card", "About page");
assertNotIncludes(aboutPage, "lucide-react", "About page");
assertNotIncludes(aboutPage, "100+", "About page");
assertNotIncludes(aboutPage, "50+", "About page");
assertNotIncludes(aboutPage, "24/7", "About page");
assertNotIncludes(aboutPage, "по всему миру", "About page");
assertNotIncludes(aboutPage, "🤖", "About page");
assertNotIncludes(aboutPage, "💻", "About page");
assertNotIncludes(aboutPage, "📱", "About page");

const codeRain = read("src/components/CodeRain.tsx");
assertIncludes(codeRain, "type CodeRainIntensity = \"home\" | \"subtle\"", "CodeRain intensity type");
assertIncludes(codeRain, "intensity = \"subtle\"", "CodeRain subtle default");
assertIncludes(codeRain, "const particleCount = intensity === \"home\" ? 64 : 24", "CodeRain density modes");
assertIncludes(codeRain, "homeCodeChars", "CodeRain home token set");
assertIncludes(codeRain, "subtleCodeChars", "CodeRain subtle token set");
assertIncludes(codeRain, "animate-code-fall-subtle", "CodeRain subtle animation");
assertIncludes(codeRain, "opacity-10", "CodeRain subtle opacity");
assertIncludes(codeRain, "opacity-20", "CodeRain subtle opacity");
for (const token of ["AI", "MAX", "API", "CRM"]) {
  assertIncludes(codeRain, `"${token}"`, "CodeRain tokens");
}
assertIncludes(codeRain, "sizeClass", "CodeRain size variation");
assertIncludes(codeRain, "opacityClass", "CodeRain opacity variation");
assertIncludes(codeRain, "text-primary", "CodeRain stronger primary color");
assertIncludes(codeRain, "pointer-events-none", "CodeRain background layer");
assertIncludes(codeRain, "overflow-hidden", "CodeRain overflow guard");

const tailwindConfig = read("tailwind.config.ts");
assertIncludes(tailwindConfig, "\"code-fall-subtle\"", "Tailwind CodeRain subtle keyframes");
assertIncludes(tailwindConfig, "\"code-fall-subtle\": \"code-fall-subtle linear infinite\"", "Tailwind CodeRain subtle animation");

for (const path of [
  "src/pages/About.tsx",
  "src/pages/Services.tsx",
  "src/pages/Pricing.tsx",
  "src/pages/FAQ.tsx",
  "src/pages/Contacts.tsx",
  "src/pages/BriefTelegram.tsx",
  "src/pages/BriefWebsite.tsx",
  "src/pages/ContractDevelopment.tsx",
  "src/pages/ContractSupport.tsx",
  "src/pages/Privacy.tsx",
  "src/pages/Terms.tsx",
  "src/pages/ComingSoon.tsx",
  "src/pages/services/ServiceTemplate.tsx",
]) {
  const content = read(path);
  assertNotIncludes(content, "intensity=\"home\"", `${path} CodeRain intensity`);
}

for (const path of [
  "src/components/PricingSection.tsx",
  "src/components/FAQSection.tsx",
]) {
  const content = read(path);
  assertIncludes(content, "linear-abstract", path);
  assertIncludes(content, "border-t", path);
  assertNotIncludes(content, "Card", path);
  assertNotIncludes(content, "<img", path);
  assertNotIncludes(content, "<video", path);
}

for (const path of listFiles("src").filter((path) => /\.(tsx|ts)$/.test(path))) {
  const content = read(path);
  assertNotIncludes(content, "service.image", path);
  assertNotIncludes(content, "@/assets/services", path);
  assertNotIncludes(content, "<img", path);
  assertNotIncludes(content, "<video", path);
  for (const forbidden of ["🤖", "💻", "📱", "100+", "50+", "24/7", "по всему миру"]) {
    assertNotIncludes(content, forbidden, path);
  }
}

console.log("Abstract visual refresh check passed.");
