import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function NavigationTransition() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToTarget()) return;

    const retryDelays = [50, 150, 300];
    const timeouts = retryDelays.map((delay) => window.setTimeout(scrollToTarget, delay));
    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [location.pathname, location.hash]);

  return null;
}
