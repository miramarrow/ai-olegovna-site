import { X, Zap, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PromoBannerProps {
  onLearnMoreClick?: () => void;
}

const PromoBanner = ({ onLearnMoreClick }: PromoBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if banner was closed in this session
    const bannerClosed = sessionStorage.getItem("promoBannerClosed");
    if (bannerClosed) {
      setIsVisible(false);
    }
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("promoBannerClosed", "true");
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary via-primary/90 to-primary text-white border-b border-primary-foreground/20">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-full shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <p className="font-bold text-sm sm:text-base">
                  🎉 Экспресс-разработка лендинга за 30 000 ₽
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Акция до 11 ноября</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5 hidden sm:block">
                Фиксированная цена • Разработка за 3 дня • Гарантия 3 месяца
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white text-primary hover:bg-white/90 font-semibold h-8 sm:h-9 text-xs sm:text-sm px-3 sm:px-4"
              onClick={onLearnMoreClick}
            >
              Узнать больше
            </Button>
            
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
