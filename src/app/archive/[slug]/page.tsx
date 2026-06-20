import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAdjacentProjects, projects } from "@/data/projects";
import { MissionDossierPage } from "@/features/archive/MissionDossierPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Mission Not Found" };
  return {
    title: project.codename,
    description: project.objective,
  };
}

export default async function MissionDetail({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const adjacent = getAdjacentProjects(slug);
  return <MissionDossierPage project={project} adjacent={adjacent} />;
}
