import { HeroHighlight } from "@/components/ui/hero-highlight";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/ui/footer";
import { getDailyColor } from "@/lib/daily-color";

export const metadata = {
    title: "Terms of Service | A-Chroma",
    description: "Terms and conditions for using A-Chroma services.",
};

export default function TermsPage() {
    const dailyColor = getDailyColor();

    return (
        <HeroHighlight containerClassName="min-h-screen h-auto">
            <div className="relative z-10 w-full flex flex-col min-h-screen">
                <SiteHeader />
                <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
                    <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-sm border border-white/40">
                        <h1 className="text-4xl font-bold text-slate-900 mb-12">Terms of Service</h1>

                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 space-y-12">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Last updated: {new Date().toLocaleDateString()}</p>
                            </div>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h3>
                                <p>By accessing and using A-Chroma (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h3>
                                <p>A-Chroma provides a suite of colour tools including palette generation, color extraction, and gradient editing. The Service is provided &quot;as is&quot; and is subject to change at any time.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">3. User Conduct</h3>
                                <p>You agree to use the Service only for lawful purposes. You are prohibited from using the Service to generate content that is illegal, harmful, or violates the rights of others.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property</h3>
                                <p>All content, features, and functionality of the Service, including but not limited to the codebase, design, and logos, are owned by Achendo.com and are protected by copyright and other intellectual property laws.</p>
                                <p>You retain ownership of any palettes or gradients you create using the Service. However, you grant A-Chroma a non-exclusive license to display such content if you choose to share it publicly.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Disclaimer of Warranties</h3>
                                <p>The Service is provided without warranties of any kind, whether express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h3>
                                <p>In no event shall A-Chroma or Achendo.com be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">7. Changes to Terms</h3>
                                <p>We reserve the right to modify these Terms at any time. We will notify users of any significant changes by posting the new Terms on this page.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Us</h3>
                                <p>If you have any questions about these Terms, please contact us at <a href="mailto:hi@achendo.com" className="text-blue-600 hover:underline">hi@achendo.com</a>.</p>
                            </section>
                        </div>
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
