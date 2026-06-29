import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Send, Zap, CheckCircle2 } from "lucide-react";


interface PromoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PromoDialog = ({ open, onOpenChange }: PromoDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactMethod: "phone" as "phone" | "whatsapp" | "telegram",
    phone: "",
    telegram: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (formData.contactMethod === "telegram" && !formData.telegram) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваш Telegram",
        variant: "destructive",
      });
      return;
    }

    if ((formData.contactMethod === "phone" || formData.contactMethod === "whatsapp") && !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваш номер телефона",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Form submission logic removed - backend integration needed
      console.log('Promo form data:', formData);

      toast({
        title: "Форма отправлена",
        description: "Данные формы выведены в консоль",
      });

      setFormData({
        name: "",
        email: "",
        contactMethod: "phone",
        phone: "",
        telegram: "",
        message: ""
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке формы",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Экспресс-разработка лендинга</DialogTitle>
              <p className="text-sm text-muted-foreground">Акция до 11 ноября</p>
            </div>
          </div>
          <DialogDescription>
            Оставьте заявку на разработку лендинга за <strong>30 000 ₽</strong> и получите готовый сайт за 3 дня
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-lg p-4 bg-primary/5 mb-4">
          <h3 className="font-semibold text-base mb-3">Что входит в акцию:</h3>
          <ul className="space-y-2">
            {[
              "Современный адаптивный дизайн",
              "Форма обратной связи",
              "SEO-оптимизация",
              "Хостинг на 1 месяц",
              "Гарантия 3 месяца"
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="promo-name" className="text-base mb-2 block">
                Имя *
              </Label>
              <Input
                id="promo-name"
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border h-12 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="promo-email" className="text-base mb-2 block">
                Email *
              </Label>
              <Input
                id="promo-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border h-12 text-base"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-base mb-4 block">
              Как с вами связаться? *
            </Label>
            <RadioGroup
              value={formData.contactMethod}
              onValueChange={(value: "phone" | "whatsapp" | "telegram") => 
                setFormData({ ...formData, contactMethod: value })
              }
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <Label 
                htmlFor="promo-phone" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="phone" id="promo-phone" />
                <span className="font-normal text-base">Телефон</span>
              </Label>
              <Label 
                htmlFor="promo-whatsapp" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="whatsapp" id="promo-whatsapp" />
                <span className="font-normal text-base">WhatsApp</span>
              </Label>
              <Label 
                htmlFor="promo-telegram" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="telegram" id="promo-telegram" />
                <span className="font-normal text-base">Telegram</span>
              </Label>
            </RadioGroup>
          </div>

          {(formData.contactMethod === "phone" || formData.contactMethod === "whatsapp") && (
            <div>
              <Label htmlFor="promo-phone-input" className="text-base mb-2 block">
                Телефон *
              </Label>
              <Input
                id="promo-phone-input"
                type="tel"
                placeholder="+7 (999) 999-99-99"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background border-border h-12 text-base"
                required
              />
            </div>
          )}

          {formData.contactMethod === "telegram" && (
            <div>
              <Label htmlFor="promo-telegram-input" className="text-base mb-2 block">
                Telegram *
              </Label>
              <Input
                id="promo-telegram-input"
                type="text"
                placeholder="@username"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="bg-background border-border h-12 text-base"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="promo-message" className="text-base mb-2 block">
              Комментарий (необязательно)
            </Label>
            <Textarea
              id="promo-message"
              placeholder="Дополнительная информация о вашем проекте..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-background border-border min-h-[100px] text-base"
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            * Подробности акции уточняйте у менеджера
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromoDialog;
