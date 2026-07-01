import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoForPath, structuredData } from "@/config/seo";

const ensureMeta = (attribute: "name" | "property", key: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  return tag;
};

const setMeta = (attribute: "name" | "property", key: string, content: string) => {
  ensureMeta(attribute, key).setAttribute("content", content);
};

const setCanonical = (url: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);
};

const setStructuredData = () => {
  let script = document.getElementById("sborkai-jsonld") as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = "sborkai-jsonld";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(structuredData);
};

const Seo = () => {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);

    document.title = seo.title;
    setCanonical(seo.canonicalUrl);
    setMeta("name", "description", seo.description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "ru_RU");
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", seo.canonicalUrl);
    setMeta("property", "og:image", seo.imageUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:url", seo.canonicalUrl);
    setMeta("name", "twitter:image", seo.imageUrl);
    setStructuredData();
  }, [location.pathname]);

  return null;
};

export default Seo;
