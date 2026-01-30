
import { Metadata } from "next";
import Link from "next/link";
import { GradientGenerator } from "@/components/gradient-generator";
import { SiteHeader } from "@/components/site-header";

import { getDailyColor } from "@/lib/daily-color";
import { Footer } from "@/components/ui/footer";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Visual Gradient Editor",
    description: "Create stunning gradients visually or generate them from your photos.",
};

export default function GradientPage() {
    const dailyColor = getDailyColor();

    return (
        <HeroHighlight containerClassName="min-h-screen h-auto">
            <div className="relative z-10 w-full flex flex-col min-h-screen">
                <SiteHeader />

                <main className="flex-1 relative pt-12 pb-32 px-6">
                    <div className="mx-auto max-w-7xl">
                        {/* Back Link */}
                        <div className="mb-8">
                            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                            </Link>
                        </div>

                        <div className="text-center space-y-4 mb-10">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                Visual Gradient Editor
                            </h1>
                            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                                Create stunning gradients visually or generate them from your photos.
                            </p>
                        </div>

                        {/* The Generator Component */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-2xl border border-white/20 overflow-hidden">
                            <GradientGenerator />
                        </div>

                        <p className="mt-8 text-center text-slate-500 font-medium">
                            All gradients are 100% free to use.
                        </p>
                    </div>
                </main>

                <Footer
                    brandName="A-Chroma"
                    dailyColor={dailyColor}
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
        </HeroHighlight>
    );
}
