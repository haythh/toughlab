import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toughlab.ai"),
  title: "ToughLab — The TOUGH Suite",
  description:
    "Useful tools for automotive industry brands and retailers. ToughRides, ToughMAP, ToughAssets, ToughLocator.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ToughLab — The TOUGH Suite",
    description:
      "Useful tools for automotive industry brands and retailers. ToughRides, ToughMAP, ToughAssets, ToughLocator.",
    type: "website",
    url: "https://toughlab.ai/",
    siteName: "TOUGH",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToughLab — The TOUGH Suite",
    description:
      "Useful tools for automotive industry brands and retailers. ToughRides, ToughMAP, ToughAssets, ToughLocator.",
  },
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
