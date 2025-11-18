import { useState, useEffect } from "react";
import { StatusBadge } from "./StatusBadge";
import { KeyFacts } from "./KeyFacts";
import { FindingsTable } from "./FindingsTable";
import FileUploadBox from "./FileUploadBox";
import { analyzeClosingDisclosure, generateSummary, type AnalysisResponse } from "@shared/api";

const loadingStages = [
  "Booting up the audit engines… fetching your disclosure from orbit 🚀",
  "Scanning every line item — no fee left behind.",
  "Running neural checks… decoding legalese into plain English.",
  "Benchmarking your costs against real-world data — and a touch of AI intuition.",
  "Looking for outliers, hidden fees, and creative math 🧮",
  "Cross-verifying lender inputs… because trust, but verify.",
  "Optimizing results... Your audit is being polished for perfection ✨",
  "Ready to see how your closing costs stack up? Almost there…"
];

export function AnalyzerSection() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [fastMode] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (loading) {
      let i = 0;
      setLoadingText(loadingStages[i]); // show first stage immediately

      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          i = (i + 1) % loadingStages.length; // loop back to Stage 1 after last
          setLoadingText(loadingStages[i]);
          setFade(true);
        }, 500); // fade-out transition before updating
      }, 8000); // 8 seconds per stage

      return () => clearInterval(interval);
    } else {
      setLoadingText("");
      setFade(true);
    }
  }, [loading]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a Closing Disclosure PDF.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);
    setSummary("");

    try {
      const result = await analyzeClosingDisclosure(file, fastMode);
      setData(result);

      setSummaryLoading(true);
      const summaryText = await generateSummary(result.report?.items || []);
      setSummary(summaryText);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Analysis failed");
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
      setSummaryLoading(false);
    }
  };

  const ex = data?.extracted;
  const report = data?.report;

  return (
    <div className="w-full bg-white text-gray-900 py-16 sm:py-20 md:py-24" id="analyzer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-[#231F20]">
            Closing Disclosure Analyzer
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your CFPB Closing Disclosure PDF to extract key details and benchmark your closing costs against market standards.
          </p>
        </div>

        {/* Upload Section */}
        {!data && (
          <div className="mb-8">
            <FileUploadBox
              onFileSelect={handleFileSelect}
              acceptedFormats={[".pdf"]}
              maxSizeMB={10}
              disabled={loading}
            />

            {file && !loading && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleAnalyze}
                  className="flex px-8 py-3 justify-center items-center gap-2 rounded-full bg-brand hover:bg-brand-600 transition-colors shadow-lg"
                >
                  <span className="text-white text-center text-base font-semibold">
                    Analyze Document
                  </span>
                </button>
              </div>
            )}

            {loading && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-3 bg-brand-50 px-6 py-4 rounded-2xl border border-brand-200">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand"></div>
                  <span
                    className="text-brand-800 text-sm font-medium"
                    style={{
                      opacity: fade ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  >
                    {loadingText || "Analyzing…"}
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 max-w-2xl mx-auto bg-red-50 text-red-800 border border-red-300 p-4 rounded-xl text-center">
                {error}
              </div>
            )}

            {!file && !loading && (
              <div className="mt-8 max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <p className="font-semibold mb-1">💡 Tip:</p>
                <p>Start with a CFPB sample PDF to validate parsing. You'll see section-by-section checks with clear verdicts: "All Good", "Check Details", or "Needs Action".</p>
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        {data && (
          <>
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setData(null);
                  setFile(null);
                  setSummary("");
                  setError("");
                }}
                className="text-brand hover:text-brand-600 font-medium flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Analyze Another Document
              </button>
            </div>

            {/* Verdict & Summary */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <h3 className="text-xl font-bold mb-3 text-[#231F20]">Verdict</h3>
                  <div className="mb-4">
                    <StatusBadge status={report?.verdict} />
                  </div>
                  <KeyFacts
                    loanAmount={ex?.loan_terms?.loan_amount}
                    rate={ex?.loan_terms?.interest_rate_pct}
                    apr={ex?.loan_terms?.apr || ex?.loan_calculations?.apr_pct}
                    termYears={ex?.loan_information?.loan_term_years}
                    monthlyPayment={ex?.loan_terms?.monthly_principal_interest}
                    cashToCloseAmount={ex?.summaries_of_transactions?.borrowers_transaction?.cash_to_close_amount}
                    cashToCloseDirection={ex?.summaries_of_transactions?.borrowers_transaction?.cash_to_close_direction}
                    prepaymentPenalty={ex?.loan_terms?.prepayment_penalty}
                    balloonPayment={ex?.loan_terms?.balloon_payment}
                    loanProduct={ex?.loan_information?.product}
                    loanType={ex?.loan_information?.loan_type}
                  />
                </div>

                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <h3 className="text-xl font-bold mb-3 text-[#231F20]">Summary</h3>
                  {summaryLoading ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand"></div>
                      <span>Generating summary…</span>
                    </div>
                  ) : (ex?.confidence_notes?.length ?? 0) === 0 && !summary ? (
                    <p className="text-gray-600">No notes available.</p>
                  ) : (
                    <>
                      {ex?.confidence_notes && ex.confidence_notes.length > 0 && (
                        <ul className="list-disc my-2 pl-5 space-y-1 text-gray-700">
                          {ex.confidence_notes.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      )}
                      {summary && <p className="mt-3 text-gray-700 leading-relaxed">{summary}</p>}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Findings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#231F20]">Detailed Findings</h3>
              <FindingsTable items={report?.items || []} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
