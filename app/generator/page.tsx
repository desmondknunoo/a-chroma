import { PaletteGenerator } from "@/components/palette-generator";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/ui/footer";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { getDailyColour } from "@/lib/daily-colour";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GeneratorPage() {
    const dailyColour = getDailyColour();

    return (
        <HeroHighlight containerClassName="min-h-screen h-auto">
            <div className="relative z-10 w-full flex flex-col min-h-screen">
                <SiteHeader />
                <main className="flex-1 relative pt-12 pb-32 px-6">
                    <div className="mx-auto max-w-[1920px]">
                        {/* Back Link */}
                        <div className="mb-8">
                            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                            </Link>
                        </div>

                        <div className="text-center space-y-4 mb-10">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                Palette Generator
                            </h1>
                            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                                Create beautiful colour schemes instantly.
                            </p>
                        </div>

                        {/* Generator Component */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-2xl border border-white/20 overflow-hidden min-h-[600px]">
                            <PaletteGenerator />
                        </div>

                        <p className="mt-8 text-center text-slate-500 font-medium">
                            All palettes are 100% free to use.
                        </p>
                    </div>
                </main>
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
        </HeroHighlight>
    );
}
