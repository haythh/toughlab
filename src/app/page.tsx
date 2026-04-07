"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AppItem = {
  id: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  stats: string[];
  features: string[];
  layout: "left" | "right";
  visualLabel: string;
};

const apps: AppItem[] = [
  {
    id: "toughrides",
    name: "TOUGHRIDES",
    url: "https://toughrides.ai",
    tagline: "Epic Vehicle Renders in Seconds",
    description:
      "Upload your wheel lineup. Generate photorealistic 4K renders across any vehicle, any environment without prompt engineering. Built for brands, dealerships, and retailers.",
    stats: ["100+ Vehicles", "30+ Environments", "4K Output"],
    features: ["Photorealistic scenes", "Brand-ready image sets", "No prompt engineering", "Fast production workflows"],
    layout: "right",
    visualLabel: "Render Studio",
  },
  {
    id: "toughmap",
    name: "TOUGHMAP",
    url: "https://toughmap.com",
    tagline: "MAP Price Monitoring, Automated",
    description:
      "Monitor MAP compliance across every retailer, every marketplace. Automated scanning, violation alerts, and enforcement tools for brands protecting their pricing.",
    stats: ["24/7 Scanning", "Alert Driven", "Multi-Marketplace"],
    features: ["Automated Scanning", "Violation Alerts", "Multi-Marketplace Coverage", "Enforcement Tools"],
    layout: "left",
    visualLabel: "Compliance Dashboard",
  },
  {
    id: "toughassets",
    name: "TOUGHASSETS",
    url: "https://toughassets.com",
    tagline: "Your Product Image Vault",
    description:
      "Centralized product asset management for teams. Upload once, distribute everywhere. Organized by client, searchable, API-accessible.",
    stats: ["Multi-tenant", "API Access", "CDN Delivery"],
    features: ["Multi-tenant", "API Access", "CDN Delivery", "Organized by Client"],
    layout: "right",
    visualLabel: "Asset Library",
  },
  {
    id: "toughlocator",
    name: "TOUGHLOCATOR",
    url: "https://toughlocator.com",
    tagline: "The Ultimate Tool for Customers To Find Your Retailers",
    description:
      "Beautiful, embeddable dealer locator maps. Import your dealer network, customize the look, embed anywhere. Replace expensive third-party locator subscriptions.",
    stats: ["8,400+ Dealers", "Embeddable", "Email Enrichment"],
    features: ["8,400+ Dealers", "Custom Styling", "Embeddable", "Email Enrichment"],
    layout: "left",
    visualLabel: "Dealer Discovery",
  },
];

const navItems = apps.map(({ id, name }) => ({ id, label: name.replace("TOUGH", "") }));

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    const counter = { value: 0 };
    gsap.to(counter, {
      value,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.round(counter.value)}${suffix}`;
      },
    });
  }, { scope: ref });

  return <span ref={ref}>0{suffix}</span>;
}

function AppVisual({ url, id }: { url: string; label: string; id: string }) {
  return (
    <div className="reveal-card rounded-[28px] border border-white/8 bg-white/[0.03] p-3 shadow-2xl shadow-black/30">
      <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-4">
        <div className="mb-4 flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 rounded-full border border-white/5 bg-black/30 px-4 py-2 text-xs text-white/50">
            {url.replace("https://", "")}
          </div>
        </div>
        <div className="overflow-hidden rounded-[20px]">
          <img
            src={`/${id}-screenshot.png`}
            alt={`${id} screenshot`}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

function AppSection({ app }: { app: AppItem }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    gsap.from(".reveal-item", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  const info = (
    <div className="space-y-8">
      <div className="reveal-item space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange-400">{app.name}</p>
        <h2 className="max-w-xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
          {app.tagline}
        </h2>
        <p className="max-w-xl text-base leading-8 text-white/70 sm:text-lg">{app.description}</p>
      </div>

      <div className="reveal-item grid gap-3 sm:grid-cols-3">
        {app.stats.map((stat) => (
          <div key={stat} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <p className="text-sm text-white/50">Key stat</p>
            <p className="mt-2 text-lg font-semibold text-white">{stat}</p>
          </div>
        ))}
      </div>

      <div className="reveal-item grid gap-3 sm:grid-cols-2">
        {app.features.map((feature) => (
          <div key={feature} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white/70">
            {feature}
          </div>
        ))}
      </div>

      <div className="reveal-item">
        <Link
          href={app.url}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );

  const visual = <AppVisual url={app.url} label={app.visualLabel} id={app.id} />;

  return (
    <section id={app.id} ref={sectionRef} className="relative scroll-mt-28 py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {app.layout === "left" ? visual : info}
        {app.layout === "left" ? info : visual}
      </div>
    </section>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from(".hero-animate", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
    });

    gsap.to(".scroll-indicator", {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 0.9,
      ease: "power2.inOut",
    });

    ScrollTrigger.create({
      trigger: "#hero-section",
      start: "bottom top",
      onEnter: () => {
        gsap.to(".site-nav", {
          height: 60,
          backgroundColor: "rgba(0,0,0,0.78)",
          backdropFilter: "blur(24px)",
          borderColor: "rgba(255,255,255,0.05)",
          duration: 0.3,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(".site-nav", {
          height: 76,
          backgroundColor: "rgba(0,0,0,0)",
          backdropFilter: "blur(0px)",
          borderColor: "rgba(255,255,255,0)",
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });
  }, { scope: rootRef });

  return (
    <div ref={rootRef} className="min-h-screen bg-[#0a0a0b] text-white">
      <header className="site-nav fixed inset-x-0 top-0 z-50 h-[76px] border-b border-transparent bg-transparent">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="#top">
            <img src="/toughlab-logo.png" alt="ToughLab" className="h-6 w-auto sm:h-7" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-white/60 lg:flex">
            {navItems.map((item) => (
              <Link key={item.id} href={`#${item.id}`} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/5 bg-black/90 px-5 py-4 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)} className="text-sm text-white/70">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="hero-section" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-transparent to-[#0a0a0b]" />
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/8 blur-[120px] sm:h-[28rem] sm:w-[28rem]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 flex flex-col items-center text-center">
            <img
              src="/tough-hero.png"
              alt="The TOUGH Suite"
              className="hero-animate w-full h-auto mb-10"
            />
            <p className="hero-animate max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              Useful tools for automotive industry brands and retailers.
            </p>
            <div className="hero-animate mt-8 flex flex-wrap justify-center gap-4">
              <Link href="#toughrides" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
                Explore the suite
              </Link>
              <Link href="https://toughrides.ai" target="_blank" className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white">
                Start with ToughRides
              </Link>
            </div>
        </div>

        <div className="hero-animate mt-14 flex items-center justify-center gap-3 text-sm text-white/40">
          <span className="scroll-indicator inline-flex h-10 w-6 items-start justify-center rounded-full border border-white/10 p-1">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
          </span>
          Scroll the stack
        </div>
      </section>

      <main id="top" className="mx-auto max-w-7xl px-5 sm:px-8">
        {apps.map((app) => (
          <AppSection key={app.id} app={app} />
        ))}
      </main>

      <footer className="border-t border-white/5 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-bold tracking-[0.18em] text-white">TOUGH</p>
            <p className="mt-2 text-sm text-white/40">Copyright 2026</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            {apps.map((app) => (
              <Link key={app.id} href={app.url} target="_blank" className="transition hover:text-white">
                {app.name}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
