import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, ChevronDown, MessageCircle, Phone, FileText, Radio, Send } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { siteConfig } from "@/config/site";

const navigation = siteConfig.navigation;

const moreItems = [
  { name: "Сервисы", href: "/coming-soon" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100);

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Only hide/show after scrolling past 50px to avoid flickering at top
        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            // Scrolling down - hide navbar
            setIsVisible(false);
          } else if (lastScrollY.current - currentScrollY > 5) {
            // Scrolling up - show navbar
            setIsVisible(true);
          }
        } else {
          // Always show navbar when near top
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true });

      return () => {
        window.removeEventListener("scroll", controlNavbar);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const rect = element.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const elementAbsoluteTop = rect.top + currentScrollY;
      const navbarHeight = 100;
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0"
        } ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        {/* Main Navigation */}
        <div className="w-[90vw] max-w-xs md:max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 md:px-6 md:py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 48 48" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 md:w-12 md:h-12"
                >
                  <text
                    x="24"
                    y="30"
                    fontSize="20"
                    fontWeight="700"
                    fontStyle="italic"
                    fill="white"
                    textAnchor="middle"
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    {siteConfig.shortName}
                  </text>
                </svg>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ),
                )}
                
                {/* More dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 font-medium cursor-pointer flex items-center gap-1 outline-none">
                    Еще
                    <ChevronDown size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background/95 backdrop-blur-md border border-border">
                    {moreItems.map((item) => (
                      <DropdownMenuItem key={item.name} className="cursor-pointer" asChild>
                        <Link to={item.href}>
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                  <DialogTrigger asChild>
                    <button
                      className="relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-2 rounded-full flex items-center transition-all duration-300 hover:scale-105 cursor-pointer group border-2 border-transparent hover:border-primary hover:shadow-[0_0_20px_rgba(156,81,255,0.5)]"
                    >
                      <span className="mr-2">Связаться</span>
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Свяжитесь с нами</DialogTitle>
                      <DialogDescription>
                        Выберите удобный способ связи
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 py-4">
                      <a
                        href={siteConfig.contacts.telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                      >
                        <Send className="w-5 h-5 text-primary" />
                        <span className="font-medium">Telegram</span>
                      </a>
                      <a
                        href={siteConfig.contacts.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span className="font-medium">WhatsApp</span>
                      </a>
                      <a
                        href={siteConfig.contacts.phoneHref}
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                      >
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="font-medium">Позвонить</span>
                      </a>
                      <button
                        onClick={() => {
                          setContactOpen(false);
                          scrollToSection("#contact-form");
                        }}
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer text-left"
                      >
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="font-medium">Заполнить бриф онлайн</span>
                      </button>
                      <a
                        href={siteConfig.contacts.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                      >
                        <Radio className="w-5 h-5 text-primary" />
                        <span className="font-medium">{siteConfig.contacts.channelLabel}</span>
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden relative">
          {/* Backdrop overlay */}
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          {/* Menu container */}
          <div
            className={`mt-2 w-[90vw] max-w-xs mx-auto transition-all duration-300 ease-out ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col space-y-1">
                {navigation.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-200 font-medium cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-200 font-medium cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ),
                )}
                
                {/* More submenu for mobile */}
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-200 font-medium cursor-pointer flex items-center justify-between"
                >
                  <span>Еще</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {moreOpen && (
                  <div className="pl-3 space-y-1">
                    {moreItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setMoreOpen(false);
                        }}
                        className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 text-left transition-all duration-200 text-sm cursor-pointer block"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
                
                <div className="h-px bg-white/10 my-2" />
                <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                  <DialogTrigger asChild>
                    <button
                      className="relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-full flex items-center transition-all duration-200 hover:scale-105 cursor-pointer group w-full border-2 border-transparent hover:border-primary hover:shadow-[0_0_20px_rgba(156,81,255,0.5)]"
                    >
                      <span className="mr-2">Связаться</span>
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Свяжитесь с нами</DialogTitle>
                      <DialogDescription>
                        Выберите удобный способ связи
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 py-4">
                      <a
                        href={siteConfig.contacts.telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => setContactOpen(false)}
                      >
                        <Send className="w-5 h-5 text-primary" />
                        <span className="font-medium">Telegram</span>
                      </a>
                      <a
                        href={siteConfig.contacts.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => setContactOpen(false)}
                      >
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span className="font-medium">WhatsApp</span>
                      </a>
                      <a
                        href={siteConfig.contacts.phoneHref}
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => setContactOpen(false)}
                      >
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="font-medium">Позвонить</span>
                      </a>
                      <button
                        onClick={() => {
                          setContactOpen(false);
                          setIsOpen(false);
                          scrollToSection("#contact-form");
                        }}
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer text-left"
                      >
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="font-medium">Заполнить бриф онлайн</span>
                      </button>
                      <a
                        href={siteConfig.contacts.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => setContactOpen(false)}
                      >
                        <Radio className="w-5 h-5 text-primary" />
                        <span className="font-medium">{siteConfig.contacts.channelLabel}</span>
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
