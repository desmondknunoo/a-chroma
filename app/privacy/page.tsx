import { HeroHighlight } from "@/components/ui/hero-highlight";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/ui/footer";
import { getDailyColor } from "@/lib/daily-color";

export const metadata = {
    title: "Privacy Policy | A-Chroma",
    description: "Privacy Policy for A-Chroma.",
};

export default function PrivacyPage() {
    const dailyColor = getDailyColor();

    return (
        <HeroHighlight containerClassName="min-h-screen h-auto">
            <div className="relative z-10 w-full flex flex-col min-h-screen">
                <SiteHeader />
                <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
                    <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-sm border border-white/40">
                        <h1 className="text-4xl font-bold text-slate-900 mb-12">Privacy Policy</h1>

                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 space-y-12">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Last updated: {new Date().toLocaleDateString()}</p>
                            </div>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h3>
                                <p>We collect minimal information to provide and improve the Service. This may include:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Usage Data: Information about how you use the website, such as pages visited and time spent.</li>
                                    <li>Device Information: Browser type, operating system, and device type.</li>
                                    <li>Generated Content: Data regarding the palettes and gradients you create if you choose to save or export them.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h3>
                                <p>We use the collected information to:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Provide and maintain the Service.</li>
                                    <li>Improve and personalize your experience.</li>
                                    <li>Analyze usage patterns to enhance performance and features.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Cookies and Tracking Technologies</h3>
                                <p>We use cookies and similar technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h3>
                                <p>The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your Personal Data.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Third-Party Services</h3>
                                <p>We may use third-party Service Providers to monitor and analyze the use of our Service (e.g., analytics providers). These third parties have access to your Personal Data only to perform these tasks on our behalf.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">6. Changes to This Privacy Policy</h3>
                                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h3>
                                <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hi@achendo.com" className="text-blue-600 hover:underline">hi@achendo.com</a>.</p>
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
