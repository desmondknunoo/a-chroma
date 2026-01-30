"use client";

import { useParams } from "next/navigation";
import { colorsData } from "@/lib/colors-data";
import { getColorName } from "@/lib/naming";
import { SiteHeader } from "@/components/site-header";
import { StickyFooter } from "@/components/ui/sticky-footer";
import chroma from "chroma-js";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, Info, Palette, Eye, ShieldCheck, Zap, Globe, Download } from "lucide-react";
import { useState } from "react";
import { ExportDialog } from "@/components/export-dialog";
import { Button } from "@/components/ui/button";

const FormatText = ({ text }: { text: string }) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <span>
            {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </span>
    );
};

export default function ColorDetailsPage() {
    const params = useParams();
    const hexParam = params.hex as string;
    const hex = hexParam.startsWith("%23") ? hexParam.replace("%23", "") : hexParam.replace("#", "");

    const [copied, setCopied] = useState<string | null>(null);

    const colorInfo = useMemo(() => {
        return colorsData.find(c => c.hex.toLowerCase() === hex.toLowerCase()) || {
            hex: hex,
            name: getColorName(hex),
            shortDescription: "A custom selected colour from the A-Chroma engine.",
            description: "This colour has been generated or selected. It represents a unique point in the colour space, offering its own distinct psychological and visual impact.",
            psychology: "Psychology varies based on local culture and personal association. Generally, this hue contributes to the overall mood of a design in its own specific way.",
            meaning: "Meanings are often subjective, but this colour can represent a wide range of emotions and concepts depending on its context.",
            usage: "Ideal for various design applications where this specific tone is required to balance or accent other elements.",
            applications: "UI design, branding, digital art, and more.",
            history: "Colours have been used throughout history in various forms, from natural pigments to modern digital displays.",
            accessibility: "Always check contrast ratios when pairing this colour with text to ensure readability and inclusivity."
        };
    }, [hex]);

    const c = chroma(`#${hex}`);
    const textColor = c.luminance() > 0.5 ? "text-slate-900" : "text-white";

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    const technicalData = [
        { label: "HEX", value: `#${hex.toUpperCase()}` },
        { label: "RGB", value: c.rgb().join(", ") },
        { label: "CMYK", value: c.cmyk().map(v => Math.round(v * 100)).join(", ") },
        { label: "HSL", value: c.hsl().map((v, i) => i === 0 ? Math.round(v) || 0 : Math.round(v * 100) + "%").join(", ") },
        { label: "LAB", value: c.lab().map(v => Math.round(v)).join(", ") },
    ];

    const shades = chroma.scale([`#${hex}`, "black"]).colors(10).map(hex => ({ hex, name: getColorName(hex) }));
    const tints = chroma.scale([`#${hex}`, "white"]).colors(10).map(hex => ({ hex, name: getColorName(hex) }));
    const tones = chroma.scale([`#${hex}`, "gray"]).colors(10).map(hex => ({ hex, name: getColorName(hex) }));

    const harmonies = [
        { label: "Complementary", color: c.set('hsl.h', (c.get('hsl.h') + 180) % 360).hex() },
        { label: "Analogous 1", color: c.set('hsl.h', (c.get('hsl.h') + 30) % 360).hex() },
        { label: "Analogous 2", color: c.set('hsl.h', (c.get('hsl.h') - 30 + 360) % 360).hex() },
        { label: "Triadic 1", color: c.set('hsl.h', (c.get('hsl.h') + 120) % 360).hex() },
        { label: "Triadic 2", color: c.set('hsl.h', (c.get('hsl.h') + 240) % 360).hex() }
    ].map(h => ({ ...h, hex: h.color, name: getColorName(h.color) }));

    return (
        <div className="min-h-screen bg-white">
            <SiteHeader />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    <div
                        style={{ backgroundColor: `#${hex}` }}
                        className={`aspect-video lg:aspect-square rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-12 ${textColor}`}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-center">{colorInfo.name}</h1>
                        <p className="text-2xl font-mono opacity-80 uppercase tracking-widest">#{hex}</p>
                    </div>

                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Colour of the Day</span>
                            <h2 className="text-4xl font-bold text-slate-900 mt-2">{colorInfo.name}</h2>
                            <div className="text-xl text-slate-600 leading-relaxed mt-4 italic">
                                <FormatText text={colorInfo.shortDescription} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <ExportDialog
                                groups={[
                                    { name: "Main Colour", colors: [{ hex: `#${hex}`, name: colorInfo.name, value: c.css('oklch'), id: '1' }] },
                                    { name: "Shades", colors: shades },
                                    { name: "Tints", colors: tints },
                                    { name: "Tones", colors: tones },
                                    { name: "Harmonies", colors: harmonies }
                                ]}
                                allowedFileTypes={['pdf']}
                                paletteName={colorInfo.name}
                                trigger={
                                    <Button size="lg" className="w-full font-bold shadow-xl" style={{ backgroundColor: `#${hex}`, color: textColor.includes('slate-900') ? 'black' : 'white' }}>
                                        <Download className="mr-2 h-5 w-5" /> Download Palette
                                    </Button>
                                }
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {technicalData.map((data) => (
                                <button
                                    key={data.label}
                                    onClick={() => copyToClipboard(data.value, data.label)}
                                    className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all text-left group"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{data.label}</span>
                                        {copied === data.label ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-slate-300 group-hover:text-slate-400" />}
                                    </div>
                                    <p className="font-mono text-slate-900 font-medium">{data.value}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Narrative Sections */}
                <div className="grid md:grid-cols-3 gap-16 mb-24">
                    <div className="md:col-span-2 space-y-16">
                        <section className="space-y-6">
                            <h3 className="text-3xl font-bold text-slate-900 flex items-center">
                                <Info className="w-6 h-6 mr-3 text-blue-500" /> Description
                            </h3>
                            <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-line prose prose-slate max-w-none">
                                <FormatText text={colorInfo.description} />
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-3xl font-bold text-slate-900 flex items-center">
                                <Palette className="w-6 h-6 mr-3 text-purple-500" /> Psychology & Meaning
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-10">
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">Psychology</h4>
                                    <div className="text-slate-600 whitespace-pre-line leading-relaxed"><FormatText text={colorInfo.psychology} /></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">Meaning</h4>
                                    <div className="text-slate-600 whitespace-pre-line leading-relaxed"><FormatText text={colorInfo.meaning} /></div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-3xl font-bold text-slate-900 flex items-center">
                                <Zap className="w-6 h-6 mr-3 text-orange-500" /> Why use this colour
                            </h3>
                            <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-line prose prose-slate max-w-none font-medium">
                                <FormatText text={colorInfo.usage} />
                            </div>
                        </section>
                    </div>

                    <div className="space-y-12">
                        <section className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center">
                                <Eye className="w-5 h-5 mr-3 text-emerald-500" /> Applications
                            </h3>
                            <div className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                                <FormatText text={colorInfo.applications} />
                            </div>
                        </section>

                        <section className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center">
                                <Globe className="w-5 h-5 mr-3 text-cyan-500" /> History
                            </h3>
                            <div className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                                <FormatText text={colorInfo.history} />
                            </div>
                        </section>

                        <section className="p-8 bg-slate-900 rounded-[2rem] text-white">
                            <h3 className="font-bold mb-6 flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-3 text-blue-400" /> Accessibility
                            </h3>
                            <div className="text-slate-300 text-sm leading-relaxed mb-6">
                                <FormatText text={colorInfo.accessibility} />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs uppercase font-bold tracking-widest opacity-60">Contrast White</span>
                                    <span className="font-mono text-xl">{chroma.contrast(`#${hex}`, "white").toFixed(2)}:1</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs uppercase font-bold tracking-widest opacity-60">Contrast Black</span>
                                    <span className="font-mono text-xl">{chroma.contrast(`#${hex}`, "black").toFixed(2)}:1</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Variations */}
                <section className="mb-24 space-y-12">
                    <h3 className="text-4xl font-bold text-slate-900 text-center">Colour Variations</h3>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Shades</h4>
                            <div className="flex w-full h-16 rounded-xl overflow-hidden group/list">
                                {shades.map((s, i) => (
                                    <div key={i} style={{ backgroundColor: s.hex }} className="flex-1 hover:flex-[1.5] transition-all cursor-pointer relative group/item" onClick={() => copyToClipboard(s.hex, `shade-${i}`)}>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <span className="bg-black/50 text-white text-[10px] px-1 py-0.5 rounded backdrop-blur-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">{s.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Tints</h4>
                            <div className="flex w-full h-16 rounded-xl overflow-hidden group/list">
                                {tints.map((t, i) => (
                                    <div key={i} style={{ backgroundColor: t.hex }} className="flex-1 hover:flex-[1.5] transition-all cursor-pointer relative group/item" onClick={() => copyToClipboard(t.hex, `tint-${i}`)}>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <span className="bg-black/50 text-white text-[10px] px-1 py-0.5 rounded backdrop-blur-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">{t.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Tones</h4>
                            <div className="flex w-full h-16 rounded-xl overflow-hidden group/list">
                                {tones.map((t, i) => (
                                    <div key={i} style={{ backgroundColor: t.hex }} className="flex-1 hover:flex-[1.5] transition-all cursor-pointer relative group/item" onClick={() => copyToClipboard(t.hex, `tone-${i}`)}>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <span className="bg-black/50 text-white text-[10px] px-1 py-0.5 rounded backdrop-blur-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">{t.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Harmonies */}
                <section className="mb-24 py-20 bg-slate-50 rounded-[3rem] px-12">
                    <h3 className="text-4xl font-bold text-slate-900 text-center mb-16">Colour Harmonies</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {harmonies.map((h, i) => (
                            <div key={i} className="space-y-4">
                                <div
                                    style={{ backgroundColor: h.color }}
                                    className="aspect-square rounded-2xl shadow-lg border border-slate-100 hover:scale-105 transition-transform cursor-pointer relative group"
                                    onClick={() => copyToClipboard(h.color, `harmony-${i}`)}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Copy className="text-white w-8 h-8 drop-shadow-md" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{h.label}</p>
                                    <p className="text-sm font-bold text-slate-900 line-clamp-1" title={h.name}>{h.name}</p>
                                    <p className="font-mono text-xs opacity-50 uppercase">{h.color}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <StickyFooter />
        </div>
    );
}
