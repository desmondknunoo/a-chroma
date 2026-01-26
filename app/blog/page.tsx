import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">A-Chroma Blog</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Insights, updates, and design philosophy from the Achendo team.</p>
            </div>

            <div className="grid gap-8 max-w-4xl mx-auto">

                {/* Featured Post */}
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <div className="p-8 md:p-12">
                        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2 block">Featured</span>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Defining the New Standard in Color Intelligence</h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            A-Chroma is more than just a generator; it is a commitment to visual harmony. Learn how we engineered the foundational pillar of the Achendo Suite to bridge the gap between abstract swatches and real-world application.
                        </p>
                        <Button asChild variant="outline">
                            <Link href="/about">Read the Manifesto</Link>
                        </Button>
                    </div>
                </article>

                {/* Second Post */}
                <article className="grid md:grid-cols-2 gap-8 items-center bg-slate-50 rounded-2xl p-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">The Power of OKLCH</h2>
                        <p className="text-slate-600 mb-4">
                            Why we reimagined "Spacebar Magic" for 2026 using perceptually uniform color models that align with how the human eye actually sees.
                        </p>
                        <Link href="/color-theory" className="text-blue-600 font-bold hover:underline">Read more →</Link>
                    </div>
                    <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl w-full"></div>
                </article>
            </div>
        </div>
    );
}
