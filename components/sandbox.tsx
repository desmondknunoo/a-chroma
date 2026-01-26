"use client";

import { useColorStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import chroma from "chroma-js";

export function Sandbox() {
    const { colors } = useColorStore();

    if (colors.length < 5) return null;

    // Assign roles based on index (simple strategy for now)
    // We can eventually use color math to find best background/foreground
    const primary = colors[0];
    const secondary = colors[1];
    const accent = colors[2];
    const surface = colors[3];
    const highlight = colors[4];

    // Helper to ensure accessible text color
    const getTextColor = (bgHex: string) =>
        chroma(bgHex).luminance() > 0.5 ? "text-slate-900" : "text-white";

    return (
        <div className="h-full w-full overflow-y-auto bg-slate-50 p-6 dark:bg-slate-950 font-sans">
            <div className="mx-auto max-w-4xl space-y-12">

                {/* Mock Landing Hero */}
                <section
                    className="rounded-3xl p-12 text-center shadow-lg transition-colors duration-500"
                    style={{ backgroundColor: primary.hex }}
                >
                    <div className={`${getTextColor(primary.hex)} space-y-6`}>
                        <Badge
                            variant="outline"
                            className="border-current/30 text-current backdrop-blur-sm"
                        >
                            v2.0 Released
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                            Build Faster with <span style={{ color: highlight.hex }}>Color</span>.
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg opacity-90">
                            This is how your primary color looks in a hero section.
                            We automatically check contrast to ensure readability.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Button
                                size="lg"
                                className="font-bold shadow-md transition-transform hover:scale-105"
                                style={{
                                    backgroundColor: secondary.hex,
                                    color: chroma(secondary.hex).luminance() > 0.5 ? 'black' : 'white'
                                }}
                            >
                                Get Started
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-current/40 hover:bg-black/5"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Dashboard Cards Mockup */}
                <section className="grid gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="overflow-hidden border-none shadow-md transition-colors duration-500" style={{ backgroundColor: surface.hex }}>
                            <CardHeader>
                                <CardTitle style={{ color: getTextColor(surface.hex).includes('black') ? '#1e293b' : '#f8fafc' }}>
                                    Metric {i}
                                </CardTitle>
                                <CardDescription style={{ color: getTextColor(surface.hex).includes('black') ? '#64748b' : '#cbd5e1' }}>
                                    Daily Performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-24 w-full rounded-md opacity-20" style={{ backgroundColor: accent.hex }} />
                                <div className="mt-4 text-3xl font-bold" style={{ color: accent.hex }}>
                                    +{(i * 12.5).toFixed(1)}%
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </section>

                {/* Features Split */}
                <section className="grid gap-12 md:grid-cols-2 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Seamless Integration
                        </h2>
                        <p className="text-muted-foreground">
                            Your palette doesn't just look good in isolation. See how it handles complex interfaces, text hierarchies, and interactive elements.
                        </p>
                        <div className="flex gap-2">
                            {colors.map(c => (
                                <div key={c.id} className="h-8 w-8 rounded-full shadow-sm" style={{ backgroundColor: c.hex }} title={c.name} />
                            ))}
                        </div>
                    </div>
                    <div
                        className="aspect-video rounded-xl shadow-xl flex items-center justify-center text-4xl font-black opacity-90"
                        style={{
                            backgroundImage: `linear-gradient(135deg, ${primary.hex} 0%, ${highlight.hex} 100%)`,
                            color: '#fff'
                        }}
                    >
                        Gradient
                    </div>
                </section>

            </div>
        </div>
    );
}
