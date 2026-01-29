import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Eye, ArrowLeft } from "lucide-react";

export default function AccessibilityPage() {
    return (
        <div className="bg-white min-h-screen py-24 px-6">
            <div className="max-w-3xl mx-auto mb-8">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>
            </div>
            <div className="mx-auto max-w-3xl text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-6">
                    <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">
                    Inclusive by Design
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                    Accessibility is a non-negotiable standard within the Achendo ecosystem. A-Chroma reflects this through robust WCAG compliance tools built directly into the workflow.
                </p>
            </div>

            <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Eye className="w-6 h-6 text-blue-500" />
                        Real-Time Auditing
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                        Every palette you generate is automatically audited for contrast ratios and legibility in real-time. We remove the guesswork, ensuring your work meets the highest international standards of design (AA and AAA).
                    </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        Universal Readability
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                        Ensure your designs are inclusive and readable for all users, including those with colour vision deficiencies. We help you build the future of branding with absolute confidence in its usability.
                    </p>
                </div>
            </div>

            <div className="text-center mt-16">
                <Button asChild size="lg">
                    <Link href="/">Check Your Contrast</Link>
                </Button>
            </div>
        </div>
    );
}
