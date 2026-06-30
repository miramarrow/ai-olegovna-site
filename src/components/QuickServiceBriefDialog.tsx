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
    contact: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Пожалуйста, укажите имя";
    }

    if (!formData.contact.trim()) {
      return "Пожалуйста, укажите телефон или Telegram";
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
        phone: isTelegram ? "" : formData.contact.trim(),
        telegram: isTelegram ? formData.contact.trim() : "",
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
        contact: "",
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
              onValueChange={(value: ContactMethod) => setFormData({ ...formData, contactMethod: value })}
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
            <Label htmlFor="quick-brief-contact" className="mb-1.5 block text-sm">
              Телефон/Telegram *
            </Label>
            <Input
              id="quick-brief-contact"
              value={formData.contact}
              onChange={(event) => setFormData({ ...formData, contact: event.target.value })}
              placeholder={formData.contactMethod === "telegram" ? "@username" : "+7 (993) 257-77-40"}
            />
          </div>

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
