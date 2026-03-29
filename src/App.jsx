

import Sidebar from "./components/sidebar/Sidebar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import VRShowcaseSection from "./components/sections/VRShowcaseSection";
import ContactSection from "./components/sections/ContactSection";

function App() {
  return (
    <div className="min-h-screen bg-[#18191B] text-white flex">
      <Sidebar />
      <main className="flex-1 pt-[64px] md:pt-0 md:pl-24 transition-all duration-300">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <VRShowcaseSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
