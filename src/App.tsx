import RailNav from "./components/RailNav";
import Hero from "./components/sections/Hero";
import SelectedWork from "./components/sections/SelectedWork";
import ImmersiveSystems from "./components/sections/ImmersiveSystems";
import Capabilities from "./components/sections/Capabilities";
import Background from "./components/sections/Background";
import ResearchInterests from "./components/sections/ResearchInterests";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <RailNav />

      <main id="main" className="md:pl-rail lg:pl-56">
        <Hero />
        <SelectedWork />
        <ImmersiveSystems />
        <Capabilities />
        <Background />
        <ResearchInterests />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
