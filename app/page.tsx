"use client";

import { SiteHeader } from "@/components/site-header";
import { HeroSection01 } from "@/components/hero-section";
import Link from "next/link";
import { StickyFooter } from "@/components/ui/sticky-footer";

export default function Home() {

  // Feature Card Component
  const FeatureCard = ({
    title,
    desc,
    action,
    color,
    href
  }: {
    title: string;
    desc: string;
    action: string;
    color: string;
    href: string;
  }) => (
    <Link href={href} className="block h-full">
      <div
        className={`group relative flex flex-col justify-between p-8 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer h-80 ${color}`}
      >
        <div className="space-y-4">
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h3>
          <p className="text-slate-700 font-medium leading-relaxed">{desc}</p>
        </div>
        <div className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-900/60 group-hover:text-slate-900">
          {action} <ArrowRightIcon className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );

  function ArrowRightIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection01 />

        {/* Feature Grid */}
        <div className="bg-white py-24 px-6 md:px-12 relative z-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* 1. Palette Generator & Image Picker */}
              <FeatureCard
                title="Palette Generator & Image Picker"
                desc="Create beautiful color schemes in seconds with the worldwide loved palette tool. Just hit the spacebar! Also, extract beautiful colors from your photos and turn them into palettes."
                action="Start the Generator"
                color="bg-cyan-100/80 hover:bg-cyan-200/80"
                href="/generator"
              />

              {/* 2. Gradient Generator */}
              <FeatureCard
                title="Gradient Generator"
                desc="Create 5-step custom gradients for your Tailwind projects. Perfect for generating brand scales."
                action="Start Gradient Maker"
                color="bg-orange-100/80 hover:bg-orange-200/80"
                href="/gradient"
              />

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <StickyFooter />
    </div>
  );
}
