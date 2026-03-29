import React, { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";

type ProjectCardProps = {
  title: string;
  stack: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
};


const ProjectCard: React.FC<ProjectCardProps> = ({ title, stack, description, liveUrl, githubUrl }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleLiveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div
      ref={ref}
      className={`bg-[#232427] rounded-2xl p-6 flex flex-col shadow hover:shadow-lg transition-shadow min-h-[280px] gap-4
        transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ willChange: 'opacity, transform' }}
    >
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {stack.map((tech) => (
          <span key={tech} className="bg-[#18191B] text-[#00E6C0] text-xs px-2 py-1 rounded font-mono">
            {tech}
          </span>
        ))}
      </div>
      <p className="text-gray-300 flex-1 text-sm mb-2">{description}</p>
      <div className="flex gap-3 mt-auto">
        <Button variant="outline" size="sm" onClick={handleLiveClick}>
          Live
        </Button>
        {githubUrl && (
          <Button asChild variant="secondary" size="sm">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
          </Button>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#232427] rounded-xl p-6 shadow-lg flex flex-col items-center gap-4 max-w-xs w-full">
            <span className="text-lg text-white font-semibold text-center">Live demos are yet to be added.</span>
            <Button onClick={() => setShowPopup(false)} variant="default" size="sm" className="w-full">OK</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
