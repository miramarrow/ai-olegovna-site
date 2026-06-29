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
import { Send } from "lucide-react";


interface ServiceConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceTitle: string;
}

const ServiceConsultationDialog = ({ 
  open, 
  onOpenChange, 
  serviceTitle 
}: ServiceConsultationDialogProps) => {
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
    
    if (!formData.name || !formData.email || !formData.message) {
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
      console.log('Form data:', formData);
      
      toast({
        title: "Форма отправлена",
        description: "Данные формы выведены в консоль",
      });

      // Reset form and close dialog
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
          <DialogTitle className="text-2xl">Получить консультацию</DialogTitle>
          <DialogDescription>
            Заполните форму и мы свяжемся с вами для обсуждения <strong>{serviceTitle}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dialog-name" className="text-base mb-2 block">
                Имя *
              </Label>
              <Input
                id="dialog-name"
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border h-12 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="dialog-email" className="text-base mb-2 block">
                Email *
              </Label>
              <Input
                id="dialog-email"
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
                htmlFor="dialog-phone" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="phone" id="dialog-phone" />
                <span className="font-normal text-base">Телефон</span>
              </Label>
              <Label 
                htmlFor="dialog-whatsapp" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="whatsapp" id="dialog-whatsapp" />
                <span className="font-normal text-base">WhatsApp</span>
              </Label>
              <Label 
                htmlFor="dialog-telegram" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="telegram" id="dialog-telegram" />
                <span className="font-normal text-base">Telegram</span>
              </Label>
            </RadioGroup>
          </div>

          {(formData.contactMethod === "phone" || formData.contactMethod === "whatsapp") && (
            <div>
              <Label htmlFor="dialog-phone-input" className="text-base mb-2 block">
                Телефон *
              </Label>
              <Input
                id="dialog-phone-input"
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
              <Label htmlFor="dialog-telegram-input" className="text-base mb-2 block">
                Telegram *
              </Label>
              <Input
                id="dialog-telegram-input"
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
            <Label htmlFor="dialog-message" className="text-base mb-2 block">
              Ваше сообщение *
            </Label>
            <Textarea
              id="dialog-message"
              placeholder="Расскажите о вашей задаче..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-background border-border min-h-[120px] text-base"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceConsultationDialog;
