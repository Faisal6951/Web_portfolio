export interface Skill {
  id: string;
  name: string;
  arcaneTitle: string;
  description: string;
  classification: string;
  power: number;
  category: "SUMMONING" | "PORTAL" | "PROTOCOL" | "ARCHIVE" | "CONJURATION" | "SIGIL";
  capabilities: string[];
  rune: string;
  clearanceLevel: "OPERATIVE" | "AGENT" | "SPECIALIST" | "MASTER" | "GRANDMASTER";
}
