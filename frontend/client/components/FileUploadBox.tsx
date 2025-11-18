import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { uploadFileToFlask, UploadResponse } from "@shared/api";

interface FileUploadBoxProps {
  onFileSelect?: (file: File) => void;
  onUploadSuccess?: (response: UploadResponse) => void;
  onUploadError?: (error: string) => void;
  acceptedFormats?: string[];
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
}

export default function FileUploadBox({
  onFileSelect,
  onUploadSuccess,
  onUploadError,
  acceptedFormats = [".zip"],
  maxSizeMB = 200,
  className,
  disabled = false,
}: FileUploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    const fileSizeMB = file.size / (1024 * 1024);

    if (!acceptedFormats.includes(fileExtension)) {
      setError(`Please upload ${acceptedFormats.join(", ")} files only`);
      return false;
    }

    if (fileSizeMB > maxSizeMB) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }

    setError("");
    return true;
  };

  const handleFile = async (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect?.(file);

      // Upload file to Flask backend
      setIsUploading(true);
      setError("");

      try {
        const response = await uploadFileToFlask(file);

        if (response.success) {
          onUploadSuccess?.(response);
        } else {
          const errorMsg = response.error || "Upload failed";
          setError(errorMsg);
          onUploadError?.(errorMsg);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Upload failed";
        setError(errorMsg);
        onUploadError?.(errorMsg);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleBrowseClick = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  const isDisabled = disabled || isUploading;

  return (
    <div className={cn("w-full max-w-[892px] mx-auto", className)}>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "flex justify-center items-center rounded-2xl border-[1.5px] border-dashed",
          "transition-all duration-200",
          "px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-11 lg:px-12 lg:py-14",
          isDisabled
            ? "cursor-not-allowed opacity-50 border-[#D8D5D3] bg-[#F1F1F3]"
            : isDragging
            ? "border-brand bg-brand-50 cursor-pointer"
            : "border-[#D8D5D3] bg-[#F1F1F3] hover:bg-[#EBEBED] cursor-pointer"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(",")}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isDisabled}
        />

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg
              className="w-14 h-14"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" r="28" fill="white" />
            </svg>
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00033 11.0833C7.00033 7.5395 9.87317 4.66666 13.417 4.66666C16.5562 4.66666 19.171 6.92204 19.7252 9.90112C19.8029 10.3189 20.1016 10.6613 20.5049 10.7951C22.8275 11.5654 24.5003 13.7555 24.5003 16.3333C24.5003 19.555 21.8887 22.1667 18.667 22.1667C18.0227 22.1667 17.5003 22.689 17.5003 23.3333C17.5003 23.9777 18.0227 24.5 18.667 24.5C23.1773 24.5 26.8337 20.8437 26.8337 16.3333C26.8337 12.9588 24.7876 10.0648 21.871 8.8195C20.873 5.08433 17.4674 2.33333 13.417 2.33333C8.5845 2.33333 4.66699 6.25084 4.66699 11.0833C4.66699 11.2003 4.6693 11.3168 4.67386 11.4328C2.57922 12.6413 1.16699 14.9046 1.16699 17.5C1.16699 21.366 4.301 24.5 8.16699 24.5C8.81133 24.5 9.33366 23.9777 9.33366 23.3333C9.33366 22.689 8.81133 22.1667 8.16699 22.1667C5.58966 22.1667 3.50033 20.0773 3.50033 17.5C3.50033 15.5664 4.67653 13.9049 6.35709 13.197C6.8434 12.9921 7.13165 12.4863 7.06005 11.9635C7.02072 11.6763 7.00033 11.3825 7.00033 11.0833Z"
                fill="black"
                fillOpacity="0.5"
              />
              <path
                d="M13.2252 16.628C13.6673 16.2351 14.3334 16.2351 14.7754 16.628L16.5254 18.1836C17.007 18.6116 17.0504 19.3491 16.6223 19.8306C16.2478 20.2519 15.6366 20.3379 15.167 20.0662V25.6667C15.167 26.311 14.6447 26.8333 14.0003 26.8333C13.356 26.8333 12.8337 26.311 12.8337 25.6667V20.0662C12.3641 20.3379 11.7528 20.2519 11.3783 19.8306C10.9503 19.3491 10.9937 18.6116 11.4752 18.1836L13.2252 16.628Z"
                fill="black"
                fillOpacity="0.5"
              />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-0.5 w-full">
            <div className="flex justify-center items-center gap-1 flex-wrap">
              <span className="text-brand text-sm font-semibold leading-[145%]">
                {isUploading ? "Uploading..." : "Click to upload"}
              </span>
              {!isUploading && (
                <span className="text-black text-sm font-normal leading-[145%]">
                  or drag and drop
                </span>
              )}
            </div>
            <p className="text-black/50 text-center text-xs font-normal leading-[145%]">
              ZIP (max. {maxSizeMB}MB)
            </p>
          </div>

          <div className="relative h-6 w-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-[#D6D5D5]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F4F4F4] px-2">
              <span className="text-black/50 text-center text-xs font-semibold leading-[145%]">
                OR
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleBrowseClick();
            }}
            disabled={isDisabled}
            className="flex px-4 py-2 justify-center items-center gap-2 rounded-3xl bg-brand hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-white text-center text-sm font-semibold leading-5">
              {isUploading ? "Uploading..." : "Browse Files"}
            </span>
          </button>

          {selectedFile && (
            <div className="mt-2 text-sm text-center">
              <p className="text-green-700 font-medium">
                Selected: {selectedFile.name}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-2 text-sm text-center">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
