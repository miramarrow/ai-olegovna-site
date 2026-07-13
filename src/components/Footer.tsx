import { Link } from "react-router-dom";
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
            <h3 className="mb-4 font-semibold">Правовая информация</h3>
            <div className="mb-5 space-y-1 text-xs leading-relaxed text-muted-foreground">
              <p>{siteConfig.operator.displayName}</p>
              <p>{siteConfig.operator.inn}</p>
              <p>{siteConfig.operator.ogrnip}</p>
              <p>{siteConfig.operator.registrationAuthority}</p>
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground transition-colors hover:text-primary">Информация о данных</Link></li>
              <li><Link to="/terms" className="text-muted-foreground transition-colors hover:text-primary">Условия использования</Link></li>
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
