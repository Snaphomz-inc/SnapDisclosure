import { useState } from "react";
import FileUploadBox from "./FileUploadBox";
import FileListDisplay from "./FileListDisplay";
import type { FileInfo, UploadResponse } from "@shared/api";

export default function Hero({ onReset }) {
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadSuccess = (response: UploadResponse) => {
     console.log("Selected file for upload:", response); 

    if (response.success && response.files) {
      setUploadedFiles(response.files);
      setError(null);
    } else {
      const message = response.error || "Upload failed";
      setError(message);
      setUploadedFiles(null);
    }
  };

  const handleUploadError = (message: string) => {
    setError(message);
    setUploadedFiles(null);
  };
  
  const handleReset = () => {
    setUploadedFiles(null);
    setError(null);
    onReset?.(); 
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">

      {/* 🔆 Background Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[1388px] h-[1015px] rounded-full bg-[#EE741E]/50 blur-[125px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1388px] h-[706px] rounded-full bg-[#0F0702]/70 blur-[50px]" />
        <div className="absolute top-[10%] left-[20%] w-[380px] h-[380px] rounded-full bg-[#EE741E]/50 blur-[50px] mix-blend-plus-lighter" />
        <div className="absolute top-[15%] right-[20%] w-[380px] h-[380px] rounded-full bg-[#EE741E]/50 blur-[50px] mix-blend-plus-lighter" />
      </div>

      <div className="absolute inset-0 backdrop-blur-[20px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 opacity-40 mix-blend-soft-light pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-20 w-full">
        <div className="flex flex-col items-center gap-12 md:gap-16">

          {/* Title */}
          <div className="flex flex-col items-center gap-4 md:gap-[18px] max-w-[680px] pt-8 md:pt-12">
            <h1 className="text-white text-center font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight md:leading-[90px] tracking-[-0.04em] italic">
              Inspect Disclosure Documents In{" "}
              <span className="not-italic">Snap</span>
            </h1>

            <p className="text-[#C5C5C5] text-center text-sm md:text-base leading-relaxed tracking-[-0.02em] max-w-[420px]">
              Drop any ZIP archive or PDF and instantly review every extracted file —
              summarized neatly into key insights.
            </p>
          </div>

          {/* Upload / Display */}
          <div className="relative mx-auto max-w-[920px] w-full">
            {uploadedFiles ? (
              <FileListDisplay files={uploadedFiles} onClose={handleReset} />
            ) : (
              <FileUploadBox
                acceptedFormats={[".zip", ".pdf"]}
                maxSizeMB={200}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
              />
            )}

            {/* Error */}
            {error && (
              <div className="mt-6 max-w-2xl mx-auto bg-red-900/50 backdrop-blur-md text-red-100 border border-red-500/50 p-4 rounded-xl text-center">
                {error}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
