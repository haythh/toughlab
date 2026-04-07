import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToughLab — The TOUGH Suite",
  description:
    "ToughLab.ai showcases the TOUGH suite of enterprise tools for the automotive aftermarket, including renders, MAP monitoring, asset management, and dealer distribution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
