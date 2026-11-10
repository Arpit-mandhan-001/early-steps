"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Calendar,
  User,
  Baby,
} from "lucide-react";
import { InstagramIcon } from "./ui/Icons";
import { BUSINESS_INFO } from "@/data/dayhomeData";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    parentName: "",
    childAge: "",
    phone: "",
    email: "",
    preferredStartDate: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate inquiry submission with email fallback
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Connect With Us"
          badgeVariant="forest"
          title="We'd Love to Welcome Your Family"
          highlightedWord="Welcome Your Family"
          subtitle="Have questions about enrollment availability, daily routines, fees, or scheduling a visit? Reach out directly to Us."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Contact Channels & Dayhome Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-nunito font-extrabold text-2xl text-[#244730] mb-2">
                Get in Touch
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#1D2A20]/80 leading-relaxed mb-6">
                Whether you are planning ahead for next month or need an immediate opening for your toddler or preschooler (ages 1–5), we are here to help.
              </p>

              {/* Direct Action Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={BUSINESS_INFO.contact.phoneTel}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF9F6] border border-[#F0E8E1] hover:border-[#244730] hover:shadow-xs transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#244730] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-[#CF7883]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1D2A20]/60 uppercase tracking-wider">
                      Phone Call / Text
                    </div>
                    <div className="text-base sm:text-lg font-nunito font-extrabold text-[#244730]">
                      {BUSINESS_INFO.contact.phoneDisplay}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={BUSINESS_INFO.contact.emailMailto}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF9F6] border border-[#F0E8E1] hover:border-[#CF7883] hover:shadow-xs transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#CF7883] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-[#1D2A20]/60 uppercase tracking-wider">
                      Email Address
                    </div>
                    <div className="text-sm sm:text-base font-nunito font-extrabold text-[#244730] truncate">
                      {BUSINESS_INFO.contact.email}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF9F6] border border-[#F0E8E1]">
                  <div className="w-12 h-12 rounded-xl bg-[#244730]/10 text-[#244730] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1D2A20]/60 uppercase tracking-wider">
                      Location
                    </div>
                    <div className="text-sm sm:text-base font-nunito font-extrabold text-[#244730]">
                      {BUSINESS_INFO.location.fullAddress}
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <a
                  href={BUSINESS_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF9F6] border border-[#F0E8E1] hover:border-[#CF7883] hover:shadow-xs transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-amber-500 via-[#CF7883] to-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1D2A20]/60 uppercase tracking-wider">
                      Follow Us On Instagram
                    </div>
                    <div className="text-sm sm:text-base font-nunito font-extrabold text-[#244730]">
                      {BUSINESS_INFO.contact.instagramHandle}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enrollment & Tour Inquiry Form */}
          <div className="lg:col-span-7">
            <Card
              variant="pastel"
              className="p-6 sm:p-10 border border-[#F0E8E1] shadow-lg"
              hoverEffect={false}
            >
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#244730] text-white flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-[#CF7883]" />
                  </div>
                  <h4 className="font-nunito font-extrabold text-2xl text-[#244730] mb-2">
                    Thank You for Your Inquiry!
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-[#1D2A20]/80 max-w-md mx-auto mb-6">
                    We've has received your message regarding EarlySteps Dayhome. We will be in touch with you shortly to discuss availability, hours, and schedule your tour.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        parentName: "",
                        childAge: "",
                        phone: "",
                        email: "",
                        preferredStartDate: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-bold font-nunito bg-[#244730] text-white hover:bg-[#1A3423] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-2">
                    <h4 className="font-nunito font-extrabold text-2xl text-[#244730]">
                      Send an Enrollment Enquiry
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1D2A20]/75">
                      Fill out this quick form or reach out directly by phone.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Parent Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#244730] mb-1 uppercase tracking-wide">
                        Parent / Guardian Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) =>
                            setFormData({ ...formData, parentName: e.target.value })
                          }
                          placeholder="Your full name"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F0E8E1] text-sm text-[#1D2A20] focus:outline-hidden focus:border-[#244730] focus:ring-1 focus:ring-[#244730]"
                        />
                      </div>
                    </div>

                    {/* Child Age */}
                    <div>
                      <label className="block text-xs font-bold text-[#244730] mb-1 uppercase tracking-wide">
                        Child&apos;s Age (Ages 1–5) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.childAge}
                        onChange={(e) =>
                          setFormData({ ...formData, childAge: e.target.value })
                        }
                        placeholder="e.g. 2 years old"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F0E8E1] text-sm text-[#1D2A20] focus:outline-hidden focus:border-[#244730] focus:ring-1 focus:ring-[#244730]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-[#244730] mb-1 uppercase tracking-wide">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. 403-123-4567"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F0E8E1] text-sm text-[#1D2A20] focus:outline-hidden focus:border-[#244730] focus:ring-1 focus:ring-[#244730]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-[#244730] mb-1 uppercase tracking-wide">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F0E8E1] text-sm text-[#1D2A20] focus:outline-hidden focus:border-[#244730] focus:ring-1 focus:ring-[#244730]"
                      />
                    </div>
                  </div>

                  {/* Preferred Start Date */}
                  <div>
                    <label className="block text-xs font-bold text-[#244730] mb-1 uppercase tracking-wide">
                      Desired Start Date / Timeline
                    </label>
                    <input
                      type="text"
                      value={formData.preferredStartDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredStartDate: e.target.value,
                        })
                      }
                      placeholder="e.g. Immediate, Next Month, or Fall 2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F0E8E1] text-sm text-[#1D2A20] focus:outline-hidden focus:border-[#244730] focus:ring-1 focus:ring-[#244730]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#244730] mb-1 uppercase tracking-wide">
                      Questions or Notes for Us
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us a little bit about your child, daily schedule preferences, or if you'd like to book an in-person tour..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F0E8E1] text-sm text-[#1D2A20] focus:outline-hidden focus:border-[#244730] focus:ring-1 focus:ring-[#244730]"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="rose"
                    size="md"
                    className="w-full justify-center"
                    icon={<Send className="w-4 h-4" />}
                  >
                    Submit Enrollment Enquiry
                  </Button>

                  <p className="text-center text-[11px] text-[#1D2A20]/60 mt-2">
                    We respect your privacy. Your details are strictly used to respond to your childcare enquiry.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
