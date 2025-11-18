import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const queryClient = new QueryClient();
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key in .env");
}

const App = () => (
  // <ClerkProvider publishableKey={clerkPubKey}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Index />
        {/* <BrowserRouter>
          <Routes>
            {/* Public Auth Routes */}
            {/* <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} /> */}

            {/* Protected Routes */}
            {/* <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Index /> 
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            /> */}

            {/* Catch-all */}
            {/* <Route path="*" element={<NotFound />} />
          </Routes>  */}
        {/* </BrowserRouter> */}
      </TooltipProvider>
    </QueryClientProvider>
  // </ClerkProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
