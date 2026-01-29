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
                            Build Faster with <span style={{ color: highlight.hex }}>Colour</span>.
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg opacity-90">
                            This is how your primary colour looks in a hero section.
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
                        className="aspect-video w-full rounded-xl shadow-xl flex items-center justify-center text-4xl font-black opacity-90 overflow-hidden relative"
                        style={{ backgroundColor: primary.hex }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full opacity-60 mix-blend-multiply filter blur-3xl"
                            style={{ background: `radial-gradient(circle at top left, ${colors[0].hex}, transparent 50%)` }} />
                        <div className="absolute top-0 right-0 w-full h-full opacity-60 mix-blend-multiply filter blur-3xl"
                            style={{ background: `radial-gradient(circle at top right, ${colors[1].hex}, transparent 50%)` }} />
                        <div className="absolute bottom-0 left-0 w-full h-full opacity-60 mix-blend-multiply filter blur-3xl"
                            style={{ background: `radial-gradient(circle at bottom left, ${colors[2].hex}, transparent 50%)` }} />
                        <div className="absolute bottom-0 right-0 w-full h-full opacity-60 mix-blend-multiply filter blur-3xl"
                            style={{ background: `radial-gradient(circle at bottom right, ${colors[3].hex}, transparent 50%)` }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-60 mix-blend-overlay filter blur-3xl"
                            style={{ background: `radial-gradient(circle, ${colors[4].hex}, transparent 50%)` }} />

                        <span className="relative z-10 text-white drop-shadow-md">Mesh Gradient</span>
                    </div>
                </section>

                {/* Contrast Matrix */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Accessibility Check (WCAG)
                    </h2>
                    <div className="overflow-x-auto rounded-xl border bg-background shadow-sm">
                        <table className="w-full text-center text-sm">
                            <thead>
                                <tr>
                                    <th className="p-4 font-medium text-muted-foreground"></th>
                                    {colors.map((c, i) => (
                                        <th key={c.id} className="p-4 font-medium" style={{ color: c.hex }}>
                                            {c.name || `Color ${i + 1}`}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {colors.map((rowColor, rIndex) => (
                                    <tr key={rowColor.id} className="border-t">
                                        <td className="p-4 font-medium text-left" style={{ color: rowColor.hex }}>
                                            {rowColor.name || `Color ${rIndex + 1}`}
                                        </td>
                                        {colors.map((colColor, cIndex) => {
                                            if (rIndex === cIndex) return <td key={cIndex} className="bg-muted/50 p-4 font-mono text-xs opacity-50">-</td>;

                                            const ratio = chroma.contrast(rowColor.hex, colColor.hex);
                                            const rating = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA+' : 'Fail';
                                            const badgeColor = ratio >= 4.5 ? 'bg-green-100 text-green-800' : ratio >= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';

                                            return (
                                                <td key={cIndex} className="p-4">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <span className="font-mono font-bold text-foreground">{ratio.toFixed(2)}</span>
                                                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeColor}`}>
                                                            {rating}
                                                        </span>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Scores based on WCAG Standards. AA requires 4.5:1, AAA requires 7:1. "AA+" indicates large text compliance (3:1).
                    </p>
                </section>

            </div>
        </div>
    );
}
