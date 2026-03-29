

import SectionWrapper from "../SectionWrapper";
import SectionHeader from "../SectionHeader";
const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React"},
      { name: "TypeScript"},
      { name: "Tailwind"},
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
    ],
  },
  {
    category: "Design",
    items: [
      { name: "Figma" },
      { name: "UX flows" },
    ],
  },
  {
    category: "VR/3D",
    items: [
      { name: "Unity", },
      { name: "Blender",},
    ],
  },
];


const SkillsSection = () => (
  <SectionWrapper id="skills">
    <SectionHeader title="Skills" />
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {skills.map((skill) => (
        <div key={skill.category} className="bg-[#232427] rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-white mb-3">{skill.category}</h3>
          <ul className="space-y-2">
            {skill.items.map((item) => (
              <li key={item.name} className="flex items-center gap-2 text-[#00E6C0] font-mono text-sm">
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default SkillsSection;
