import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function NavigationTransition() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}
