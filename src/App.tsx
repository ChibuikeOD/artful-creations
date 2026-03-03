import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CostumePage from "./pages/Costume";
import SculpturePage from "./pages/Sculpture";
import DigitalPage from "./pages/Digital";
import ArtworkDetail from "./pages/ArtworkDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const basename =
  import.meta.env.BASE_URL.replace(/\/$/, "") === "/"
    ? ""
    : import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/costume" element={<CostumePage />} />
          <Route path="/sculpture" element={<SculpturePage />} />
          <Route path="/digital" element={<DigitalPage />} />
          <Route path="/:category/:id" element={<ArtworkDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
