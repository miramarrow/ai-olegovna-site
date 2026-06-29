import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import projectCubeImage from "@/assets/project-discuss-cube.png";


const ProjectDiscussForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactMethod: "phone" as "phone" | "whatsapp" | "telegram",
    phone: "",
    telegram: "",
    projectType: "",
    budget: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.projectType || !formData.budget) {
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
      console.log('Project discussion form data:', formData);

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
        projectType: "",
        budget: "",
        description: ""
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
    <section id="contact-form" className="py-16 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Обсудить проект
          </h2>
          <p className="text-muted-foreground">
            Заполните форму, и мы подготовим предложение специально для вас
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start max-w-6xl mx-auto">
          {/* Left Side - Image and Text */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hidden md:block">
              <img
                src={projectCubeImage}
                alt="Автоматизация бизнес-процессов"
                className="w-full h-[300px] md:h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
            
            <div className="space-y-3 px-4">
              <h3 className="text-xl font-bold">
                Получите персональное предложение
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Расскажите о своих задачах, и мы подготовим решение специально для вас
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="p-6 bg-card">
            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name and Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm mb-1.5 block">
                  Имя *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border h-10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm mb-1.5 block">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border h-10"
                  required
                />
              </div>
            </div>

            {/* Contact Method */}
            <div>
            <Label className="text-sm mb-2 block">
              Как с вами связаться? *
            </Label>
              <RadioGroup
                value={formData.contactMethod}
                onValueChange={(value: "phone" | "whatsapp" | "telegram") => 
                  setFormData({ ...formData, contactMethod: value })
                }
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
              >
                <Label 
                  htmlFor="contact-phone" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <span className="font-normal text-sm">Телефон</span>
                </Label>
                <Label 
                  htmlFor="contact-whatsapp" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="whatsapp" id="contact-whatsapp" />
                  <span className="font-normal text-sm">WhatsApp</span>
                </Label>
                <Label 
                  htmlFor="contact-telegram" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="telegram" id="contact-telegram" />
                  <span className="font-normal text-sm">Telegram</span>
                </Label>
              </RadioGroup>
            </div>

            {/* Phone/WhatsApp */}
            {(formData.contactMethod === "phone" || formData.contactMethod === "whatsapp") && (
              <div>
                <Label htmlFor="phone" className="text-sm mb-1.5 block">
                  Телефон *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (993) 257-77-40"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border h-10"
                  required
                />
              </div>
            )}

            {/* Telegram */}
            {formData.contactMethod === "telegram" && (
              <div>
                <Label htmlFor="telegram" className="text-sm mb-1.5 block">
                  Telegram *
                </Label>
                <Input
                  id="telegram"
                  type="text"
                  placeholder="@username"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                  className="bg-background border-border h-10"
                  required
                />
              </div>
            )}

            {/* Project Type */}
            <div>
              <Label className="text-sm mb-2 block">
                Что нужно разработать? *
              </Label>
              <RadioGroup
                value={formData.projectType}
                onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              >
                <Label 
                  htmlFor="website" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="website" id="website" />
                  <span className="font-normal text-sm">Сайт</span>
                </Label>
                <Label 
                  htmlFor="telegram-bot" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="telegram-bot" id="telegram-bot" />
                  <span className="font-normal text-sm">Telegram-бот</span>
                </Label>
                <Label 
                  htmlFor="automation" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="automation" id="automation" />
                  <span className="font-normal text-sm">Автоматизация</span>
                </Label>
                <Label 
                  htmlFor="ai-solution" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="ai-solution" id="ai-solution" />
                  <span className="font-normal text-sm">AI-решение</span>
                </Label>
                <Label 
                  htmlFor="other" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="other" id="other" />
                  <span className="font-normal text-sm">Другое</span>
                </Label>
              </RadioGroup>
            </div>

            {/* Budget */}
            <div>
              <Label className="text-sm mb-2 block">
                Примерный бюджет
              </Label>
              <RadioGroup
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              >
                <Label 
                  htmlFor="50-100k" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="50-100k" id="50-100k" />
                  <span className="font-normal text-sm">50-100 тыс. ₽</span>
                </Label>
                <Label 
                  htmlFor="100-300k" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="100-300k" id="100-300k" />
                  <span className="font-normal text-sm">100-300 тыс. ₽</span>
                </Label>
                <Label 
                  htmlFor="300k+" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="300k+" id="300k+" />
                  <span className="font-normal text-sm">300+ тыс. ₽</span>
                </Label>
                <Label 
                  htmlFor="discuss" 
                  className="flex items-center space-x-2 border-2 border-border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value="discuss" id="discuss" />
                  <span className="font-normal text-sm">Обсудим</span>
                </Label>
              </RadioGroup>
            </div>

            {/* Description */}
            <div>
            <Label htmlFor="description" className="text-sm mb-1.5 block">
              Расскажите о проекте
            </Label>
              <Textarea
                id="description"
                placeholder="Опишите ваши задачи, цели, требования..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-background border-border min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full gap-2 h-10" disabled={isSubmitting}>
              <Send className="h-4 w-4" />
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectDiscussForm;
