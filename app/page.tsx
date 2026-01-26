"use client";

import { SiteHeader } from "@/components/site-header";
import { HeroSection01 } from "@/components/hero-section";
import Link from "next/link";

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
        <div className="bg-white py-24 px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* 1. Palette Generator */}
              <FeatureCard
                title="Palette Generator"
                desc="Create beautiful color schemes in seconds with the worldwide loved palette tool. Just hit the spacebar!"
                action="Start the Generator"
                color="bg-cyan-100/80 hover:bg-cyan-200/80"
                href="/generator"
              />

              {/* 3. Image Picker */}
              <FeatureCard
                title="Image Picker"
                desc="Extract beautiful colors from your photos and turn them into palettes for your projects."
                action="Launch the Image Picker"
                color="bg-purple-100/80 hover:bg-purple-200/80"
                href="/picker"
              />

              {/* 
                    // Other features commented out as requested

                    <FeatureCard 
                        title="Explore Palettes"
                        desc="Get inspired by thousands of beautiful color schemes. Search by colors, styles, topics or hex values."
                        action="Explore 10M+ Palettes"
                        color="bg-blue-100/80 hover:bg-blue-200/80"
                        href="#"
                    />

                    <FeatureCard 
                        title="Contrast Checker"
                        desc="Calculate the contrast ratio of text and background colors to make your content more accessible."
                        action="Try the Contrast Checker"
                        color="bg-pink-100/80 hover:bg-pink-200/80"
                        href="#"
                    />

                    <FeatureCard 
                        title="Palette Visualizer"
                        desc="Preview your colors on real designs to see how they look in context before using them."
                        action="Open the Visualizer"
                        color="bg-red-100/80 hover:bg-red-200/80"
                        href="#"
                    />

                    <FeatureCard 
                        title="Color Picker"
                        desc="Get useful color information like meaning, usage, variations, and accessibility."
                        action="Launch the Color Picker"
                        color="bg-orange-100/80 hover:bg-orange-200/80"
                        href="#"
                    />
                    
                    <FeatureCard 
                        title="Tailwind Colors"
                        desc="Preview Tailwind CSS colors on real designs to see how they look in context."
                        action="Get Your Tailwind Colors"
                        color="bg-yellow-100/80 hover:bg-yellow-200/80"
                        href="#"
                    />
                    
                    <FeatureCard 
                        title="Color Bot"
                        desc="Chat with our AI-powered Color Bot, ask questions and get color suggestions."
                        action="Chat with Color Bot"
                        color="bg-green-100/80 hover:bg-green-200/80"
                        href="#"
                    />
                    */}

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-slate-400">
        <p className="mb-4">TRUSTED BY 5+ MILLION CREATIVE MINDS</p>
        <div className="flex justify-center gap-8 opacity-50 grayscale">
          {/* Mock logos */}
          <span>DISNEY</span>
          <span>NETFLIX</span>
          <span>AIRBNB</span>
          <span>DROPBOX</span>
          <span>MICROSOFT</span>
        </div>
      </footer>
    </div>
  );
}
