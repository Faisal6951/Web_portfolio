export interface Project {
  id: string;
  slug: string;
  missionId: string;
  codename: string;
  name: string;
  objective: string;
  description: string;
  status: "COMPLETED" | "ACTIVE" | "CLASSIFIED" | "COMPROMISED";
  difficulty: "LOW" | "MODERATE" | "HIGH" | "EXTREME" | "CLASSIFIED";
  threatLevel: number;
  tech: string[];
  features: string[];
  results: string[];
  lessons: string[];
  architecture: string;
  liveUrl?: string;
  repoUrl?: string;
  year: number;
  duration: string;
  category: string;
}
