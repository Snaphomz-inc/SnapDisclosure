import "./global.css";

import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [resetKey, setResetKey] = useState(0);

  const handleResetHero = () => {
    setResetKey((k) => k + 1);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Index key={resetKey} onResetHero={handleResetHero} />
      </TooltipProvider>
    </QueryClientProvider>
);
};

createRoot(document.getElementById("root")!).render(<App />);
