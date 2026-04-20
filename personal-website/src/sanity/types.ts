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
