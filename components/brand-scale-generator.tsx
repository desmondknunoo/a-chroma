"use client";

import { useState, useRef } from "react";
import chroma from "chroma-js";
import ColorThief from "colorthief";
import { Copy, RefreshCw, Upload, ImageIcon, Loader2, Download } from "lucide-react";
import { ExportDialog } from "@/components/export-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GradientStep {
    stop: number;
    hex: string;
}

interface BrandScale {
    id: string;
    baseColor: string;
    steps: GradientStep[];
}

export function BrandScaleGenerator() {
    const [scales, setScales] = useState<BrandScale[]>([]);
    const [loading, setLoading] = useState(false);
    const [scaleCopied, setScaleCopied] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Generation Logic ---

    const generateScaleSteps = (hex: string): GradientStep[] => {
        const c = chroma(hex);
        return [
            { stop: 100, hex: c.brighten(1.5).hex() },
            { stop: 200, hex: c.brighten(0.75).hex() },
            { stop: 300, hex: hex },
            { stop: 400, hex: c.darken(0.75).hex() },
            { stop: 500, hex: c.darken(1.5).hex() },
        ];
    };

    const createSingleScale = (color?: string) => {
        const baseColor = color || chroma.random().hex();
        return {
            id: Math.random().toString(36).substr(2, 9),
            baseColor,
            steps: generateScaleSteps(baseColor)
        };
    };

    // Initialize with one random scale if empty
    useState(() => {
        if (scales.length === 0) setScales([createSingleScale()]);
    });

    // --- Image Processing ---

    const processImage = (file: File) => {
        setLoading(true);
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = objectUrl;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(img, 5); // Extract 5 colors

                if (palette) {
                    const newScales = palette.map((rgb: number[]) => {
                        const hex = chroma.rgb(rgb[0], rgb[1], rgb[2]).hex();
                        return createSingleScale(hex);
                    });

                    // Ensure we have exactly 5 (fill context if needed, though getPalette usually respects count)
                    // If less than 5, fill with random variations of the first
                    while (newScales.length < 5 && newScales.length > 0) {
                        const base = chroma(newScales[0].baseColor).brighten(newScales.length * 0.2).hex();
                        newScales.push(createSingleScale(base));
                    }

                    setScales(newScales);
                }
            } catch (e) {
                console.error("Failed to extract colors", e);
            } finally {
                setLoading(false);
                URL.revokeObjectURL(objectUrl);
            }
        };

        img.onerror = () => {
            setLoading(false);
            URL.revokeObjectURL(objectUrl);
        };
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) processImage(e.target.files[0]);
    };

    // --- Actions ---

    const updateBaseColor = (id: string, newHex: string) => {
        setScales(scales.map(s =>
            s.id === id ? { ...s, baseColor: newHex, steps: generateScaleSteps(newHex) } : s
        ));
    };

    const randomizeAll = () => {
        setScales(scales.map(() => createSingleScale()));
    };

    const getScaleConfig = (scale: BrandScale, index: number) => {
        // Safe name
        const nameKey = `brand-${index + 1}`;
        return `        // Scale ${index + 1} (${scale.baseColor})\n` +
            `        '${nameKey}': {\n` +
            scale.steps.map(s => `          ${s.stop}: '${s.hex}',`).join('\n') +
            `\n        },`;
    };

    const getAllConfig = () => {
        return `module.exports = {
  theme: {
    extend: {
      colors: {
${scales.map((s, i) => getScaleConfig(s, i)).join('\n')}
      }
    }
  }
}`;
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setScaleCopied(id);
        setTimeout(() => setScaleCopied(null), 2000);
    };

    return (
        <div className="flex flex-col space-y-8 w-full max-w-5xl mx-auto">
            {/* Header / Upload Section */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
                        <ImageIcon className="w-6 h-6" /> Generated from Image
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Upload an image to extract 5 dominant colors and generate their brand scales.
                    </p>
                </div>

                <div className="flex gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <Button size="lg" onClick={() => fileInputRef.current?.click()} disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        {loading ? "Extracting..." : "Upload Image"}
                    </Button>
                    <Button size="lg" variant="outline" onClick={randomizeAll}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Randomize
                    </Button>
                </div>
            </div>

            {/* Scales List */}
            <div className="grid gap-8">
                {scales.map((scale, index) => (
                    <div key={scale.id} className="bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-sm border space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="font-mono font-bold text-lg text-slate-400">0{index + 1}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border shadow-sm" style={{ backgroundColor: scale.baseColor }}></div>
                                    <Input
                                        type="text"
                                        value={scale.baseColor}
                                        onChange={(e) => updateBaseColor(scale.id, e.target.value)}
                                        className="w-24 font-mono uppercase"
                                    />
                                    <Input
                                        type="color"
                                        value={scale.baseColor}
                                        onChange={(e) => updateBaseColor(scale.id, e.target.value)}
                                        className="w-10 h-10 p-1 rounded-lg cursor-pointer"
                                    />
                                </div>
                            </div>

                            <Button variant="ghost" size="sm" onClick={() => handleCopy(`module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${getScaleConfig(scale, index)}\n      }\n    }\n  }\n}`, scale.id)}>
                                <Copy className="w-4 h-4 mr-2" />
                                {scaleCopied === scale.id ? "Copied!" : "Copy"}
                            </Button>
                        </div>

                        {/* Visual Scale */}
                        <div className="grid grid-cols-5 h-24 rounded-xl overflow-hidden ring-1 ring-slate-900/5">
                            {scale.steps.map(step => (
                                <div key={step.stop} style={{ backgroundColor: step.hex }} className="flex flex-col items-center justify-center group relative">
                                    <span className={`text-xs font-bold ${chroma.contrast(step.hex, 'white') > 4.5 ? 'text-white' : 'text-slate-900'}`}>
                                        {step.stop}
                                    </span>
                                    <span className={`text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 ${chroma.contrast(step.hex, 'white') > 4.5 ? 'text-white' : 'text-slate-900'}`}>
                                        {step.hex}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Master Config */}
            <div className="bg-slate-950 rounded-2xl p-6 overflow-hidden relative group">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm" onClick={() => handleCopy(getAllConfig(), 'all')}>
                        {scaleCopied === 'all' ? "Copied!" : "Copy All Config"}
                    </Button>
                    {/* Export Dialog Integration */}
                    <ExportDialog
                        groups={scales.map((scale, i) => ({
                            name: `Scale ${i + 1} (${scale.baseColor})`,
                            colors: scale.steps.map(s => ({
                                hex: s.hex,
                                name: `${s.stop}`,
                                value: s.stop.toString(),
                                id: `${scale.id}-${s.stop}`
                            }))
                        }))}
                        paletteName="Brand Scales"
                        trigger={
                            <Button variant="secondary" size="sm">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        }
                    />
                </div>
                <pre className="text-xs text-slate-50 font-mono overflow-x-auto p-4">
                    {getAllConfig()}
                </pre>
            </div>
        </div>
    );
}
