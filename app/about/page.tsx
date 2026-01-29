import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Palette, Layers, Zap, Globe, Eye, Layout, ShieldCheck, Sparkles } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>
            </div>
            {/* Hero Section */}
            <div className="relative py-24 px-6 md:px-12 bg-slate-50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
                <div className="mx-auto max-w-4xl text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 italic">
                        A-Chroma: The New Standard in <span className="text-blue-600">Colour Intelligence</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
                        A-Chroma stands as the foundational pillar of the Achendo Suite, engineered specifically for those who demand both lightning speed and surgical precision in their creative workflow.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-5xl px-6 md:px-12 py-20 space-y-32">

                {/* Paragraph 1 & 2: Introduction & Spacebar */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-medium text-slate-900 tracking-tight">Precision Meets Intuition</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            It is far more than a simple utility; it is an ultra-intuitive intelligence engine designed to eliminate the friction between a creative spark and a finalized visual identity. Whether you are an elite designer or a creator seeking perfect harmony, A-Chroma provides the sophisticated interface necessary to master the complex mathematics of color theory.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            At the heart of the experience is the "Spacebar Magic," reimagined for the 2026 design landscape. With a single keystroke, the engine instantly generates a balanced, high-fidelity palette based on perceptually uniform OKLCH models. This "lock-and-roll" system allows you to secure the specific shades you love while the algorithm dynamically hunts for the perfect complementary partners.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-blue-100/30 scale-95 rounded-[2.5rem] blur-2xl group-hover:scale-105 transition-transform" />
                        <Zap className="w-32 h-32 text-blue-600 relative z-10 animate-pulse" />
                    </div>
                </section>

                {/* Paragraph 3 & 5: Gradients & Extraction */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 bg-slate-50 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-purple-100/30 scale-95 rounded-[2.5rem] blur-2xl group-hover:scale-105 transition-transform" />
                        <Layers className="w-32 h-32 text-purple-600 relative z-10" />
                    </div>
                    <div className="order-1 md:order-2 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Beyond Static Colour</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Beyond static colour blocks, A-Chroma empowers you to transcend traditional design with its dedicated gradient engine. It effortlessly transforms flat colours into dynamic linear, radial, and trendy mesh gradients with a single click. These transitions are calculated for maximum smoothness across OLED and high-resolution displays.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            The software also bridges the gap between the physical and digital worlds through its intelligent image-to-palette extraction feature. By simply dragging a photograph into the workspace, A-Chroma analyzes the pixel data to isolate dominant and accent hues. This effectively distills the atmosphere of a sunset, a piece of street art, or a landscape into a usable brand kit.
                        </p>
                    </div>
                </section>

                {/* Paragraph 4 & 6: Community & Accessibility */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Global Inspiration & Accessibility</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            For those moments when you need a spark of external inspiration, A-Chroma offers a gateway to explore millions of popular, community-curated palettes. You can dive into a global library of trending schemes used by top-tier agencies and independent professionals alike. This collective intelligence ensures you stay ahead of the curve.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Accessibility is a non-negotiable standard within the Achendo ecosystem, and A-Chroma reflects this through its robust WCAG compliance tools. Every palette you generate is automatically audited for contrast ratios and legibility in real-time. This ensures your designs are inclusive and readable for all users, including those with colour vision deficiencies.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-green-100/30 scale-95 rounded-[2.5rem] blur-2xl group-hover:scale-105 transition-transform" />
                        <ShieldCheck className="w-32 h-32 text-green-600 relative z-10" />
                    </div>
                </section>

                {/* Paragraph 7: Live Preview */}
                <section className="py-20 bg-slate-900 rounded-[3rem] px-12 text-center text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <Sparkles className="w-16 h-16 text-blue-400 mx-auto" />
                        <h2 className="text-4xl font-bold tracking-tight">The Live Preview Sandbox</h2>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            To bridge the gap between abstract swatches and real-world application, A-Chroma includes a "Live Preview" sandbox. Instead of viewing colors in isolation, you can instantly toggle a view that applies your current palette to mock landing pages, mobile dashboards, or professional brand decks. This contextualization allows you to see exactly how your choices will perform in a functional environment.
                        </p>
                    </div>
                </section>

                {/* Paragraph 8: Conclusion */}
                <section className="text-center max-w-4xl mx-auto space-y-10">
                    <h2 className="text-4xl font-bold text-slate-900">The Creative Heartbeat</h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        As the first step in the A-Series workflow, A-Chroma serves as the creative heartbeat that fuels your entire project. Once your palette is perfected, the data flows seamlessly into tools like A-Type and A-Bridge, maintaining a unified visual language across every touchpoint. It is more than just a generator; it is a commitment to visual harmony that empowers agencies and freelancers to build the future of branding with absolute confidence.
                    </p>
                    <div className="pt-8">
                        <Button asChild size="lg" className="h-16 px-12 text-lg rounded-full shadow-2xl hover:shadow-blue-200/50 transition-all bg-blue-600 hover:bg-blue-700">
                            <Link href="/">Launch the Engine <ArrowRight className="ml-2 w-5 h-5" /></Link>
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}

