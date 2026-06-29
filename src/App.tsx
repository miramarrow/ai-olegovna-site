import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { PageTransition } from "@/components/PageTransition";
import { NavigationTransition } from "@/components/NavigationTransition";
import Index from "./pages/Index";
import ServiceTemplate from "./pages/services/ServiceTemplate";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contacts from "./pages/Contacts";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import ContractDevelopment from "./pages/ContractDevelopment";
import ContractSupport from "./pages/ContractSupport";
import BriefWebsite from "./pages/BriefWebsite";
import BriefTelegram from "./pages/BriefTelegram";
const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          
          <NavigationTransition />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceTemplate />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/documents/contract-development" element={<ContractDevelopment />} />
              <Route path="/documents/contract-support" element={<ContractSupport />} />
              <Route path="/documents/brief-website" element={<BriefWebsite />} />
              <Route path="/documents/brief-telegram" element={<BriefTelegram />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
