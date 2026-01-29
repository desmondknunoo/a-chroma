import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, MessageSquare, MapPin, ArrowLeft } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>
            </div>
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-6">Contact Achendo Suite</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Ready to build the future of branding? We are here to help agencies and freelancers achieve visual harmony.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Email Us</h3>
                            <p className="text-slate-600 mb-2">For support and inquiries:</p>
                            <a href="mailto:hello@achendo.com" className="text-blue-600 font-medium hover:underline">hello@achendo.com</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <MessageSquare className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Community</h3>
                            <p className="text-slate-600 mb-2">Join the conversation with elite designers:</p>
                            <Link href="/community" className="text-blue-600 font-medium hover:underline">Visit Community</Link>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jane Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="jane@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                            <textarea className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="How can we help?" />
                        </div>
                        <Button className="w-full" size="lg">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
