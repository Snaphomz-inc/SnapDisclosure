import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FindYourHome from "@/components/FindYourHome";
import Footer from "@/components/Footer";
import FileUploadBox from "@/components/FileUploadBox";
import FileListDisplay from "@/components/FileListDisplay";
import { UploadResponse, FileInfo } from "@shared/api";

export default function Index() {
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
  };

  return (
    <div className="min-h-screen bg-[#0E0702] text-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <FindYourHome />

      {/* --- ZIP Upload Section --- */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {!uploadedFiles ? (
            <>
              <FileUploadBox
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                acceptedFormats={[".zip"]}
                maxSizeMB={200}
              />
              {error && (
                <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-center">
                  <p className="text-red-200">{error}</p>
                </div>
              )}
            </>
          ) : (
            <FileListDisplay
              files={uploadedFiles}
              onClose={handleReset}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
