import type { Metadata } from "next";
import { TransmissionPage } from "@/features/transmission/TransmissionPage";

export const metadata: Metadata = {
  title: "Transmission",
  description: "Secure encrypted communication channel. Deploy your mission briefing — response within 24 hours.",
};

export default function Transmission() {
  return <TransmissionPage />;
}
