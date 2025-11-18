// types
export interface SummaryPoint {
  title: string;
  summary: string;
  details: string;
  is_red_flag?: boolean; // ✅ Optional field to mark red flag points
}

export interface ReportItem {
  section: string;
  label: string;
  observed?: string | number;
  expected?: string;
  status: "PASS" | "FAIL" | "WARN" | "INFO";
  note?: string;
  computed?: {
    loan_amount?: number;
  };
}


export interface FileInfo {
  file_name: string;
  title?: string;
  points?: SummaryPoint[];
}

export interface UploadResponse {
  success: boolean;
  files?: FileInfo[];
  error?: string;
}

// ✅ API Base function
function getFlaskApiBase(): string {
  if (typeof window !== "undefined") {
    // Use environment variable from .env (e.g. VITE_FLASK_API_BASE)
    return (
      (import.meta as any).env?.VITE_FLASK_API_BASE ||
      "http://127.0.0.1:5000"
    );
  }
  return "http://127.0.0.1:5000";
}

// ✅ Upload File function
export async function uploadFileToFlask(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${getFlaskApiBase()}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Upload failed with status: ${response.status}`
      );
    }

    const data: UploadResponse = await response.json();

    // Handle failed upload case
    if (!data.success) {
      throw new Error(data.error || "Upload failed");
    }

    // ✅ Normalize red flag fields (optional safeguard)
    if (data.files && Array.isArray(data.files)) {
      data.files.forEach((file) => {
        if (file.points) {
          file.points = file.points.map((p) => ({
            ...p,
            is_red_flag: p.is_red_flag ?? false, // ensure boolean
          }));
        }
      });
    }

    return data;
  } catch (error) {
    console.error("Upload failed:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Upload failed unexpectedly",
    };
  }
}
