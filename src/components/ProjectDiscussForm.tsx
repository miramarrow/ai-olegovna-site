import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  briefTemplates,
  serviceOptions,
  startFormats,
  type ContactMethod,
  type ServiceSlug,
} from "@/data/briefTemplates";
import { buildBriefSource } from "@/lib/briefSource";
import { submitLeadPayload } from "@/lib/leadDelivery";
import { formatRussianPhoneInput, isCompleteRussianPhone } from "@/lib/phoneMask";
import { siteConfig } from "@/config/site";

const contactLabels: Record<ContactMethod, string> = {
  phone: "Телефон",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
};

const freeConsultationStartFormat = "Нужна бесплатная консультация";
const customIdeaStartFormat = "Хочу обсудить свою идею";

const ProjectDiscussForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contactMethod: "whatsapp" as ContactMethod,
    phone: "+7 ",
    telegram: "",
    service: "neuro-office" as ServiceSlug,
    startFormat: startFormats[0],
    answers: {} as Record<string, string>,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFreeConsultation = formData.service === "free-consultation";
  const isCustomIdea = formData.service === "custom-idea";
  const isQuickBrief = isFreeConsultation || isCustomIdea;
  const currentTemplate = briefTemplates[formData.service];

  const progress = useMemo(() => {
    const phoneValue = isCompleteRussianPhone(formData.phone) ? formData.phone.trim() : "";
    const baseItems = [
      formData.name.trim(),
      phoneValue,
      ...(formData.contactMethod === "telegram" ? [formData.telegram.trim()] : []),
      formData.service,
      ...(isQuickBrief ? [] : [formData.startFormat]),
    ];
    const answerItems = isCustomIdea
      ? [formData.comment.trim()]
      : isFreeConsultation
        ? []
        : currentTemplate.questions.map((question) => formData.answers[question.id]?.trim());
    const completed = [...baseItems, ...answerItems].filter(Boolean).length;
    const total = baseItems.length + answerItems.length;
    return Math.round((completed / total) * 100);
  }, [currentTemplate.questions, formData, isCustomIdea, isFreeConsultation, isQuickBrief]);

  const updateAnswer = (questionId: string, value: string) => {
    setFormData((current) => ({
      ...current,
      answers: {
        ...current.answers,
        [questionId]: value,
      },
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Пожалуйста, укажите имя";
    }

    if (!isCompleteRussianPhone(formData.phone)) {
      return "Пожалуйста, укажите номер телефона полностью";
    }

    if (formData.contactMethod === "telegram" && !formData.telegram.trim()) {
      return "Пожалуйста, укажите ваш Telegram";
    }

    if (isFreeConsultation) {
      return "";
    }

    if (isCustomIdea) {
      return formData.comment.trim() ? "" : "Коротко опишите идею";
    }

    const emptyQuestion = currentTemplate.questions.find(
      (question) => !formData.answers[question.id]?.trim(),
    );

    if (emptyQuestion) {
      return `Заполните вопрос: ${emptyQuestion.label}`;
    }

    return "";
  };

  const submitBrief = async () => {
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Бриф не заполнен",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const payloadStartFormat = isFreeConsultation ? freeConsultationStartFormat : isCustomIdea ? customIdeaStartFormat : formData.startFormat;

    const payload = {
      contacts: {
        name: formData.name.trim(),
        preferredContact: contactLabels[formData.contactMethod],
        phone: formData.phone.trim(),
        telegram: formData.contactMethod === "telegram" ? formData.telegram.trim() : "",
      },
      service: formData.service,
      startFormat: payloadStartFormat,
      answers: isQuickBrief ? {} : formData.answers,
      comment: formData.comment.trim(),
      source: buildBriefSource("smart_brief"),
    };

    try {
      await submitLeadPayload(payload);
      toast({
        title: "Заявка отправлена",
        description: "Я получила бриф и вернусь с ответом.",
      });
    } catch {
      toast({
        title: "Заявка не отправилась",
        description: `Напишите в Telegram вручную: ${siteConfig.contacts.telegramLabel}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Умный бриф</p>
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Оценим задачу без жесткого прайса
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Выберите направление, ответьте на короткий бриф — получу заявку с контекстом и
            вернусь с форматом старта. Если не знаете что нужно — выберите консультацию, она бесплатная.
          </p>
        </div>

        <Card className="mx-auto max-w-5xl rounded-lg border border-border bg-card p-5 shadow-sm md:p-7">
          <div className="mb-6 border-b border-primary/15 pb-5">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              После отправки
            </p>
            <p className="mt-3 text-base leading-relaxed text-foreground">
              01 читаю контекст → 02 уточняю детали → 03 предлагаю формат и стоимость
            </p>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-foreground">Заполнено</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Accordion type="multiple" defaultValue={["contacts", "service", "brief"]} className="space-y-3">
            <AccordionItem value="contacts" className="rounded-lg border border-border px-4">
              <AccordionTrigger className="text-left text-lg font-semibold">1. Контакты</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="brief-name" className="mb-1.5 block text-sm">Имя *</Label>
                    <Input
                      id="brief-name"
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      placeholder="Как к вам обращаться"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block text-sm">Как удобнее ответить? *</Label>
                    <RadioGroup
                      value={formData.contactMethod}
                      onValueChange={(value: ContactMethod) =>
                        setFormData((current) => ({
                          ...current,
                          contactMethod: value,
                          phone: value === "telegram" ? current.phone : formatRussianPhoneInput(current.phone),
                        }))
                      }
                      className="grid grid-cols-3 gap-2"
                    >
                      {Object.entries(contactLabels).map(([value, label]) => (
                        <Label
                          key={value}
                          htmlFor={`contact-${value}`}
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                        >
                          <RadioGroupItem value={value} id={`contact-${value}`} />
                          <span>{label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="brief-phone" className="mb-1.5 block text-sm">Телефон *</Label>
                    <Input
                      id="brief-phone"
                      type="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: formatRussianPhoneInput(event.target.value) })}
                      onFocus={() => setFormData((current) => ({ ...current, phone: formatRussianPhoneInput(current.phone) }))}
                      placeholder="+7 (993) 257-77-40"
                    />
                  </div>

                  {formData.contactMethod === "telegram" && (
                    <div>
                      <Label htmlFor="brief-telegram" className="mb-1.5 block text-sm">Telegram *</Label>
                      <Input
                        id="brief-telegram"
                        value={formData.telegram}
                        onChange={(event) => setFormData({ ...formData, telegram: event.target.value })}
                        placeholder="@username"
                      />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="service" className="rounded-lg border border-border px-4">
              <AccordionTrigger className="text-left text-lg font-semibold">2. Направление</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <RadioGroup
                  value={formData.service}
                  onValueChange={(value: ServiceSlug) =>
                    setFormData((current) => ({
                      ...current,
                      service: value,
                      startFormat: value === "free-consultation"
                        ? freeConsultationStartFormat
                        : value === "custom-idea"
                          ? customIdeaStartFormat
                          : current.startFormat === freeConsultationStartFormat || current.startFormat === customIdeaStartFormat
                          ? startFormats[0]
                          : current.startFormat,
                      answers: {},
                    }))
                  }
                  className="grid gap-2 md:grid-cols-2"
                >
                  {serviceOptions.map((service) => (
                    <Label
                      key={service.value}
                      htmlFor={`service-${service.value}`}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                    >
                      <RadioGroupItem value={service.value} id={`service-${service.value}`} className="mt-1" />
                      <span>
                        <span className="block font-medium">{service.label}</span>
                        <span className="block text-sm text-muted-foreground">{service.description}</span>
                      </span>
                    </Label>
                  ))}
                </RadioGroup>

                {isQuickBrief ? (
                  <div className="border-t border-primary/20 pt-4 text-sm leading-relaxed text-muted-foreground">
                    {isCustomIdea
                      ? "Дальше опишите идею в свободной форме: я получу контекст и предложу подходящий формат."
                      : "Дальше ничего заполнять не нужно: я получу контакт и вернусь с бесплатной консультацией."}
                  </div>
                ) : (
                  <div>
                    <Label className="mb-2 block text-sm">Формат старта *</Label>
                    <RadioGroup
                      value={formData.startFormat}
                      onValueChange={(value) => setFormData({ ...formData, startFormat: value })}
                      className="grid gap-2 md:grid-cols-4"
                    >
                      {startFormats.map((format) => (
                        <Label
                          key={format}
                          htmlFor={`format-${format}`}
                          className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                        >
                          <RadioGroupItem value={format} id={`format-${format}`} />
                          <span>{format}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {isCustomIdea && (
              <AccordionItem value="brief" className="rounded-lg border border-border px-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  3. Коротко опишите идею
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <p className="text-sm text-muted-foreground">{currentTemplate.description}</p>
                  <div>
                    <Label htmlFor="brief-comment" className="mb-1.5 block text-sm">Коротко опишите идею *</Label>
                    <Textarea
                      id="brief-comment"
                      value={formData.comment}
                      onChange={(event) => setFormData({ ...formData, comment: event.target.value })}
                      placeholder="Что хотите обсудить, какую идею проверить или какой нестандартный сценарий собрать"
                      className="min-h-[110px]"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {!isQuickBrief && (
              <AccordionItem value="brief" className="rounded-lg border border-border px-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  3. {currentTemplate.title}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <p className="text-sm text-muted-foreground">{currentTemplate.description}</p>
                  <div className="grid gap-4">
                    {currentTemplate.questions.map((question, index) => (
                      <div key={question.id}>
                        <Label htmlFor={`question-${question.id}`} className="mb-1.5 block text-sm">
                          {index + 1}. {question.label} *
                        </Label>
                        <Textarea
                          id={`question-${question.id}`}
                          value={formData.answers[question.id] ?? ""}
                          onChange={(event) => updateAnswer(question.id, event.target.value)}
                          placeholder={question.placeholder}
                          className="min-h-[78px]"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="brief-comment" className="mb-1.5 block text-sm">Комментарий</Label>
                    <Textarea
                      id="brief-comment"
                      value={formData.comment}
                      onChange={(event) => setFormData({ ...formData, comment: event.target.value })}
                      placeholder="Любые детали, которые важно учесть"
                      className="min-h-[90px]"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <div className="mt-6">
            <Button
              type="button"
              className="h-12 w-full gap-2 rounded-md"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              onClick={submitBrief}
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "Отправляем..." : "Отправить"}</span>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProjectDiscussForm;
