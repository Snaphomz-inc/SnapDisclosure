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
            <svg
              width="40"
              height="38"
              viewBox="0 0 43 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-auto"
            >
              <path
                d="M17.4453 1.25098C26.3904 1.24951 33.6338 8.53088 33.6338 17.502V27.3984C33.6338 29.0769 32.9867 30.6101 31.9199 31.7451L31.9209 31.7461C30.7663 32.9806 29.1226 33.75 27.3037 33.75H7.58008C4.0821 33.75 1.25004 30.9038 1.25 27.4004V17.5029C1.25022 8.53098 8.49563 1.2513 17.4443 1.25098H17.4453Z"
                fill="black"
                stroke="#F07639"
                strokeWidth="2.5"
              />
              <path
                d="M10.9302 24.2875C10.1143 24.2875 9.35401 24.1386 8.64867 23.8412C7.94333 23.5432 7.32962 23.1319 6.80422 22.6043C6.27883 22.0768 5.86895 21.4609 5.57182 20.7527C5.27524 20.0445 5.12695 19.2879 5.12695 18.4785C5.12695 17.6692 5.27191 16.9171 5.56404 16.22C5.85618 15.5229 6.26272 14.912 6.78812 14.3845C7.31352 13.8569 7.92555 13.4483 8.62479 13.1554C9.32346 12.8624 10.0827 12.7168 10.898 12.7168C11.7244 12.7168 12.4881 12.8624 13.1873 13.1554C13.886 13.4483 14.4986 13.8569 15.024 14.3845C15.5494 14.912 15.9592 15.5262 16.2558 16.2278C16.5524 16.9293 16.7007 17.6847 16.7007 18.4941C16.7007 19.3035 16.5524 20.0589 16.2558 20.7605C15.9592 21.462 15.5488 22.0768 15.024 22.6038C14.4986 23.1313 13.8899 23.5432 13.1956 23.8406C12.5014 24.1386 11.7472 24.2875 10.9302 24.2875ZM10.8985 22.2602C11.6194 22.2602 12.2443 22.1001 12.7741 21.7822C13.3039 21.462 13.7205 21.0217 14.022 20.4581C14.3236 19.8944 14.4747 19.234 14.4747 18.4785C14.4747 17.926 14.3897 17.4207 14.2209 16.9626C14.052 16.5052 13.8077 16.1088 13.4889 15.7731C13.1701 15.4373 12.7946 15.1794 12.3609 14.9987C11.9271 14.818 11.4395 14.728 10.8985 14.728C10.1999 14.728 9.58116 14.8847 9.04633 15.1983C8.51149 15.5118 8.09161 15.9504 7.79059 16.5146C7.48902 17.0783 7.33795 17.7325 7.33795 18.4769C7.33795 19.0405 7.42459 19.557 7.6001 20.0245C7.77504 20.4931 8.0183 20.8922 8.3321 21.2218C8.64423 21.5515 9.02133 21.8061 9.46009 21.9884C9.89996 22.1696 10.3798 22.2602 10.8985 22.2602Z"
                fill="#F07639"
              />
              <path
                d="M28.1857 22.3594C27.6192 22.9503 26.9899 23.3967 26.294 23.6991C25.5981 24.0015 24.8806 24.1616 24.1391 24.176C23.3977 24.1905 22.6768 24.0554 21.9776 23.7725C21.2789 23.489 20.6396 23.0659 20.0593 22.5056C19.4789 21.9447 19.034 21.3193 18.7247 20.6306C18.4153 19.9402 18.2559 19.2259 18.2448 18.4843C18.2337 17.7433 18.3631 17.0179 18.6297 16.3097C18.8979 15.6004 19.3173 14.9478 19.8904 14.3491C20.5075 13.7043 21.1556 13.239 21.8371 12.9505C22.5168 12.662 23.2205 12.5069 23.9481 12.4863L23.9875 14.5626C23.5299 14.5481 23.0789 14.637 22.6324 14.8255C22.1858 15.0156 21.7565 15.3247 21.3466 15.7538C20.9868 16.129 20.7202 16.5332 20.5497 16.9656C20.3775 17.3981 20.302 17.8445 20.3225 18.307C20.3431 18.7695 20.4597 19.2225 20.6741 19.6661C20.8884 20.1097 21.1945 20.5228 21.5921 20.9063C21.9976 21.2977 22.4219 21.5906 22.8684 21.7841C23.3149 21.9786 23.7676 22.077 24.2286 22.0787C24.689 22.0803 25.1344 21.9897 25.5615 21.8046C25.9891 21.6195 26.3818 21.3388 26.7433 20.9636C27.1771 20.5105 27.4815 20.0558 27.6553 19.5967C27.8302 19.1375 27.898 18.6767 27.8586 18.2092L29.9268 18.1697C29.9413 18.9062 29.813 19.6239 29.5419 20.3221C29.2693 21.0214 28.8183 21.7007 28.1857 22.3594Z"
                fill="#F07639"
              />
            </svg>
            <span className="text-white font-bold text-base">SnapDisclosure</span>
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
            SnapDisclosure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
