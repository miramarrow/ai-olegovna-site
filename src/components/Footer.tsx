import { Link } from "react-router-dom";
import { Instagram, Megaphone, Send } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/pages/services/servicesData";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="mb-4 inline-flex items-center" aria-label={`${siteConfig.name} — на главную`}>
              <BrandMark className="h-10" />
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.contacts.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.contacts.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.contacts.telegramChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
                aria-label="Telegram-канал"
              >
                <Megaphone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Услуги</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {servicesData.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="inline-block py-1 transition-colors hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Разделы</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.footerCompanyLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="inline-block py-1 transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Контакты</h3>
            <ul className="mb-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Send className="h-4 w-4 text-primary" />
                <a href={siteConfig.contacts.telegramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                  {siteConfig.contacts.telegramLabel}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-primary" />
                <a href={siteConfig.contacts.instagramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                  {siteConfig.contacts.instagramLabel}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-primary" />
                <a href={siteConfig.contacts.telegramChannelUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                  {siteConfig.contacts.telegramChannelLabel}
                </a>
              </li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground transition-colors hover:text-primary">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="text-muted-foreground transition-colors hover:text-primary">Пользовательское соглашение</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
