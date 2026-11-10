import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CareHero from "@/components/our-care/CareHero";
import CareServices from "@/components/our-care/CareService";
import CareTrust from "@/components/our-care/CareTrust";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Care | EarlySteps Dayhome",
  description:
    "Warm, play-based home childcare in Whitehorn, Calgary for ages 1–5, with healthy meals, English and Hindi communication, creative activities, and outdoor play.",
};

export default function OurCarePage() {
  return (
    <main>
        <Navbar />
      <CareHero />
      <CareServices />
      <CareTrust />
      <Footer />
    </main>
  );
}