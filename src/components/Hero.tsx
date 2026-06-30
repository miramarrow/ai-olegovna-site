import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCodeVideo from "./HeroCodeVideo";
import RotatingText from "./RotatingText";

const Hero = () => {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-4 pb-16 pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
            n8n · боты · агенты ·  сайты
          </div>
          <h1
            aria-label="Автоматизация бизнеса на базе AI"
            className="max-w-4xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            <span className="block">Автоматизация бизнеса на базе AI</span>
            <span className="mt-3 block min-h-[1.22em] max-w-full" aria-hidden="true">
              <RotatingText
                texts={["Telegram-боты", "сайты", "n8n-автоматизации", "AI-агенты", "контент-заводы"]}
                mainClassName="max-w-full rounded-md bg-primary px-3 py-1 text-primary-foreground"
                staggerFrom="last"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                staggerDuration={0.025}
                splitLevelClassName="pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={1900}
              />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Разрабатываем Telegram-ботов, сайты, n8n-автоматизации, AI-агентов и контент-заводы. От идеи до запуска.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 rounded-md px-6" asChild>
              <a href="/#contact-form">
                Заполнить умный бриф
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="h-12 rounded-md px-6" asChild>
              <a href="#services">Смотреть услуги</a>
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Бриф занимает несколько минут, ответы сразу уйдут в Telegram.
          </p>
        </div>

        <div className="relative z-10">
          <HeroCodeVideo />
        </div>
      </div>
    </section>
  );
};

export default Hero;
