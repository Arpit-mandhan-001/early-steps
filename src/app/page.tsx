import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OurCareSection from "@/components/OurCareSection";
import OurSpaceSection from "@/components/OurSpaceSection";
import EnrollmentSection from "@/components/EnrollmentSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Scroll indicator & top progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        {/* <AboutSection /> */}
        <OurCareSection />
        <OurSpaceSection />
        <EnrollmentSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
