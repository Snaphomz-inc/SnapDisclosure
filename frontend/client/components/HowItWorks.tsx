export default function HowItWorks() {
  const steps = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M27 23C29.726 22.434 32 19.894 32 17C32 15.4087 31.3679 13.8826 30.2426 12.7574C29.1174 11.6321 27.5913 11 26 11C26 9.4087 25.3679 7.88258 24.2426 6.75736C23.1174 5.63214 21.5913 5 20 5C18.4087 5 16.8826 5.63214 15.7574 6.75736C14.6321 7.88258 14 9.4087 14 11C12.4087 11 10.8826 11.6321 9.75736 12.7574C8.63214 13.8826 8 15.4087 8 17C8 19.88 10.292 22.42 13 23"
            fill="url(#paint0_linear_upload)"
            fillOpacity="0.24"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.32"
            d="M13 35V32H27V35H13Z"
            fill="white"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M20 28V18" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M20 17L17 21H23L20 17Z"
            fill="white"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="paint0_linear_upload" x1="20" y1="5" x2="20" y2="23">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "Upload Your Archive",
      description: "Drag in any ZIP folder or a PDF from your desktop",
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 31 31" fill="none">
          <path
            d="M23.8583 4.76923H7.14243C5.83388 4.76923 4.76974 5.83338 4.76974 7.14194V23.8579C4.76974 25.1665 5.83388 26.2306 7.14243 26.2306H23.8583C25.1668 26.2306 26.231 25.1665 26.231 23.8579V7.14194C26.231 5.83338 25.1668 4.76923 23.8583 4.76923Z"
            fill="url(#paint0_linear_analyze)"
            fillOpacity="0.24"
            stroke="white"
          />
          <rect x="10.7313" y="10.7308" width="9.5385" height="9.5385" stroke="white" />
          <defs>
            <linearGradient id="paint0_linear_analyze" x1="15.5" y1="0" x2="15.5" y2="31">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "We Extract Instantly",
      description: "The server safely unpacks your files in seconds",
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M27 14V8C27 7.20435 26.6839 6.44129 26.1213 5.87868C25.5587 5.31607 24.7956 5 24 5H8C7.20435 5 6.44129 5.31607 5.87868 5.87868C5.31607 6.44129 5 7.20435 5 8V32C5 32.7956 5.31607 33.5587 5.87868 34.1213C6.44129 34.6839 7.20435 35 8 35H24C24.7956 35 25.5587 34.6839 26.1213 34.1213C26.6839 33.5587 27 32.7956 27 32V25"
            fill="url(#paint0_linear_breakdown)"
            fillOpacity="0.24"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21V18H35V21H21Z"
            fill="white"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.32"
            d="M9 14V11H23V14H9Z"
            fill="white"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="paint0_linear_breakdown" x1="16" y1="5" x2="16" y2="35">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "Review Every File",
      description: "Browse names, paths, and file sizes right away",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-20">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 md:gap-[18px] mb-16 md:mb-24">
          <h2 className="text-white text-center font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight md:leading-[64px] tracking-[-0.04em] italic">
            Here's How It <span className="not-italic">Works</span>
          </h2>
          <p className="text-[#C5C5C5] text-center text-sm md:text-base leading-relaxed tracking-[-0.04em] max-w-[369px]">
            Three simple steps to complete clarity on your closing costs.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative max-w-[886px] mx-auto">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(237,237,248,0.3)] via-transparent to-transparent rounded-3xl" />
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20 py-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center md:items-start gap-5">
                <div className="w-10 h-10 flex items-center justify-center">{step.icon}</div>
                <div className="flex flex-col gap-1 max-w-[236px]">
                  <h3 className="text-[#F4F0FF] text-base font-medium leading-6 text-center md:text-left">
                    {step.title}
                  </h3>
                  <p className="text-[#EFEDFDB3]/60 text-base leading-6 text-center md:text-left">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


