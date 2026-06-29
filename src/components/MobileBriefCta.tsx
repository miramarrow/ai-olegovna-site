import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileBriefCta = () => {
  const [hasReachedAbout, setHasReachedAbout] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const about = document.getElementById("about");
    const form = document.getElementById("contact-form");
    if (!about || !form) return;

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasReachedAbout(true);
        }
      },
      {
        rootMargin: "0px 0px -35% 0px",
        threshold: 0.12,
      },
    );

    const formObserver = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry.isIntersecting),
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.08,
      },
    );

    aboutObserver.observe(about);
    formObserver.observe(form);

    return () => {
      aboutObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  const isVisible = hasReachedAbout && !isFormVisible;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition duration-200 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="border-t border-primary/15 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
        <Button className="h-12 w-full rounded-md" asChild>
          <a href="/#contact-form">
            Заполнить бриф
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MobileBriefCta;
