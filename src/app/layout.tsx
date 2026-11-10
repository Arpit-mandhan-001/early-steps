import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EarlySteps Dayhome | Little steps. Big beginnings. | Whitehorn, Calgary",
  description:
    "A caring home away from home in Whitehorn, Calgary, Alberta. Safe, nurturing, play-based childcare for ages 1–5 led by Indu Bala, Level 3 Early Childhood Educator. First Aid certified, nutritious daily meals, bilingual English & Hindi care.",
  keywords: [
    "EarlySteps Dayhome",
    "Dayhome Calgary",
    "Whitehorn childcare Calgary",
    "Early Childhood Educator Calgary",
    "Home Daycare Calgary",
    "Play-based childcare Calgary",
    "Indu Bala Dayhome",
  ],
  authors: [{ name: "Indu Bala", url: "https://earlystepsdayhome.ca" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#1D2A20] font-sans selection:bg-[#CF7883]/20 selection:text-[#244730]">
        {children}
      </body>
    </html>
  );
}
