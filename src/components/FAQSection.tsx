import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  subtitle?: string;
}

const FAQSection = ({ faqs, subtitle = "Короткие ответы о запуске, поддержке и формате работы до заполнения брифа." }: FAQSectionProps) => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">FAQ</p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Вопросы перед стартом
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <Accordion type="single" collapsible className="linear-abstract w-full border-y border-border">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-border px-0 last:border-b-0"
            >
              <AccordionTrigger className="group gap-5 px-0 py-6 text-left hover:text-foreground hover:no-underline">
                <span className="grid flex-1 grid-cols-[2.75rem_1fr] items-start gap-4">
                  <span className="mt-1 font-mono text-sm text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary md:text-lg">
                    {faq.question}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-[4.25rem] pr-10 text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
