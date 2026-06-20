import type { Metadata } from "next";
import { skills } from "@/data/skills";
import { ArsenalPage } from "@/features/arsenal/ArsenalPage";

export const metadata: Metadata = {
  title: "Arsenal",
  description: "The Arcane Arsenal — classified capabilities, magical artifacts, and forbidden techniques.",
};

export default function Arsenal() {
  return <ArsenalPage skills={skills} />;
}
