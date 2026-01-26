import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe, Users, TrendingUp } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                    A Global Library of <span className="text-purple-600">Collective Intelligence</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
                    For those moments when you need a spark of external inspiration, A-Chroma offers a gateway to explore millions of popular, community-curated palettes.
                </p>
            </div>

            <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-6 mb-16">
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <TrendingUp className="w-10 h-10 text-pink-500 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Trend Analysis</h3>
                    <p className="text-slate-600">
                        Dive into a global library of trending schemes used by top-tier agencies and independent professionals alike.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <Globe className="w-10 h-10 text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Stay Ahead</h3>
                    <p className="text-slate-600">
                        This collective intelligence ensures you stay ahead of the curve, providing a virtually infinite well of visual possibilities.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <Users className="w-10 h-10 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Proven Resonance</h3>
                    <p className="text-slate-600">
                        Access palettes that are already proven to resonate with audiences, removing the uncertainty from your creative process.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-xl">
                <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
                <p className="text-lg text-slate-600 mb-8">
                    Connect with thousands of creators building the future of design.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg" variant="default">
                        <Link href="/generator">Start Designing</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="#">Join Discord (Coming Soon)</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
