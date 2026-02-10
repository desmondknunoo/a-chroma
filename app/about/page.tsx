"use client";

import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/ui/footer";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { getDailyColour } from "@/lib/daily-colour";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
    const dailyColour = getDailyColour();

    const features = [
        {
            title: "Instant Generation",
            description: "A-Chroma leverages perceptually uniform OKLCH colour models to generate balanced, high-fidelity palettes instantly. Unlike traditional RGB or HSL models, OKLCH aligns with how the human eye actually perceives colour, ensuring that every generated palette feels natural and harmonious. Whether you're starting from scratch or locking in specific brand colours, our algorithm dynamically hunts for the perfect partners, saving you hours of trial and error.",
            image: "/images/feature-instant-generation.png",
            align: "right"
        },
        {
            title: "Visual Extraction",
            description: "With Visual Extraction, you can bridge the gap between the physical and digital worlds. Our advanced engine analyzes pixel data from any photograph to identify and isolate dominant hues, distilling the true atmosphere of real-world scenes into usable brand kits. Capture the mood of a sunset, the vibrancy of a street market, or the elegance of an interior design, and instantly translate it into a design system ready for the web.",
            image: "/images/feature-visual-extraction.png",
            align: "left"
        },
        {
            title: "Brand Scale Architecture",
            description: "Consistency is the backbone of any great design system. A-Chroma's Brand Scale Architecture tool allows you to establish algorithmic purity in your colour systems. Instantly deploy 5-step, 10-step, or custom scales that maintain accessible contrast ratios across light and dark modes. We mathematically generate tints and shades to ensure your UI remains legible and hierarchically sound, regardless of the core brand colour you choose.",
            image: "/images/feature-brand-scale.png",
            align: "right"
        },
        {
            title: "Gradient Synthesis",
            description: "Move beyond flat, static design with our Gradient Synthesis engine. This tool gives you granular control over colour blending, allowing you to manipulate noise, interpolation, and stops to create rich, deep, and textured backgrounds. From subtle ethereal glows to vibrant, high-energy meshes, create gradients that add depth and dimension to your interfaces, all exportable as CSS or high-resolution images.",
            image: "/images/feature-gradient-synthesis.png",
            align: "left"
        }
    ];

    return (
        <HeroHighlight containerClassName="min-h-screen h-auto">
            <div className="relative z-10 w-full">
                <SiteHeader />

                <main className="w-full pt-32 pb-24 px-6 md:px-12">
                    <div className="max-w-7xl mx-auto space-y-32">

                        {/* Header Section */}
                        <div className="text-center max-w-4xl mx-auto mb-20">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-8">
                                The Science of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Colour</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
                                A-Chroma is more than just a palette generator. It is a comprehensive suite of tools designed to eliminate the friction between a creative spark and a finalized visual identity.
                            </p>
                        </div>

                        {/* Features Sections */}
                        {features.map((feature, index) => (
                            <section key={index} className={`flex flex-col ${feature.align === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="flex-1 space-y-6"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 font-bold text-xl">
                                            0{index + 1}
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                            {feature.title}
                                        </h2>
                                    </div>
                                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                        {feature.description}
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="flex-1 w-full"
                                >
                                    <div className="relative aspect-square md:aspect-video lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-10 pointer-events-none" />
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </motion.div>
                            </section>
                        ))}

                        {/* Open Source Section */}
                        <section className="bg-slate-900 text-white rounded-3xl p-12 md:p-16 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Open Source & Community</h2>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                                A-Chroma is an open source project developed and maintained by Achendo Agency.
                                We believe in the power of community and welcome contributions from developers worldwide.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://github.com/desmondknunoo/a-chroma"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colours"
                                >
                                    <svg className="w-5 h-5" fill="currentColour" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View on GitHub
                                </a>
                                <a
                                    href="/terms"
                                    className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colours"
                                >
                                    License & Terms
                                </a>
                            </div>
                            <p className="text-slate-400 mt-8 text-sm">
                                Licensed under Custom Open Source License by Achendo Agency
                            </p>
                        </section>

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
