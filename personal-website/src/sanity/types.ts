export interface Project {
  _id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  live: string | null;
  date: string;
  featured: boolean;
  featuredGithub?: string | null;
  workingOn: boolean;
  sortOrder: number;
}

export interface Experience {
  _id: string;
  role: string;
  org: string;
  dateRange: string;
  bullets: string[];
  sortOrder: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Service {
  title: string;
  description: string;
}

export interface SiteSettings {
  logoLead: string;
  logoTail: string;
  homeNav: NavLink[];
  projectsNav: NavLink[];
  email: string;
  phone: string;
  socials: SocialLink[];
  resumeUrl: string | null;
  resumeLabel: string;
  footerLines: string[];
}

export interface HeroContent {
  eyebrow: string;
  firstName: string;
  lastName: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  headshotUrl: string | null;
  headshotAlt: string;
  decoLetter: string;
}

export interface AboutContent {
  label: string;
  heading: string;
  paragraphs: string[];
  stats: Stat[];
}

export interface ProjectsSectionContent {
  label: string;
  ctaLabel: string;
}

export interface SkillsContent {
  label: string;
  heading: string;
  intro: string;
  categories: SkillCategory[];
}

export interface EducationContent {
  label: string;
  degree: string;
  school: string;
  graduation: string;
  coursework: string;
  clusters: string;
  gpa: string;
}

export interface HireContent {
  label: string;
  headingLead: string;
  headingEm: string;
  intro: string;
  quoteCtaLabel: string;
  servicesCtaLabel: string;
  servicesUrl: string;
  services: Service[];
}

export interface ContactContent {
  label: string;
  headingLead: string;
  headingEm: string;
  intro: string;
}

export interface HomePage {
  hero: HeroContent;
  about: AboutContent;
  experienceLabel: string;
  projects: ProjectsSectionContent;
  workingOnLabel: string;
  skills: SkillsContent;
  education: EducationContent;
  hire: HireContent;
  contact: ContactContent;
}

export interface ProjectsPageContent {
  eyebrow: string;
  titleLead: string;
  titleEm: string;
  subtitle: string;
}
