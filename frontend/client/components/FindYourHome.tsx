export default function FindYourHome() {
  const marketData = [
    {
      label: "TREND",
      value: "+3.2%",
      price: "$420,000",
      description: "Average home prices in your area this month for apartments.",
      color: "#F3C527",
    },
    {
      label: "TREND",
      value: "+3.2%",
      price: "$457,300",
      description: "Average home prices in your area this month for apartments.",
      color: "#FF0092",
    },
    {
      label: "TREND",
      value: "+3.2%",
      price: "$535,000",
      description: "Average home prices in your area this month for apartments.",
      color: "#FF5C42",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1266px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-end gap-8">
          {/* Left Content */}
          <div className="flex flex-col gap-8 flex-1 max-w-[485px]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6A6A6A] bg-white/5 backdrop-blur-[25px] w-fit">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9.89625 5.3125L11.3688 9.0475L15.1038 10.5212L11.3688 11.9938L9.89625 15.7288L8.4225 11.9938L4.6875 10.5212L8.4225 9.0475L9.89625 5.3125Z"
                  fill="#FAFD68"
                />
                <path
                  d="M9.89625 4.79125C10.1087 4.79125 10.3025 4.9225 10.38 5.12125L11.77 8.64625L15.295 10.0363C15.392 10.0748 15.4752 10.1416 15.5338 10.2279C15.5924 10.3143 15.6237 10.4163 15.6237 10.5206C15.6237 10.625 15.5924 10.7269 15.5338 10.8133C15.4752 10.8997 15.392 10.9664 15.295 11.005L11.77 12.395L10.38 15.92C10.3414 16.017 10.2747 16.1002 10.1883 16.1588C10.1019 16.2174 9.99999 16.2487 9.89563 16.2487C9.79126 16.2487 9.6893 16.2174 9.60294 16.1588C9.51658 16.1002 9.44981 16.017 9.41125 15.92L8.02125 12.395L4.49625 11.005C4.39927 10.9664 4.3161 10.8997 4.2575 10.8133C4.1989 10.7269 4.16757 10.625 4.16757 10.5206C4.16757 10.4163 4.1989 10.3143 4.2575 10.2279C4.3161 10.1416 4.39927 10.0748 4.49625 10.0363L8.02125 8.64625L9.41125 5.12125C9.45007 5.02422 9.51696 4.94098 9.60336 4.88219C9.68976 4.8234 9.79174 4.79174 9.89625 4.79125Z"
                  fill="#FF6B00"
                />
              </svg>
              <span className="text-[#DCDCDC] text-sm">Powered by Snaphomz</span>
            </div>

            <h2 className="text-white text-5xl md:text-6xl lg:text-[80px] leading-tight md:leading-[90px] tracking-[-0.04em]">
              Find Your Next Home
            </h2>

            <p className="text-[#C5C5C5] text-base leading-[28px] tracking-[-0.04em]">
              Snaphomz connects you to verified property listings, giving you clear insights before
              you buy. You can easily browse homes for sale, see real-time market trends, and make
              smarter buying decisions with confidence.
            </p>

            <button className="px-6 py-2 rounded-full bg-gradient-to-b from-[rgba(255,135,55,0.8)] to-[rgba(255,78,0,0.8)] shadow-[0_-2px_2px_0_rgba(255,255,255,0.5)_inset] text-white text-base font-medium hover:shadow-[0_-2px_4px_0_rgba(255,255,255,0.6)_inset] transition-all w-fit">
              Browse Homes Now
            </button>
          </div>

          {/* Right Content - Market Snapshots Device Mockup */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative w-full max-w-[796px] h-[573px] mx-auto">
              {/* Device Frame */}
              <div className="absolute inset-0 rounded-[57px] bg-[#1A1A1A] p-3.5">
                <div className="relative w-full h-full rounded-[43px] bg-black overflow-hidden">
                  {/* Property Image - Left Side */}
                  <div className="absolute left-0 top-0 bottom-0 w-[190px]">
                    <img
                      src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&auto=format&fit=crop"
                      alt="Modern home interior"
                      className="w-full h-full object-cover"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                  </div>

                  {/* Market Data - Right Side */}
                  <div className="absolute left-[190px] right-0 top-0 bottom-0 px-8 md:px-12 py-10 md:py-12">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-10">
                        <h3 className="text-white text-3xl md:text-[44px] leading-[52px] tracking-[-0.04em] mb-2">
                          Market <span className="font-serif italic">Snapshots</span>
                        </h3>
                        <p className="text-[#C5C5C5] text-sm leading-[23px] tracking-[-0.04em]">
                          Average home prices in your area this month
                        </p>
                      </div>

                      {/* Data List */}
                      <div className="flex flex-col gap-10">
                        {marketData.map((item, index) => (
                          <div key={index} className="relative">
                            {/* Color Bar */}
                            <div
                              className="absolute -left-10 top-0 w-0.5 h-[37.5px]"
                              style={{ backgroundColor: item.color }}
                            />

                            {/* Content */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <p className="text-[#C5C5C5] text-[12px] leading-[10px] tracking-[-0.04em] mb-2.5">
                                  {item.label}
                                </p>
                                <p className="text-white font-serif italic text-[28px] leading-8 tracking-[-0.04em] mb-1">
                                  {item.value}
                                </p>
                                <p className="text-[#C5C5C5] text-sm leading-[23px] tracking-[-0.04em] max-w-[206px]">
                                  {item.description}
                                </p>
                              </div>
                              <div className="text-white font-medium text-2xl leading-8 tracking-[-0.04em] text-right">
                                {item.price}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
