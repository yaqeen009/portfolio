import React from "react";

type SectionWrapperProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, className = "", children }) => (
  <section id={id} className={`max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 ${className}`}>
    {children}
  </section>
);

export default SectionWrapper;
