import React from "react";

const base = "inline-flex items-center justify-center font-roboto font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00E6C0] disabled:opacity-50 disabled:pointer-events-none";
const variants = {
  default: "bg-[#00E6C0] text-black hover:bg-[#00bfa3] border border-[#00E6C0]",
  outline: "bg-transparent text-[#00E6C0] border border-[#00E6C0] hover:bg-[#00E6C0] hover:text-black",
  secondary: "bg-[#232427] text-[#00E6C0] border border-[#232427] hover:bg-[#18191B] hover:text-white",
};
const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-5 py-2.5",
  lg: "text-lg px-7 py-3",
};

export const Button = React.forwardRef(function Button({
  children,
  variant = "default",
  size = "md",
  asChild = false,
  className = "",
  ...props
}, ref) {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      ref={ref}
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
});
