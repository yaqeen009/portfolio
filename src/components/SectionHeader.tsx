import React from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = "" }) => (
  <div className={`mb-10 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
    {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
  </div>
);

export default SectionHeader;
