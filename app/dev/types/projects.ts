// types/projects.ts
export type CardProject = {
  title: string;
  url?: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  preview?: string;
  screenshots: string[];
};
