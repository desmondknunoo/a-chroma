import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Lightbulb, PenTool } from "lucide-react";

export default function ColorTheoryPage() {
    return (
        <div className="bg-white min-h-screen py-24 px-6">
            <div className="mx-auto max-w-4xl text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                    Mastering the <span className="text-indigo-600">Science of Color</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    A-Chroma provides the sophisticated interface necessary to master the complex mathematics of color theory, eliminating the friction between a creative spark and a finalized visual identity.
                </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-12">
                <section className="flex gap-6 items-start">
                    <div className="p-4 bg-indigo-50 rounded-2xl">
                        <BookOpen className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Perceptual Uniformity</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Our engine creates high-fidelity palettes based on perceptually uniform OKLCH models. Unlike traditional HEX or RGB spaces, this ensures that changes in values correspond to predictable changes in how the human eye perceives color.
                        </p>
                    </div>
                </section>

                <section className="flex gap-6 items-start">
                    <div className="p-4 bg-purple-50 rounded-2xl">
                        <Lightbulb className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Harmony & Balance</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            The "lock-and-roll" system allows you to secure specific shades while the algorithm dynamically hunts for the perfect complementary partners, making the discovery process both efficient and mathematically sound.
                        </p>
                    </div>
                </section>

                <section className="flex gap-6 items-start">
                    <div className="p-4 bg-teal-50 rounded-2xl">
                        <PenTool className="w-8 h-8 text-teal-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Digital to Physical Bridge</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            We help you distill the atmosphere of the real world—a sunset, street art, or landscape—into a usable brand kit, translating the "vibe" directly into your digital assets with precision.
                        </p>
                    </div>
                </section>
            </div>

            <div className="mt-20 text-center">
                <Button asChild size="lg">
                    <Link href="/">Explore the Theory in Action</Link>
                </Button>
            </div>
        </div>
    );
}
