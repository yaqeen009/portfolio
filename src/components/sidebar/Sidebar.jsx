// Sidebar.jsx
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-24 md:bg-[#18191B] md:flex md:flex-col md:items-center md:py-6 md:z-20 md:border-r md:border-[#232427]">
        {/* Logo */}
        <div className="mb-12 flex flex-col items-center">
          <div className="bg-black absolute top-0 left-0 px-3 py-8 flex flex-col items-center justify-center mb-2">
            <span className="text-5xl font-extrabold text-white relative pr-4 tracking-tight">
              <span className="text-[#FF4B5C] relative left-1 top-1">Y</span>
              <span className="text-[#00E6C0] absolute left-2 top-2">Y</span>
            </span>
            <span className="text-white font-bold text-lg text-center">
              Yaqeen
            </span>
          </div>
        </div>
        <nav className="flex-1 flex flex-col pt-64 gap-4">
          {[
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "Showcase", href: "#vr" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-[#00E6C0] text-sm py-2 px-4 rounded transition-colors scroll-smooth"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4 mb-4">
          <a
            href="https://www.linkedin.com/in/yaqeen-wunzaligu-47a545239/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://github.com/yaqeen009"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <span className="text-xs text-gray-500 rotate-[-90deg] absolute left-[-40px] bottom-24">
          scroll down
        </span>
      </aside>

      {/* Mobile Topbar */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#18191B] flex items-center justify-between px-4 py-3 z-30 border-b border-[#232427]">
        <div className="flex items-center gap-2">
          <div className="bg-black rounded-lg w-12 h-12 flex items-center justify-center">
            <span className="text-2xl font-extrabold text-white relative tracking-tight">
              <span className="text-[#00E6C0] relative left-0.5 top-0.5">
                Y
              </span>
              <span className="text-[#FF4B5C] absolute left-1 top-1">Y</span>
            </span>
          </div>
          <span className="text-white font-bold text-base">Yaqeen</span>
        </div>
        <button
          className="text-gray-300 focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open navigation"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>
      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-60 flex flex-col">
          <div className="bg-[#18191B] w-64 h-full p-6 flex flex-col">
            <button
              className="self-end mb-8 text-gray-400"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="flex flex-col gap-4">
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "VR Showcase", href: "#vr" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-[#00E6C0] text-lg py-2 px-4 rounded transition-colors scroll-smooth"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <a
                href="https://www.linkedin.com/in/yaqeen-wunzaligu-47a545239/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/yaqeen009"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
