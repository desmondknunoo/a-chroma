"use client";

import { SiteHeader } from "@/components/site-header";
import { HeroSection01 } from "@/components/hero-section";
import Link from "next/link";
import { Footer } from "@/components/ui/footer"; // Changed from StickyFooter
import { getDailyColour } from "@/lib/daily-colour";
import chroma from "chroma-js";
import { useMemo, useState, useEffect } from "react";
// import FeaturesCards from "@/components/ui/feature-shader-cards";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { Github, Twitter } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const dailyColour = getDailyColour();

    // Calculate text colour mainly for the card background
    // If the background is dark, text should be white, else black
    const textColour = useMemo(() => {
        return chroma(dailyColour.hex).luminance() > 0.5 ? "text-slate-900" : "text-white";
    }, [dailyColour.hex]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // FeatureCard Component
    const FeatureCard = ({
        title,
        desc,
        action,
        colour,
        hex,
        href
    }: {
        title: string;
        desc: string;
        action: string;
        colour?: string;
        hex?: string;
        href: string;
    }) => {
        const isDark = hex ? chroma(hex).luminance() < 0.5 : false;
        const textColourClass = hex ? (isDark ? "text-white" : "text-slate-900") : "text-slate-900";
        const descColourClass = hex ? (isDark ? "text-slate-100" : "text-slate-700") : "text-slate-700";

        return (
            <Link href={href} className="block h-full">
                <div
                    className={`group relative flex flex-col justify-between p-8 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer h-80 ${!hex ? colour : ''} ${textColourClass}`}
                    style={hex ? { backgroundColor: hex } : undefined}
                >
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
                        <p className={`font-medium leading-relaxed ${descColourClass}`}>{desc}</p>
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
                stroke="currentColour"
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
        <InfiniteGrid className="min-h-screen h-auto">
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
                            <div className="text-center mb-20">
                                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">A-Chroma Suite</span>
                                <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6">
                                    Precision Meets Intuition
                                </h2>
                                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                                    Eliminating the friction between a creative spark and a finalized visual identity.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* 1. Daily Colour Card */}
                                <Link href={`/colour/${dailyColour.hex}`} className="block h-full">
                                    <div
                                        style={{ backgroundColor: `#${dailyColour.hex}` }}
                                        className={`group relative flex flex-col justify-between p-8 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer h-80 ${textColour}`}
                                    >
                                        <div className="space-y-4">
                                            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Colour of the Day</div>
                                            <h3 className="text-3xl font-bold tracking-tight">{dailyColour.name}</h3>
                                            <p className="font-medium leading-relaxed opacity-90 line-clamp-3">
                                                {dailyColour.shortDescription}
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

                                {/* 5. Contrast Checker - Coming Soon */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="block h-full cursor-pointer">
                                            <div className="group relative flex flex-col justify-between p-8 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer h-80 bg-slate-900 text-white">
                                                <div className="space-y-4">
                                                    <div className="text-xs font-bold uppercase tracking-wider opacity-80">Coming Soon</div>
                                                    <h3 className="text-3xl font-bold tracking-tight">Contrast Checker</h3>
                                                    <p className="font-medium leading-relaxed opacity-90">
                                                        Test colour combinations for WCAG accessibility compliance. Ensure your designs meet accessibility standards.
                                                    </p>
                                                </div>
                                                <div className="flex items-center text-sm font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100">
                                                    Check Contrast <ArrowRightIcon className="ml-2 h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Coming Soon</DialogTitle>
                                            <DialogDescription>
                                                The Contrast Checker feature is currently under development and will be available next week.
                                                Stay tuned for updates!
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 text-center">
                                            <p className="text-slate-600">
                                                We're working hard to bring you this feature.
                                                Subscribe to our newsletter or follow us on GitHub to be notified when it launches.
                                            </p>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                            </div>
                        </div>
                    </section>

                    {/* Section 3: Philosophy/Features */}
                    {/* Section 3: Philosophy/Features (Moved to About page) */}
                </main>

                {/* Footer */}
                <Footer
                    brandName="A-Chroma"
                    dailyColour={dailyColour}
                    mainLinks={[
                        { href: "/generator", label: "Generator" },
                        { href: "/brand-scale", label: "Brand Scale" },
                        { href: "/gradient", label: "Gradient" },
                        { href: "/about", label: "About" },
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
        </InfiniteGrid>
    );
}
