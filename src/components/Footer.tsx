import { Link } from "react-router-dom";
import { Bot, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Bot className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              <a 
                href={siteConfig.contacts.telegramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/website-development" className="hover:text-primary transition-colors py-1 inline-block">Разработка сайтов</Link></li>
              <li><Link to="/services/telegram-bots" className="hover:text-primary transition-colors py-1 inline-block">Telegram-боты</Link></li>
              <li><Link to="/services/n8n-automation" className="hover:text-primary transition-colors py-1 inline-block">N8N Автоматизация</Link></li>
              <li><Link to="/services/ai-content" className="hover:text-primary transition-colors py-1 inline-block">AI решения</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.footerCompanyLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="hover:text-primary transition-colors py-1 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm text-muted-foreground mb-4">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${siteConfig.contacts.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={siteConfig.contacts.phoneHref} className="hover:text-primary transition-colors">
                  {siteConfig.contacts.phoneLabel}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Пользовательское соглашение</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Все права защищены.</p>
          <p className="mt-2">🌍 Работаем с клиентами по всему миру</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
