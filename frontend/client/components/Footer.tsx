import logo from "../logo.png"

export default function Footer() {
  return (
    <footer className="relative py-20 md:py-32 overflow-hidden border-t border-white/10">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-20">
        {/* CTA Section */}
        <div className="flex flex-col items-center gap-8 md:gap-16 mb-20 md:mb-32">
          {/* Icon */}
          <div className="w-[103px] h-[103px] rounded-[20px] border border-[#666] bg-gradient-to-b from-[#26262B] to-[#121214] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-[117px] h-[117px] rotate-[30deg] opacity-80"
                style={{
                  background: "radial-gradient(171.08% 67.67% at 112.5% 0%, #C2EFFE 0%, #FD962E 100%)",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 md:gap-16 max-w-[632px]">
            <h2 className="text-white text-center font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight md:leading-[64px] tracking-[-0.04em] italic">
              Have Questions? We're Here to <span className="not-italic">Help</span>
            </h2>

            <button className="px-6 py-2 rounded-full border border-white bg-white/80 hover:bg-white shadow-[0_0_16px_0_rgba(255,255,255,0.5)_inset] text-black text-base font-medium transition-all">
              Contact Us
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 pb-12 border-t border-white/10 pt-12 md:pt-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
           <img
            src={logo}
            alt="SnapDisclosures"
            width={200}  
          />
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {/* Product */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#F4F0FF] text-sm font-medium">Product</h3>
              <div className="flex flex-col gap-5">
                <a href="#features" className="text-[#EFEDFDB3]/60 text-sm hover:text-white transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-[#EFEDFDB3]/60 text-sm hover:text-white transition-colors">
                  How it works
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#F4F0FF] text-sm font-medium">Company</h3>
              <div className="flex flex-col gap-5">
                <a href="#" className="text-[#EFEDFDB3]/60 text-sm hover:text-white transition-colors">
                  Snaphomz
                </a>
                <a href="#contact" className="text-[#EFEDFDB3]/60 text-sm hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#F4F0FF] text-sm font-medium">Legal</h3>
              <div className="flex flex-col gap-5">
                <a href="#" className="text-[#EFEDFDB3]/60 text-sm hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-[#EFEDFDB3]/60 text-sm hover:text-white transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-[#EFEDFDB3]/60 text-sm">
            SnapDisclosures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
