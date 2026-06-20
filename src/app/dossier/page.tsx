import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { DossierPage } from "@/features/dossier/DossierPage";

export const metadata: Metadata = {
  title: "Dossier",
  description: "Classified operative file — Faisal Khan. Mission profile, biographical data, and operational history.",
};

export default function Dossier() {
  return <DossierPage personal={personal} />;
}
