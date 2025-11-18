import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FindYourHome from "@/components/FindYourHome";
import Footer from "@/components/Footer";
import { UploadResponse, FileInfo } from "@shared/api";

// Add a prop type for reset handler from App.tsx
interface IndexProps {
  onResetHero?: () => void;
}

export default function Index({ onResetHero }: IndexProps) {
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadSuccess = (response: UploadResponse) => {
    if (response.success && response.files) {
      setUploadedFiles(response.files);
      setError(null);
      console.log("Upload successful:", response);
    } else {
      setError(response.error || "Upload failed");
      setUploadedFiles(null);
    }
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
    setUploadedFiles(null);
  };

  const handleReset = () => {
    setUploadedFiles(null);
    setError(null);
    onResetHero?.(); // trigger App-level reset if provided
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  };

  return (
    <div className="min-h-screen bg-[#0E0702] text-white">
      <Header onGetStarted={handleReset} />
      <Hero onReset={handleReset} />
      <Features onGetStarted={handleReset} />
      <HowItWorks />
      <FindYourHome />
      <Footer />
    </div>
  );
}
