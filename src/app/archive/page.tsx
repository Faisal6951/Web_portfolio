import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ArchiveListPage } from "@/features/archive/ArchiveListPage";

export const metadata: Metadata = {
  title: "Mission Archive",
  description: "Classified mission archive — all operations, deployments, and system constructions. Access restricted.",
};

export default function Archive() {
  return <ArchiveListPage projects={projects} />;
}
