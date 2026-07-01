import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import type { ContactMethod } from "@/data/briefTemplates";
import { useToast } from "@/hooks/use-toast";
import { buildBriefSource } from "@/lib/briefSource";
import { submitLeadPayload } from "@/lib/leadDelivery";
import { formatRussianPhoneInput, isCompleteRussianPhone } from "@/lib/phoneMask";
import type { ServiceData } from "@/pages/services/servicesData";

interface QuickServiceBriefDialogProps {
  service: ServiceData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const contactLabels: Record<ContactMethod, string> = {
  phone: "Телефон",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
};

const QuickServiceBriefDialog = ({ service, open, onOpenChange }: QuickServiceBriefDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contactMethod: "telegram" as ContactMethod,
    phone: "+7 ",
    telegram: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Пожалуйста, укажите имя";
    }

    if (!isCompleteRussianPhone(formData.phone)) {
      return "Пожалуйста, укажите номер телефона полностью";
    }

    if (formData.contactMethod === "telegram" && !formData.telegram.trim()) {
      return "Пожалуйста, укажите Telegram";
    }

    if (!formData.comment.trim()) {
      return "Коротко опишите задачу";
    }

    return "";
  };

  const submitBrief = async () => {
    const validationError = validateForm();

    if (validationError) {
      toast({
        title: "Заявка не заполнена",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const isTelegram = formData.contactMethod === "telegram";
    const payload = {
      contacts: {
        name: formData.name.trim(),
        preferredContact: contactLabels[formData.contactMethod],
        phone: formData.phone.trim(),
        telegram: isTelegram ? formData.telegram.trim() : "",
      },
      service: service.slug,
      startFormat: "Нужна бесплатная консультация",
      answers: {},
      comment: formData.comment.trim(),
      source: buildBriefSource("quick_service_brief"),
    };

    try {
      await submitLeadPayload(payload);
      toast({
        title: "Заявка отправлена",
        description: `Я получила запрос по услуге «${service.shortTitle}» и вернусь с ответом.`,
      });
      setFormData({
        name: "",
        contactMethod: "telegram",
        phone: "+7 ",
        telegram: "",
        comment: "",
      });
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-md p-5 sm:max-w-xl sm:p-6">
        <DialogHeader>
          <DialogTitle>Обсудить {service.shortTitle.toLowerCase()}</DialogTitle>
          <DialogDescription>
            Короткая заявка уже привязана к выбранной услуге. Дальше я вернусь с уточнениями и форматом старта.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border border-primary/15 bg-primary/5 p-3 text-sm">
            <span className="font-medium text-foreground">Услуга:</span>{" "}
            <span className="text-muted-foreground">{service.title}</span>
          </div>

          <div>
            <Label htmlFor="quick-brief-name" className="mb-1.5 block text-sm">
              Имя *
            </Label>
            <Input
              id="quick-brief-name"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              placeholder="Как к вам обращаться"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm">Способ связи *</Label>
            <RadioGroup
              value={formData.contactMethod}
              onValueChange={(value: ContactMethod) =>
                setFormData((current) => ({
                  ...current,
                  contactMethod: value,
                  phone: formatRussianPhoneInput(current.phone),
                }))
              }
              className="grid grid-cols-3 gap-2"
            >
              {Object.entries(contactLabels).map(([value, label]) => (
                <Label
                  key={value}
                  htmlFor={`quick-contact-${value}`}
                  className="flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-border px-2 text-sm transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                >
                  <RadioGroupItem value={value} id={`quick-contact-${value}`} />
                  <span>{label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="quick-brief-phone" className="mb-1.5 block text-sm">
              Телефон *
            </Label>
            <Input
              id="quick-brief-phone"
              type="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  phone: formatRussianPhoneInput(event.target.value),
                })
              }
              onFocus={() =>
                setFormData((current) => ({
                  ...current,
                  phone: formatRussianPhoneInput(current.phone),
                }))
              }
              placeholder="+7 (993) 257-77-40"
            />
          </div>

          {formData.contactMethod === "telegram" && (
            <div>
              <Label htmlFor="quick-brief-telegram" className="mb-1.5 block text-sm">
                Telegram *
              </Label>
              <Input
                id="quick-brief-telegram"
                value={formData.telegram}
                onChange={(event) => setFormData({ ...formData, telegram: event.target.value })}
                placeholder="@username"
              />
            </div>
          )}

          <div>
            <Label htmlFor="quick-brief-comment" className="mb-1.5 block text-sm">
              Коротко о задаче *
            </Label>
            <Textarea
              id="quick-brief-comment"
              value={formData.comment}
              onChange={(event) => setFormData({ ...formData, comment: event.target.value })}
              placeholder="Что нужно сделать, какой процесс болит или какой запуск планируете"
              className="min-h-[96px]"
            />
          </div>

          <Button
            type="button"
            className="h-11 w-full rounded-md"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            onClick={submitBrief}
          >
            <Send className="h-4 w-4" />
            <span>{isSubmitting ? "Отправляем..." : "Отправить заявку"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickServiceBriefDialog;
