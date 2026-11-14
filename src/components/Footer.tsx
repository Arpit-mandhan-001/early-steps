"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { InstagramIcon } from "./ui/Icons";
import { BUSINESS_INFO, NAV_LINKS } from "@/data/dayhomeData";
import Image from "next/image";
import { FaFacebook, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#1A3423] text-white pt-16 pb-12 border-t border-[#244730]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Branding & Philosophy */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className=" rounded-2xl bg-[#244730] border border-white/20 text-white flex items-center justify-center font-nunito font-extrabold text-xl shadow-xs group-hover:bg-[#CF7883] transition-colors">
                <Image
                  src="/logo.png"
                  alt="EarlySteps Dayhome Logo"
                  width={300}
                  height={120}
                  className="h-20 w-20"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-nunito font-extrabold text-2xl text-white tracking-tight leading-tight">
                  EarlySteps Dayhome
                </span>
                <span className="font-sans text-xs text-[#EAA8B0] font-semibold tracking-wider uppercase">
                  Whitehorn • Calgary, Alberta
                </span>
              </div>
            </Link>

            <p className="font-nunito font-bold text-lg text-[#EAA8B0] mb-2 italic">
              &ldquo;{BUSINESS_INFO.tagline}&rdquo;
            </p>

            <p className="font-sans text-sm text-white/80 leading-relaxed max-w-md mb-6">
              {BUSINESS_INFO.mainMessage}
            </p>

            
            <li className="flex gap-5">
                <a
                  href={BUSINESS_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#EAA8B0] transition-colors"
                >
                  <InstagramIcon className="w-7 h-7 text-[#CF7883] shrink-0" />
                  {/* <span>{BUSINESS_INFO.contact.instagramHandle}</span> */}
                </a>

                <a
                  href={BUSINESS_INFO.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#EAA8B0] transition-colors"
                >
                  <FaFacebook className="w-7 h-7 text-[#CF7883] shrink-0" />
                  {/* <span>{BUSINESS_INFO.contact.facebookHandle}</span> */}
                </a>

                <a
                  href={BUSINESS_INFO.contact.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#EAA8B0] transition-colors"
                >
                  <FaTiktok className="w-7 h-7 text-[#CF7883] shrink-0" />
                  {/* <span>{BUSINESS_INFO.contact.tiktokHandle}</span> */}
                </a>
              </li>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="font-nunito font-extrabold text-base text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-white/75">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:underline transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Community */}
          <div className="lg:col-span-4">
            <h4 className="font-nunito font-extrabold text-base text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#CF7883]" />
              Get In Touch
            </h4>

            <ul className="space-y-3 text-sm font-sans text-white/80">
              <li>
                <a
                  href={BUSINESS_INFO.contact.phoneTel}
                  className="flex items-center gap-2.5 hover:text-[#EAA8B0] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#CF7883] shrink-0" />
                  <span>{BUSINESS_INFO.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.contact.emailMailto}
                  className="flex items-center gap-2.5 hover:text-[#EAA8B0] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#CF7883] shrink-0" />
                  <span className="truncate">
                    {BUSINESS_INFO.contact.email}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#CF7883] shrink-0" />
                <span>{BUSINESS_INFO.location.fullAddress}</span>
              </li>
              
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-white/60">
                Childcare age group: 1–5 years. Welcoming enrollment in
                Whitehorn, Calgary.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2026 EarlySteps Dayhome. All rights reserved.</p>
          <div className="flex items-center gap-1 text-white/70">
            <span>Providing caring home childcare with</span>
            <Heart className="w-3.5 h-3.5 text-[#CF7883] fill-[#CF7883]" />
            <span>in Calgary, Alberta</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
