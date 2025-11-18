
interface FeaturesProps {
  onGetStarted?: () => void;
}

export default function Features({ onGetStarted }: FeaturesProps) {
  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0E0702]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-20">
        <div className="flex flex-col items-center gap-12 md:gap-20">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-8 max-w-[751px]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6A6A6A] bg-white/5 backdrop-blur-[25px]">
              <span className="text-[#FF8F4C] text-sm">Features</span>
            </div>

            <div className="flex flex-col items-center gap-4 md:gap-[18px]">
              <h2 className="text-white text-center font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight md:leading-[64px] tracking-[-0.04em] italic">
                Everything That Works for <span className="not-italic">You</span>
              </h2>
              <p className="text-[#C5C5C5]/70 text-center text-sm md:text-base leading-relaxed tracking-[-0.04em] max-w-[369px]">
                Powerful AI analysis combined with expert real estate knowledge to give you complete
                clarity.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1088px]">
            {/* Smart Document Analysis */}
            <div className="lg:row-span-2 rounded-[20px] border border-[#262626] bg-[#150901] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute -top-32 -left-32 w-[504px] h-[368px] rounded-full bg-white/15 blur-[125px]" />
              <div className="relative z-10">
                <h3 className="text-white text-center text-2xl md:text-[27px] font-medium leading-8 tracking-[-0.04em] mb-4">
                  Smart document analysis
                </h3>
                <p className="text-[#C5C5C5]/70 text-center text-sm leading-relaxed tracking-[-0.04em]">
                  AI-powered analysis instantly identifies all fees, charges, and important terms in
                  your disclosure documents.
                </p>
              </div>

              {/* Chart Visualization */}
              <div className="relative z-10 flex justify-center items-end gap-2 h-32 mt-auto">
                {[41, 71, 91, 104, 116, 71, 53, 57].map((height, i) => (
                  <div
                    key={i}
                    className={`w-8 rounded-xl ${
                      i === 4
                        ? "bg-gradient-to-b from-[#FEE7C2] to-[#FD962E] shadow-[0_5.26px_5.26px_0_rgba(253,150,46,0.07),0_-1.315px_1.315px_0_rgba(255,255,255,0.29)_inset]"
                        : "bg-gradient-to-b from-[#332922] to-[rgba(34,23,16,0.66)] shadow-[0_1.11px_1.11px_0_rgba(255,255,255,0.09)_inset] opacity-90"
                    }`}
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Plain English Explanations */}
            <div className="rounded-[20px] border border-[#262626] bg-[#150901] p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden min-h-[228px]">
              <div className="absolute -top-64 -left-72 w-[504px] h-[368px] rounded-full bg-white/15 blur-[125px]" />
              <div className="relative z-10">
                <h3 className="text-white text-center text-2xl md:text-[27px] font-medium leading-8 tracking-[-0.04em] mb-4">
                  Plain English explanations
                </h3>
                <p className="text-[#373431]/70 text-sm leading-relaxed tracking-[-0.04em]">
                  This <span className="text-[#605E5B]/70">document is about</span> a home{" "}
                  <span className="text-[#56524E]/50">purchase</span> loan. The loan has a fixed
                  interest rate...
                </p>
                <div className="text-center mt-8">
                  <span className="text-[#F86A05] text-6xl md:text-[88px] font-bold leading-none tracking-[-0.04em] drop-shadow-[0_0_20px_#F86A05]">
                    5%
                  </span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="lg:row-span-2 rounded-[20px] border border-[#262626] bg-[#150901] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
              <h3 className="text-white text-center text-2xl md:text-[27px] font-medium leading-8 tracking-[-0.04em]">
                Cost breakdown
              </h3>
              <p className="text-[#C5C5C5]/70 text-center text-sm leading-relaxed tracking-[-0.04em]">
                Get a clear, itemized breakdown of all costs including lender fees, third-party
                services, and prepaid items.
              </p>

              {/* Status Timeline */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="rounded-2xl bg-gradient-to-b from-[#332922] to-[rgba(34,23,16,0.66)] p-4 backdrop-blur-[34px]">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-3">
                      <div className="w-6 h-6 rounded-xl bg-gradient-to-b from-[#C2EFFE] to-[#FD962E] flex items-center justify-center shadow-[0_5.26px_5.26px_0_rgba(253,150,46,0.07),0_-1.315px_1.315px_0_rgba(255,255,255,0.29)_inset]">
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3.33325 8.00008L6.66659 11.3334L13.3333 4.66675"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="w-0.5 h-6 bg-gradient-to-b from-[#C2EFFE] to-[#FD962E] mx-auto" />
                      <div className="w-6 h-6 rounded-xl bg-gradient-to-b from-[#C2EFFE] to-[#FD962E] flex items-center justify-center shadow-[0_5.26px_5.26px_0_rgba(253,150,46,0.07),0_-1.315px_1.315px_0_rgba(255,255,255,0.29)_inset]">
                        <div className="w-4 h-4 border border-white/20 rounded-full" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <div>
                        <p className="text-[#AEAEAE] text-base">Submitted</p>
                      </div>
                      <div>
                        <p className="text-[#AEAEAE] text-base">Pending</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#AEAEAE] text-sm mt-2">May 08, 2025</p>
                </div>
              </div>
            </div>

            {/* Identify Red Flags */}
            <div className="rounded-[20px] border border-[#262626] bg-[#150901] p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden min-h-[224px]">
              <div className="absolute -top-64 -left-20 w-[504px] h-[368px] rounded-full bg-white/7 blur-[125px]" />
              <h3 className="text-white text-center text-2xl md:text-[27px] font-medium leading-8 tracking-[-0.04em]">
                Identify red flags
              </h3>
              <div className="relative z-10 flex justify-center mt-auto">
                <svg width="300" height="150" viewBox="0 0 300 150" className="w-full max-w-[300px]">
                  <defs>
                    <radialGradient id="waveGrad">
                      <stop offset="0%" stopColor="#FF6B6B" />
                      <stop offset="100%" stopColor="#EE5A24" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M0,75 Q25,50 50,75 T100,75 T150,75 T200,75 T250,75 T300,75"
                    fill="none"
                    stroke="url(#waveGrad)"
                    strokeWidth="3"
                    opacity="0.6"
                  />
                  <circle cx="150" cy="75" r="8" fill="#FF6B6B" className="animate-pulse" />
                </svg>
              </div>
            </div>

            {/* Savings Opportunities */}
            <div className="rounded-[20px] border border-[#262626] bg-[#150901] p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden">
              <h3 className="text-white text-center text-2xl md:text-[27px] font-medium leading-8 tracking-[-0.04em]">
                Savings opportunities
              </h3>
              <p className="text-[#C5C5C5]/70 text-center text-sm leading-relaxed tracking-[-0.04em]">
                Discover where you might be able to negotiate or find alternative options to reduce
                closing costs.
              </p>

              {/* File List */}
              <div className="flex flex-col gap-2.5 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-9 rounded ${i === 3 ? "border border-dashed border-white/30" : "bg-[#231003]"}`}
                  />
                ))}
                <div className="relative -mt-24 rotate-[-4deg]">
                  <div className="h-9 bg-[#261C14] rounded shadow-[2px_4px_13px_2px_rgba(0,0,0,0.16)] flex items-center justify-between px-3">
                    <span className="text-[#B6AAAA]/70 text-xs">Negotiate lower costs</span>
                    <span className="text-[#3FFF42]/67 text-xs font-medium">$3,590</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
          onClick={onGetStarted}
          className="px-6 py-2 rounded-full bg-gradient-to-b from-[rgba(255,143,76,0.8)] to-[rgba(242,93,4,0.8)] shadow-[0_-2px_2px_0_rgba(255,255,255,0.5)_inset] text-white text-base font-medium hover:shadow-[0_-2px_4px_0_rgba(255,255,255,0.6)_inset] transition-all">
            Start Analyzing
          </button>
        </div>
      </div>
    </section>
  );
}
