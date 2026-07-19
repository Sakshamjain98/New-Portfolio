/**
 * Centralized site copy.
 *
 * This file holds the repeating, list-shaped content rendered across the
 * portfolio — nav links, projects, capabilities, the stack, footer columns,
 * and so on. One-off strings (headlines, section intros, CTA labels) stay
 * inline in their components; only data with a repeating pattern lives here so
 * it's easy to edit, translate, or hand off in one place.
 *
 * Each export is consumed by the component named in its comment.
 */

// --- Site header ----------------------------------------------------------
// components/site-header.tsx — primary + mobile nav.
export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#process" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
] as const

// --- Practice strip -------------------------------------------------------
// components/practice-strip.tsx — the thin band of practice areas.
export const PRACTICE_AREAS = [
  { k: "01", v: "Enterprise SaaS" },
  { k: "02", v: "Full-stack applications" },
  { k: "03", v: "ERP & workflow systems" },
  { k: "04", v: "Modern product UI" },
  { k: "05", v: "Backend architecture" },
] as const

// --- Selected work --------------------------------------------------------
// components/selected-work.tsx — the project carousel.
export type Project = {
  index: string
  title: string
  description: string
  year: string
  status: string
  tags: readonly string[]
  href: string
  image: string
  imageAlt: string
}

export const PROJECTS: readonly Project[] = [
  {
    index: "01",
    title: "Pharmansh WMS",
    description:
      "Enterprise warehouse management system for pharmaceutical inventory, order processing, purchase workflows, GRN, replenishment, stock adjustment, and role-based operations handling 4,000+ orders per day.",
    year: "2025",
    status: "Production",
    tags: ["Warehouse Management", "Healthcare", "RBAC", "Inventory", "Cosmos DB"],
    href: "#",
    image: "/assets/projects/interior-design-platform.png",
    imageAlt:
      "Pharmansh warehouse management system dashboard showing inventory levels, order processing, and stock adjustment workflows.",
  },
  {
    index: "02",
    title: "ERP System",
    description:
      "ERP platform managing 1,700+ institutions and over 200,000 students, with modules for registration, examinations, inspections, finance, and reporting.",
    year: "2024",
    status: "Production",
    tags: ["ERP", "Education", "Automation", "Firebase", "Dashboard"],
    href: "#",
    image: "/assets/projects/headshot-generator.png",
    imageAlt:
      "ERP system dashboard showing institution registration, examination modules, and finance reporting.",
  },
  {
    index: "03",
    title: "Attendance Management System",
    description:
      "Employee attendance platform with automated timesheets, leave workflows, presence tracking, and reporting dashboards.",
    year: "2024",
    status: "Production",
    tags: ["HRMS", "Attendance", "Automation", "Analytics"],
    href: "#",
    image: "/assets/projects/automation-agent-systems.png",
    imageAlt:
      "Attendance management dashboard showing employee timesheets, leave workflows, and presence tracking.",
  },
  {
    index: "04",
    title: "Finance & Business Automation",
    description:
      "AI-assisted finance and workflow management systems streamlining business operations and decision-making across startups.",
    year: "2024",
    status: "Production",
    tags: ["Finance", "Automation", "AI", "Analytics"],
    href: "#",
    image: "/assets/projects/document-intelligence.png",
    imageAlt:
      "Finance automation dashboard showing workflow management and business analytics.",
  },
  {
    index: "05",
    title: "Portfolio / Internal Tools",
    description:
      "Internal tooling covering employee status tracking, registration flows, permissions systems, role-based access, and API architecture.",
    year: "2023",
    status: "Internal",
    tags: ["Employee Status", "Registration Flow", "Permissions", "RBAC", "API Architecture"],
    href: "#",
    image: "/assets/projects/data-labeling-platform.png",
    imageAlt:
      "Internal tools dashboard showing employee status, registration flow, and role-based permissions.",
  },
]

// --- Capabilities ---------------------------------------------------------
// components/capabilities.tsx — the three practice cards. Cards map to the
// icons in components/capability-icons.tsx by position.
export const CAPABILITIES = [
  {
    num: "— 01",
    title: "Product engineering",
    body: "Production-ready SaaS applications built with scalable architectures, secure APIs, and modern frontend systems optimized for real-world usage.",
    items: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Cosmos DB"],
  },
  {
    num: "— 02",
    title: "Enterprise systems",
    body: "ERP, warehouse management, attendance, HRMS, and workflow automation platforms designed for operational efficiency and long-term scalability.",
    items: [
      "Role Based Access",
      "Workflow Engine",
      "REST APIs",
      "Automation",
      "Reporting",
      "Permissions",
    ],
  },
  {
    num: "— 03",
    title: "Modern UI engineering",
    body: "Responsive, accessible, and maintainable interfaces built with modern component systems and scalable frontend architecture.",
    items: [
      "Tailwind",
      "Shadcn",
      "Radix",
      "TypeScript",
      "Figma",
      "Responsive Design",
    ],
  },
] as const

// --- Approach -------------------------------------------------------------
// components/approach.tsx — the four ordered process steps.
export const APPROACH_STEPS = [
  {
    k: "— Step 01",
    t: "Understand requirements",
    d: "Business requirements, workflows, edge cases, and user journeys — before any UI or schema gets touched.",
  },
  {
    k: "— Step 02",
    t: "Architect the solution",
    d: "Database design, APIs, permissions, scalability, and deployment planning, mapped out before a line of production code.",
  },
  {
    k: "— Step 03",
    t: "Build production systems",
    d: "Type-safe APIs, reusable frontend, optimized backend, and testing — built for real load, not a demo.",
  },
  {
    k: "— Step 04",
    t: "Optimize & ship",
    d: "Performance tuning, monitoring, documentation, deployment, and maintenance until it's genuinely production-ready.",
  },
] as const

// --- Stack ----------------------------------------------------------------
// components/stack.tsx — the editor-mockup panes. Each item is [name, tag].
export const STACK_PANES = [
  {
    title: "Frontend",
    items: [
      ["Next.js", "framework"],
      ["React", "ui"],
      ["TypeScript", "language"],
      ["Tailwind CSS", "styling"],
      ["Shadcn UI", "primitives"],
      ["Radix UI", "primitives"],
    ],
  },
  {
    title: "Backend",
    items: [
      ["Node.js", "runtime"],
      ["Express.js", "framework"],
      ["MongoDB", "database"],
      ["Azure Cosmos DB", "database"],
      ["Firebase", "backend"],
      ["Prisma", "orm"],
    ],
  },
  {
    title: "Dev tools",
    items: [
      ["Git", "vcs"],
      ["GitHub", "vcs"],
      ["Postman", "api"],
      ["VS Code", "editor"],
      ["Linux", "os"],
      ["Docker", "runtime"],
    ],
  },
  {
    title: "Deployment",
    items: [
      ["Azure", "cloud"],
      ["Vercel", "deploy"],
      ["DigitalOcean", "cloud"],
      ["Cloudflare", "edge"],
      ["Nginx", "server"],
    ],
  },
] as const

// --- About ----------------------------------------------------------------
// components/contact.tsx (About band) — the meta definition list. [key, value].
export const ABOUT_META = [
  ["Current role", "Associate Software Engineer · MetaUpSpace"],
  ["Education", "B.Tech CSE · KIET Group of Institutions"],
  ["CGPA", "8.7 / 10"],
  ["Experience", "2+ years"],
  ["Location", "India"],
  ["Availability", "Open to full-time opportunities"],
] as const

// --- Site footer ----------------------------------------------------------
// components/site-footer.tsx — link columns. Each link is [label, href].
export const FOOTER_COLUMNS = [
  {
    title: "Site",
    links: [
      ["Work", "#work"],
      ["Capabilities", "#capabilities"],
      ["Approach", "#process"],
      ["Stack", "#stack"],
      ["About", "#about"],
    ],
  },
  {
    title: "Contact",
    links: [
      ["sakshamjain.codes", "mailto:sakshamjaindevs@gmail.com"],
      ["Start a project", "#contact"],
    ],
  },
  {
    title: "Social",
    links: [["GitHub ↗", "https://github.com/Sakshamjain98"]],
  },
] as const

// --- Profile stats widget --------------------------------------------------
// components/widgets/profile-stats.tsx — hero snapshot card.
export type ProfileStat = {
  value: string
  label: string
}

export const PROFILE_STATS: readonly ProfileStat[] = [
  { value: "2+", label: "Years experience" },
  { value: "4+", label: "Production products" },
  { value: "200K+", label: "Users served" },
  { value: "4,000+", label: "Orders processed daily" },
  { value: "8.7", label: "CGPA · B.Tech CSE" },
]

export const PROFILE_STATS_ROLE = "Associate Software Engineer"
