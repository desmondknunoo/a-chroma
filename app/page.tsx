"use client";

import { SiteHeader } from "@/components/site-header";
import { HeroSection01 } from "@/components/hero-section";
import Link from "next/link";
import { StickyFooter } from "@/components/ui/sticky-footer";
import { getDailyColor } from "@/lib/daily-color";
import chroma from "chroma-js";
import { useMemo, useState, useEffect } from "react";

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
        <div className="flex min-h-screen flex-col bg-white">
            <SiteHeader />

            <main className="flex-1">
                <HeroSection01 />

                {/* Feature Grid */}
                <div className="bg-white py-24 px-6 md:px-12 relative z-20">
                    <div className="mx-auto max-w-7xl">
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
                </div>

                {/* Philosophy Section */}
                <section className="bg-slate-50 py-32 px-6 md:px-12 border-y border-slate-100">
                    <div className="mx-auto max-w-4xl text-center space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight">
                                A-Chroma: Precision Meets Intuition
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-semibold">
                                ELIMINATING THE FRICTION BETWEEN A CREATIVE SPARK AND A FINALIZED VISUAL IDENTITY.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 text-left">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center">
                                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mr-3">
                                        <span className="text-cyan-700 font-bold">1</span>
                                    </div>
                                    Spacebar Magic
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Generate balanced, high-fidelity palettes based on perceptually uniform OKLCH models. Secure the shades you love while our algorithm hunts for the perfect partners.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center">
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                                        <span className="text-purple-600 font-bold">2</span>
                                    </div>
                                    Visual Extraction
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Bridge the gap between worlds. Analyze pixel data from any photograph to isolate dominant hues, distilling the atmosphere of the real world into brand kits.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center">
                                    <div className="w-8 h-8 rounded-lg bg-fuchsia-100 flex items-center justify-center mr-3">
                                        <span className="text-fuchsia-600 font-bold">3</span>
                                    </div>
                                    Brand Scale Architecture
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Establish consistency with algorithmic tint and shade generation. Instantly deploy 5-step scales that ensure your design system maintains accessible contrast and visual hierarchy across all applications.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center">
                                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center mr-3">
                                        <span className="text-orange-600 font-bold">4</span>
                                    </div>
                                    Gradient Synthesis
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Move beyond flat design with our advanced gradient engine. Blend colours with granular control over noise and interpolation to create rich, textured backgrounds that feel organic and modern.
                                </p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">
                                The foundational pillar of the Achendo Suite
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <StickyFooter />
        </div>
    );
}
