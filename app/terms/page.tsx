import { HeroHighlight } from "@/components/ui/hero-highlight";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/ui/footer";
import { getDailyColour } from "@/lib/daily-colour";

export const metadata = {
    title: "Terms of Service | A-Chroma",
    description: "Terms and conditions for using A-Chroma services.",
};

export default function TermsPage() {
    const dailyColour = getDailyColour();

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
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Your Content & Generated Assets</h3>
                                <p>You retain full ownership of any palettes, gradients, brand kits, or other content you create using A-Chroma. <strong>All generated assets are free for both personal and commercial use.</strong> There are no restrictions on how you use what you create with A-Chroma.</p>
                                <p className="mt-4">By using A-Chroma, you grant A-Chroma a non-exclusive license to display and share your creations if you choose to do so publicly.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Software License & Usage Rights</h3>
                                <p>A-Chroma is proprietary software developed and maintained by Achendo Agency. The source code is available for viewing on GitHub, but is licensed under custom terms:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Study & Learn:</strong> You may study the source code to understand how it works.</li>
                                    <li><strong>Free Sharing:</strong> You may share information about A-Chroma with others for free.</li>
                                    <li><strong>Contributions:</strong> You may submit pull requests to contribute improvements.</li>
                                    <li><strong>Attribution:</strong> While not required, we appreciate attribution.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">6. What Requires Permission</h3>
                                <p>The following uses of A-Chroma require written permission from Achendo Agency:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Selling the Software:</strong> Cloning, forking, or selling A-Chroma as a standalone product or as part of another software product.</li>
                                    <li><strong>Commercial Integration:</strong> Integrating A-Chroma into any commercial software, platform, or service.</li>
                                    <li><strong>Re-licensing:</strong> Re-licensing the code under different terms.</li>
                                </ul>
                                <p className="mt-4">To request permission for any of the above, contact us at:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Email:</strong> <a href="mailto:hi@achendo.com" className="text-blue-600 hover:underline">hi@achendo.com</a></li>
                                    <li><strong>Website:</strong> <a href="https://achendo.com" className="text-blue-600 hover:underline">https://achendo.com</a></li>
                                </ul>
                                <p className="mt-4">Unauthorized commercial integration or sale of this software is strictly prohibited and may result in legal action.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">7. Community Contributions</h3>
                                <p>We welcome contributions from the community. When you submit a pull request or contribution to this project, you agree to license your contribution under the same terms as the project license.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">8. Disclaimer of Warranties</h3>
                                <p>The Service is provided without warranties of any kind, whether express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h3>
                                <p>In no event shall A-Chroma or Achendo Agency be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to Terms</h3>
                                <p>We reserve the right to modify these Terms at any time. We will notify users of any significant changes by posting the new Terms on this page.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h3>
                                <p>If you have any questions about these Terms, please contact us at <a href="mailto:hi@achendo.com" className="text-blue-600 hover:underline">hi@achendo.com</a>.</p>
                            </section>
                        </div>
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
