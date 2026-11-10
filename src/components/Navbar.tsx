"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MapPin, Menu, X, Sparkles, Heart } from "lucide-react";
import { BUSINESS_INFO, NAV_LINKS } from "@/data/dayhomeData";
import Button from "./ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top micro-bar for parent confidence */}
      {/* <div className="bg-[#244730] text-white text-xs sm:text-sm py-2 px-4 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-white/90">
              <MapPin className="w-3.5 h-3.5 text-[#CF7883]" />
              <span>{BUSINESS_INFO.location.neighborhood}, Calgary, AB</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-[#CF7883]" />
              <span>Now Welcoming Ages {BUSINESS_INFO.ageGroup}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={BUSINESS_INFO.contact.phoneTel}
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#EAA8B0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#CF7883]" />
              <span>{BUSINESS_INFO.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div> */}

      {/* Main navigation bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md py-3.5 "
            : "bg-white/90 backdrop-blur-xs py-4 md:py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Branding */}
          <Link
            href="#home"
            className="group flex items-center gap-3 transition-transform active:scale-98"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#244730] text-white flex items-center justify-center font-nunito font-extrabold text-xl shadow-xs group-hover:bg-[#1A3423] transition-colors">
              <span className="text-[#CF7883] mr-0.5">E</span>S
            </div>
            <div className="flex flex-col">
              <span className="font-nunito font-extrabold text-xl sm:text-2xl text-[#244730] tracking-tight leading-tight group-hover:text-[#1A3423] transition-colors">
                Early Steps
              </span>
              <span className="font-sans text-xs text-[#CF7883] font-semibold tracking-wider uppercase">
                Dayhome • Whitehorn
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 text-base font-semibold text-[#1D2A20] hover:text-[#B65D69] rounded-full transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-[#CF7883] after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href="/contact-us"
              variant="rose"
              size="sm"
              icon={<Heart className="w-4 h-4 fill-white/30" />}
              iconPosition="left"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={BUSINESS_INFO.contact.phoneTel}
              className="p-2 text-[#244730] hover:text-[#1A3423] rounded-full bg-[#244730]/5"
              aria-label="Call Dayhome"
            >
              <Phone className="w-5 h-5 text-[#244730]" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-[#244730] hover:bg-[#244730]/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] border-b border-[#F0E8E1] bg-white shadow-xl" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl font-nunito font-bold text-base text-[#1D2A20] hover:bg-[#FDF9F6] hover:text-[#244730] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-[#F0E8E1] flex flex-col gap-3">
              <Button
                href="#enrollment"
                variant="rose"
                size="md"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enquire About Enrollment
              </Button>
              <a
                href={BUSINESS_INFO.contact.phoneTel}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#244730] py-2"
              >
                <Phone className="w-4 h-4 text-[#CF7883]" />
                <span>Call {BUSINESS_INFO.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

