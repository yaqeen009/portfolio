import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function HeroSection() {
  const [headline, setHeadline] = useState(false);
  const [desc, setDesc] = useState(false);
  const [ctas, setCtas] = useState(false);
  const [showDecor, setShowDecor] = useState(false);
  useEffect(() => {
    setTimeout(() => setHeadline(true), 100);
    setTimeout(() => setDesc(true), 400);
    setTimeout(() => setCtas(true), 700);
    setTimeout(() => setShowDecor(true), 1100);
  }, []);
  return (
    <section
      className="flex flex-col justify-center min-h-[80vh] md:h-screen md:pl-40 px-4 md:px-0 relative"
      id="hero"
    >
      <div className="max-w-2xl mt-20 md:mt-32 mb-8 md:mb-0">
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight transition-all duration-700 ease-in-out ${headline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "opacity, transform" }}
        >
          Hi, I’m{" "}
          <span className="inline-block relative">
            <span className="text-white relative">
              {" "}
              <span className="text-[#FF4B5C] relative left-1 top-1">Y</span>
              <span className="text-[#00E6C0] absolute left-2 top-2">Y</span>
              aqeen
            </span>
          </span>
          ,<br />
          building web and immersive digital experiences.
        </h1>
        <p
          className={`text-gray-400 mt-6 text-base sm:text-lg max-w-xl transition-all duration-700 ease-in-out ${desc ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "opacity, transform" }}
        >
          Full-Stack & Immersive Experience Developer. Building scalable web
          apps and interactive VR experiences.
          <br />
          <span className="block mt-2 text-sm text-[#00E6C0] font-mono">
            React · TypeScript · Node.js · MongoDB · Unity · Blender
          </span>
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 mt-10 transition-all duration-700 ease-in-out ${ctas ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "opacity, transform" }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#projects">View Projects</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
      {/* Angle line and badges */}
      <div
        className={`hidden md:flex absolute right-8 lg:right-32 top-1/4 flex-col items-center transition-all duration-700 ease-in-out ${showDecor ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ willChange: "opacity, transform" }}
      >
        <div className="w-1 h-80 bg-gradient-to-b from-pink-500 to-pink-300 rotate-[-70deg] origin-top"></div>
      </div>
      {/* Sound Button */}
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <span className="bg-[#18191B] text-pink-400 px-3 py-1 rounded font-bold text-xs">
          Sound <span className="text-white">OFF</span>
        </span>
      </div>
    </section>
  );
}
