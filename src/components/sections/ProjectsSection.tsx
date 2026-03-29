import SectionWrapper from "../SectionWrapper";
import SectionHeader from "../SectionHeader";
import ProjectCard from "../ProjectCard";

const projects = [
  {
    title: "E-commerce App",
    stack: ["React", "TypeScript", "Node.js"],
    description: "A scalable online store platform with real-time inventory and secure checkout.",
    liveUrl: "#",
    githubUrl: "https://github.com/yaqeen009/Ecommerce-FrontEnd.git",
  },
  {
    title: "VR Campus Project",
    stack: ["Unity", "Blender", "WebXR"],
    description: "A virtual reality campus experience for immersive learning and collaboration.",
    liveUrl: "#",
    githubUrl: "https://drive.google.com/drive/folders/1UJDZ2PqX6eO5ZqWFglN-5kKSpjOJmuqb?usp=drive_link",
  },
  {
    title: "Spotify Clone",
    stack: ["React", "Node.js", "MongoDB"],
    description: "A music streaming platform inspired by Spotify, with playlists and real-time playback.",
    liveUrl: "#",
    githubUrl: "https://github.com/yaqeen009/Spotify-Clone.git",
  },
];

const ProjectsSection = () => (
  <SectionWrapper id="projects">
    <SectionHeader title="Projects" />
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </SectionWrapper>
);

export default ProjectsSection;
