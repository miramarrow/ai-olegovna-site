import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileBriefCta = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry.isIntersecting),
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(form);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition duration-200 ${
        isFormVisible ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100"
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
