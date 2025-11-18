import logo from "../logo.png";


export default function Header({ onGetStarted }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0E0702]/95 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-4 md:px-20 py-3.5 md:py-4">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="SnapDisclosures"
            width={200}  
          />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            How It Works
          </a>
          <a
            href="#contact"
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            Contact
          </a>
        </nav>

        <button
          onClick={onGetStarted}
          className="px-6 py-2 rounded-full bg-white text-black"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
