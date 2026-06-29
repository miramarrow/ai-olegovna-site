import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";


const ContactForm = () => {
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
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    // Validate contact method field
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
      console.log('Contact form data:', formData);

      toast({
        title: "Форма отправлена",
        description: "Данные формы выведены в консоль",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        contactMethod: "phone",
        phone: "",
        telegram: "",
        message: ""
      });
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
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-muted-foreground">
            Оставьте заявку и наш специалист свяжется с вами в течение 24 часов
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base mb-2 block">
              Имя *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-border h-12 text-base"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-base mb-2 block">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background border-border h-12 text-base"
              required
            />
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
                htmlFor="phone" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="phone" id="phone" />
                <span className="font-normal text-base">Телефон</span>
              </Label>
              <Label 
                htmlFor="whatsapp" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <span className="font-normal text-base">WhatsApp</span>
              </Label>
              <Label 
                htmlFor="telegram-contact" 
                className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="telegram" id="telegram-contact" />
                <span className="font-normal text-base">Telegram</span>
              </Label>
            </RadioGroup>
          </div>

          {(formData.contactMethod === "phone" || formData.contactMethod === "whatsapp") && (
            <div>
              <Label htmlFor="phone-input" className="text-base mb-2 block">
                Телефон *
              </Label>
              <Input
                id="phone-input"
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
              <Label htmlFor="telegram-input" className="text-base mb-2 block">
                Telegram *
              </Label>
              <Input
                id="telegram-input"
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
            <Label htmlFor="message" className="text-base mb-2 block">
              Ваше сообщение *
            </Label>
              <Textarea
                id="message"
                placeholder="Опишите вашу задачу..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background border-border min-h-[150px] text-base"
                required
              />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
