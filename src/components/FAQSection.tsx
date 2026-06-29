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
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.74fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">FAQ</p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Часто задаваемые вопросы
            </h2>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            Короткие ответы о запуске, поддержке и формате работы до заполнения брифа.
          </p>
        </div>

        <Accordion type="single" collapsible className="linear-abstract w-full border-b border-border">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-t border-border px-0"
            >
              <AccordionTrigger className="gap-4 py-5 text-left hover:text-primary">
                <span className="flex flex-1 items-start gap-4">
                  <span className="mt-0.5 font-mono text-sm text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-12 leading-relaxed text-muted-foreground">
                <div className="border-l border-primary/25 pl-4">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
