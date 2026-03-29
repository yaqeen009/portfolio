import SectionWrapper from "../SectionWrapper";
import SectionHeader from "../SectionHeader";

const VRShowcaseSection = () => (
  <SectionWrapper id="vr" className="bg-gradient-to-r from-[#18191B] to-[#232427] rounded-2xl">
    <SectionHeader title="VR Showcase" />
    <div className="flex flex-col gap-8 md:flex-row md:items-center">
      <div className="flex-1 w-full aspect-video bg-[#18191B] rounded-xl flex items-center justify-center border border-[#232427] overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/gJNC8mtrAKo"
          title="VR Showcase Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-white mb-2">Immersive VR Development</h3>
        <p className="text-gray-300 text-lg mb-4">
          I create interactive VR experiences using Unity and Blender, bringing digital worlds to life for education, training, and entertainment. My work blends 3D design, real-time rendering, and web technologies for seamless, immersive results.
        </p>
      </div>
    </div>
  </SectionWrapper>
);

export default VRShowcaseSection;
