"use client";

import { SiteHeader } from "@/components/site-header";
import { HeroSection01 } from "@/components/hero-section";
import Link from "next/link";
import { Footer } from "@/components/ui/footer"; // Changed from StickyFooter
import { getDailyColor } from "@/lib/daily-color";
import chroma from "chroma-js";
import { useMemo, useState, useEffect } from "react";
import FeaturesCards from "@/components/ui/feature-shader-cards";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Github, Twitter } from "lucide-react";

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const dailyColor = getDailyColor();

    // Calculate text color mainly for the card background
    // If the background is dark, text should be white, else black
    const textColor = useMemo(() => {
        return chroma(dailyColor.hex).luminance() > 0.5 ? "text-slate-900" : "text-white";
    }, [dailyColor.hex]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // FeatureCard Component
    const FeatureCard = ({
        title,
        desc,
        action,
        color,
        hex,
        href
    }: {
        title: string;
        desc: string;
        action: string;
        color?: string;
        hex?: string;
        href: string;
    }) => {
        const isDark = hex ? chroma(hex).luminance() < 0.5 : false;
        const textColorClass = hex ? (isDark ? "text-white" : "text-slate-900") : "text-slate-900";
        const descColorClass = hex ? (isDark ? "text-slate-100" : "text-slate-700") : "text-slate-700";

        return (
            <Link href={href} className="block h-full">
                <div
                    className={`group relative flex flex-col justify-between p-8 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer h-80 ${!hex ? color : ''} ${textColorClass}`}
                    style={hex ? { backgroundColor: hex } : undefined}
                >
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
                        <p className={`font-medium leading-relaxed ${descColorClass}`}>{desc}</p>
                    </div>
                    <div className={`flex items-center text-sm font-bold uppercase tracking-wider ${hex ? 'opacity-80 group-hover:opacity-100' : 'text-slate-900/60 group-hover:text-slate-900'}`}>
                        {action} <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </div>
                </div>
            </Link>
        );
    };

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
    return (
        <AuroraBackground className="min-h-screen h-auto">
            <div className="relative z-10 w-full">
                <SiteHeader />

                <main className="flex-1 w-full">
                    {/* Section 1: Hero - Transparent bg to show Aurora */}
                    <div className="relative">
                        <HeroSection01 />
                    </div>

                    {/* Section 2: Feature Grid - Transparent/Glassmorphic */}
                    <section className="py-24 px-6 md:px-12 relative z-20 bg-white/50 backdrop-blur-sm border-t border-white/20">
                        <div className="mx-auto max-w-7xl">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Our Tools</h2>
                                <p className="text-slate-600 max-w-2xl mx-auto">Powerful colour tools designed for designers and developers.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* 1. Daily Color Card */}
                                <Link href={`/color/${dailyColor.hex}`} className="block h-full">
                                    <div
                                        style={{ backgroundColor: `#${dailyColor.hex}` }}
                                        className={`group relative flex flex-col justify-between p-8 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer h-80 ${textColor}`}
                                    >
                                        <div className="space-y-4">
                                            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Colour of the Day</div>
                                            <h3 className="text-3xl font-bold tracking-tight">{dailyColor.name}</h3>
                                            <p className="font-medium leading-relaxed opacity-90 line-clamp-3">
                                                {dailyColor.shortDescription}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-sm font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100">
                                            See Details <ArrowRightIcon className="ml-2 h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>

                                {/* 2. Palette Generator & Image Picker - JAVA hex from logo */}
                                <FeatureCard
                                    title="Palette Generator & Image Picker"
                                    desc="Create beautiful colour schemes in seconds with the worldwide loved palette tool. Just hit the spacebar! Also, extract beautiful colours from your photos and turn them into palettes."
                                    action="Start the Generator"
                                    hex="#4EC7CB"
                                    href="/generator"
                                />


                                {/* 3. Brand Scale Generator - BLUE MARGUERITE hex from logo */}
                                <FeatureCard
                                    title="Brand Scale Generator"
                                    desc="Generate consistent 5-step colour scales for your design system. Upload an image to extract a full palette instantly."
                                    action="Create Brand Scales"
                                    hex="#8365C5"
                                    href="/brand-scale"
                                />

                                {/* 4. Gradient Visual Editor - FIRE BUSH hex from logo */}
                                <FeatureCard
                                    title="Visual Gradient Editor"
                                    desc="Design advanced linear and radial gradients with noise. Export to CSS or Image for your projects."
                                    action="Open Visual Editor"
                                    hex="#EFA128"
                                    href="/gradient"
                                />

                            </div>
                        </div>
                    </section>

                    {/* Section 3: Philosophy/Features - White/Glass bg */}
                    <section className="bg-white/80 backdrop-blur-md">
                        <FeaturesCards />
                    </section>
                </main>

                {/* Footer */}
                <Footer
                    logo={<div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">A</div>}
                    brandName="A-Chroma"
                    socialLinks={[
                        { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
                        { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
                    ]}
                    mainLinks={[
                        { href: "/generator", label: "Generator" },
                        { href: "/brand-scale", label: "Brand Scale" },
                        { href: "/gradient", label: "Gradient" },
                    ]}
                    legalLinks={[
                        { href: "/privacy", label: "Privacy" },
                        { href: "/terms", label: "Terms" },
                    ]}
                    copyright={{
                        text: `© ${new Date().getFullYear()} A-Chroma. All rights reserved.`,
                    }}
                />
            </div>
        </AuroraBackground>
    );
}
