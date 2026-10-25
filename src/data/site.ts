/**
 * Single source of truth for site content.
 *
 * Rules followed here:
 * - Only facts that are verifiable from the public GitHub profile, the
 *   repository contents, or content the site owner supplied are included.
 * - Unverifiable detail (metrics, user counts, employment claims, stack
 *   guesses) is omitted rather than invented.
 *
 * Every entry carries `verified: true` only when a public link or asset was
 * checked during the redesign.
 */

export interface Link {
  label: string;
  href: string;
  /** true when the destination was confirmed to resolve during the redesign */
  verified: boolean;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  /** One line: what it is. */
  summary: string;
  /** The problem or purpose it addresses. */
  purpose: string;
  /** What the site owner specifically worked on. */
  contribution: string;
  /** Only technologies evidenced by the repository or stated by the owner. */
  stack: string[];
  status: string;
  /** Honest caveat shown to the reader rather than hidden. */
  note?: string;
  links: Link[];
  /** Composition used in the selected-work section. */
  layout: "feature" | "wide" | "compact";
}

export const site = {
  name: "Yaqeen Wunzalgu",
  role: "Software engineer",
  location: "Ghana",
  headline: "I build web products and spatial interfaces.",
  supporting:
    "Computer Science graduate with a Mathematical Sciences background and an academic specialisation in Computer Science with Statistics. I build full-stack products with React, TypeScript and Node, and work on the side of interactive technology where software meets space: XR, HCI and immersive data visualisation.",
  email: "yaqeenwunzaligu@gmail.com",
  links: {
    github: {
      label: "GitHub",
      href: "https://github.com/yaqeen009",
      verified: true,
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yaqeen-wunzaligu-47a545239/",
      verified: true,
    },
    email: {
      label: "Email",
      href: "mailto:yaqeenwunzaligu@gmail.com",
      verified: true,
    },
  } satisfies Record<string, Link>,
} as const;

export const navItems = [
  { id: "work", index: "01", label: "Selected work" },
  { id: "immersive", index: "02", label: "Immersive systems" },
  { id: "capabilities", index: "03", label: "Capabilities" },
  { id: "background", index: "04", label: "Background" },
  { id: "research", index: "05", label: "Research interests" },
  { id: "contact", index: "06", label: "Contact" },
] as const;

export const projects: Project[] = [
  {
    id: "bondit",
    index: "01",
    name: "Bondit",
    summary: "An Insurance marketplace for Insurance brokers and underwriters.",
    purpose:
      "Quoting and underwriting insurance cover involves several dependent steps ; capturing risk details, pricing, and producing a decision the underwriter can act on. Bondit exists to make that chain faster and easier to follow than a manual, document-driven process.",
    contribution:
      "Front-end and full-stack work on the quotation and underwriting flows.",
    stack: ["React", "TypeScript", "Node.js", "Postgres", "Tailwind CSS"],
    status: "Private project",
    note: "The repository is private and no customer data can be shown. Details on this page are limited to what can be shared publicly.",
    links: [],
    layout: "feature",
  },
  {
    id: "vr-campus",
    index: "02",
    name: "Immersive Campus Navigation",
    summary:
      "A virtual reality reconstruction of the Physics and Chemistry departments at the University of Ghana.",
    purpose:
      "Navigating an unfamiliar, buildings-heavy campus is slow and disorienting from a two-dimensional map. This project rebuilds the departments as a walkable three-dimensional environment so a visitor can understand the layout spatially before setting foot on campus.",
    contribution:
      "Modelled the environment in Blender, assembled and scripted the experience in Unity with C#, and produced the VR walkthrough demonstration.",
    stack: ["Unity", "Blender", "C#", "XR tooling", "Meta Quest"],
    status: "Completed academic project with demonstration build",
    note: "The published repository contains project metadata only, so the demonstration video is the primary evidence of the work.",
    links: [
      {
        label: "Watch the walkthrough",
        href: "https://www.youtube.com/watch?v=gJNC8mtrAKo",
        verified: true,
      },
      {
        label: "Repository",
        href: "https://github.com/yaqeen009/VR-Campus-Model",
        verified: true,
      },
    ],
    layout: "wide",
  },
  {
    id: "data-space",
    index: "03",
    name: "DataSpace",
    summary:
      "A platform for exploring and visualizing data in a 3D environment.",
    purpose:
      "UbiquitousGuide is an interactive data exploration platform that transforms complex datasets into immersive, connected visual experiences. Featuring 3D visualizations, interactive charts, and linked data views, it helps users uncover patterns, explore relationships, and understand multidimensional data more intuitively.",
    contribution:
      "Designed and built the application end to end in TypeScript and React.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Three.js","Zustand"],
    status: "Live",
    links: [
      {
        label: "Open the app",
        href: "https://uguide-data-space.vercel.app",
        verified: true,
      },
      {
        label: "Source",
        href: "https://github.com/yaqeen009/ubiquitous-guide``",
        verified: true,
      },
    ],
    layout: "compact",
  },
  {
    id: "spend-scope",
    index: "04",
    name: "SpendScope",
    summary: "A privacy-first personal finance analytics tool.",
    purpose:
      "Import a CSV from your bank, categorise your spending, set budgets, and explore your trends over time. All data is stored in your browser and never sent to a server, so you can use the tool without worrying about your financial data being exposed.",
    contribution:
      "Built the front end in React and TypeScript, and the backend in TypeScript with Express.",
    stack: [
      "React",
      "TypeScript",
      "Express",
      "Postgres",
      "Neon",
      "Tailwind CSS",
      "Prisma",
    ],
    status: "Live",
    links: [
      {
        label: "Open the app",
        href: "https://my-spend-scope.vercel.app",
        verified: true,
      },
      {
        label: "Source",
        href: "https://github.com/yaqeen009/SpendScope",
        verified: true,
      },
    ],
    layout: "compact",
  },
  {
    id: "json-buddy",
    index: "05",
    name: "JSON Buddy",
    summary:
      "A JSON formatter, validator and tree viewer that runs entirely in the browser.",
    purpose:
      "Inspect and repair JSON without sending anything to a server. Everything is parsed locally, which matters when the payload is not something you want to paste into a third-party service.",
    contribution:
      "Designed and built the application end to end in TypeScript and React.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    status: "Live",
    links: [
      {
        label: "Open the app",
        href: "https://json-buddy-five.vercel.app",
        verified: true,
      },
      {
        label: "Source",
        href: "https://github.com/yaqeen009/json-buddy",
        verified: true,
      },
    ],
    layout: "compact",
  },
];

export const archive: Link[] = [
  {
    label: "Spotify client — TypeScript, Clerk, Express, MongoDB",
    href: "https://github.com/yaqeen009/Spotify-Clone",
    verified: true,
  },
  {
    label: "E-commerce front end — React, Redux, Vite, Tailwind",
    href: "https://github.com/yaqeen009/Ecommerce-FrontEnd",
    verified: true,
  },
  {
    label: "HCI semester project — React, Tailwind",
    href: "https://github.com/yaqeen009/DCIT302-Semester-Project",
    verified: true,
  },
  {
    label: "Node CLI file manager — JavaScript",
    href: "https://github.com/yaqeen009/node-cli-file-manager",
    verified: true,
  },
];

export const capabilities = [
  {
    index: "01",
    area: "Front end",
    detail:
      "Interface work in React with TypeScript, styled with Tailwind CSS and built with Vite. Redux for state where a product needs it.",
  },
  {
    index: "02",
    area: "Back end & data",
    detail:
      "Node.js and Express services, MongoDB and Supabase for persistence, Python for scripting and analysis work.",
  },
  {
    index: "03",
    area: "Immersive & 3D",
    detail:
      "Unity and C# for interactive scenes, Blender for modelling, and XR tooling for headset targeting.",
  },
  {
    index: "04",
    area: "Systems & tooling",
    detail:
      "Git and GitHub flow, Vercel deployment, ESLint and modern build tooling. Language depth outside the web stack includes Java, C# and LLVM.",
  },
  {
    index: "05",
    area: "Design & HCI",
    detail:
      "Figma for interface design, and structured human–computer interaction coursework covering evaluation and interaction patterns.",
  },
];

export const researchInterests = [
  {
    index: "01",
    title: "Immersive analytics",
    body: "Spatial and embodied representations of data: letting someone stand inside a dataset and move through it rather than read it off a flat chart.",
  },
  {
    index: "02",
    title: "Spatial computing interfaces",
    body: "How interaction models change when screens stop being the only surface — depth, gaze, gesture and presence as interface primitives.",
  },
  {
    index: "03",
    title: "Human–computer interaction",
    body: "Evaluation of interactive systems with real people: what makes an interface learnable, and how to measure whether it actually is.",
  },
  {
    index: "04",
    title: "Visualisation for statistics",
    body: "Making statistical structure legible to non-specialists, including where the representation risks distorting the data it shows.",
  },
];

export const education = [
  {
    period: "Undergraduate",
    title: "Computer Science with Statistics",
    org: "Mathematical Sciences background",
    detail:
      "Computer Science degree with an academic specialisation in Statistics. Coursework covered programming, data structures, compilers and human–computer interaction.",
  },
];
