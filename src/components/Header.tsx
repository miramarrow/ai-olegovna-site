import { useEffect, useState } from "react";
import { ArrowRight, FileText, Menu, MessageCircle, Phone, Send, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BrandMark from "@/components/BrandMark";
import { siteConfig } from "@/config/site";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 80 || currentScrollY < previousScrollY);
      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  const closeMenus = () => {
    setIsOpen(false);
    setContactOpen(false);
  };

  const contactItems = [
    {
      label: `Telegram ${siteConfig.contacts.telegramLabel}`,
      href: siteConfig.contacts.telegramUrl,
      icon: Send,
    },
    {
      label: "WhatsApp",
      href: siteConfig.contacts.whatsappUrl,
      icon: MessageCircle,
    },
    {
      label: siteConfig.contacts.phoneLabel,
      href: siteConfig.contacts.phoneHref,
      icon: Phone,
    },
  ];

  return (
    <nav
      className={`fixed left-1/2 top-4 z-50 w-[92vw] max-w-5xl -translate-x-1/2 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
      }`}
    >
      <div className="rounded-lg border border-primary/15 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md md:px-5">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center" aria-label={`${siteConfig.name} — на главную`} onClick={closeMenus}>
            <BrandMark />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  Связаться
                  <ArrowRight className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Связаться с {siteConfig.name}</DialogTitle>
                  <DialogDescription>
                    Можно написать напрямую или открыть умный бриф.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 py-4">
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                        onClick={closeMenus}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{item.label}</span>
                      </a>
                    );
                  })}
                  <a
                    href="/#contact-form"
                    className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                    onClick={closeMenus}
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Заполнить умный бриф</span>
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <button
            type="button"
            className="rounded-md border border-border p-2 text-foreground md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 border-t border-border pt-3 md:hidden">
            <div className="flex flex-col gap-1">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  onClick={closeMenus}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="/#contact-form"
                className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                onClick={closeMenus}
              >
                Умный бриф
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
