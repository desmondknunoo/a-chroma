import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Palette, Layers, Zap, Globe, Eye, Layout } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative py-24 px-6 md:px-12 bg-slate-50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
                <div className="mx-auto max-w-4xl text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                        The New Standard in <span className="text-blue-600">Color Intelligence</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed mb-10">
                        A-Chroma stands as the foundational pillar of the Achendo Suite, engineered specifically for those who demand both lightning speed and surgical precision in their creative workflow.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-5xl px-6 md:px-12 py-20 space-y-24">

                {/* Section 1: Introduction */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Precision Meets Intuition</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            It is far more than a simple utility; it is an ultra-intuitive intelligence engine designed to eliminate the friction between a creative spark and a finalized visual identity. Whether you are an elite designer or a creator seeking perfect harmony, A-Chroma provides the sophisticated interface necessary to master the complex mathematics of color theory.
                        </p>
                    </div>
                    <div className="bg-slate-100 rounded-3xl p-8 h-64 flex items-center justify-center">
                        <Palette className="w-24 h-24 text-slate-300" />
                    </div>
                </section>

                {/* Section 2: Spacebar Magic */}
                <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <div className="order-2 md:order-1 bg-slate-100 rounded-3xl p-8 h-64 flex items-center justify-center">
                        <Zap className="w-24 h-24 text-slate-300" />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Spacebar Magic</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            At the heart of the experience is the "Spacebar Magic," reimagined for the 2026 design landscape. With a single keystroke, the engine instantly generates a balanced, high-fidelity palette based on perceptually uniform OKLCH models. This "lock-and-roll" system allows you to secure the specific shades you love while the algorithm dynamically hunts for the perfect complementary partners.
                        </p>
                    </div>
                </section>

                {/* Section 3: Gradients & Extraction */}
                <section>
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Beyond Static Color</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <Layers className="w-10 h-10 text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Gradient Engine</h3>
                            <p className="text-slate-600">
                                Effortlessly transform flat colors into dynamic linear, radial, and trendy mesh gradients. Calculated for maximum smoothness across OLED and high-resolution displays.
                            </p>
                        </div>
                        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <Eye className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Visual Extraction</h3>
                            <p className="text-slate-600">
                                Bridge the physical and digital worlds. Drag a photograph into the workspace to isolate dominant and accent hues, distilling the "vibe" of the real world into a usable brand kit.
                            </p>
                        </div>
                        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <Layout className="w-10 h-10 text-green-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Live Preview</h3>
                            <p className="text-slate-600">
                                Bridge the gap between abstract swatches and real-world application. Contextualize your choices on mock landing pages and dashboards before production.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 4: The Ecosystem */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">Part of the Achendo Suite</h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        As the first step in the A-Series workflow, A-Chroma serves as the creative heartbeat that fuels your entire project. Once your palette is perfected, the data flows seamlessly into tools like A-Type and A-Bridge, maintaining a unified visual language across every touchpoint.
                    </p>
                    <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200">
                        <Link href="/">Start Creating Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                </section>
            </div>
        </div>
    );
}
