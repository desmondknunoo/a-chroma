"use client";

import { useState } from "react";
import chroma from "chroma-js";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface GradientStep {
    stop: number;
    hex: string;
}

export function GradientGenerator() {
    const [baseColor, setBaseColor] = useState(chroma.random().hex());
    const [gradient, setGradient] = useState<GradientStep[]>([]);
    const [copied, setCopied] = useState(false);

    // Generate a Tailwind-like scale (100, 200, 300, 400, 500)
    const generateGradient = (hex: string) => {
        // scale from light to dark based on the input color roughly in the middle
        // or just generate 5 nice steps. 
        // Tailwind usually goes 50-950. User asked for 100-500.
        // Let's make 100 very light and 500 the base color or slightly darker.

        const scale = chroma.scale(['#f0fdf4', hex, '#14532d']).mode('lch').colors(9);
        // This is rough. Let's do a more controlled generation.
        // 100: very light tint
        // 500: base or dark shade

        // Better strategy:
        // 100: brightened 2x
        // 200: brightened 1x
        // 300: base
        // 400: darkened 1x
        // 500: darkened 2x

        const c = chroma(hex);
        const steps: GradientStep[] = [
            { stop: 100, hex: c.brighten(1.5).hex() },
            { stop: 200, hex: c.brighten(0.75).hex() },
            { stop: 300, hex: hex },
            { stop: 400, hex: c.darken(0.75).hex() },
            { stop: 500, hex: c.darken(1.5).hex() },
        ];
        setGradient(steps);
    };

    // Initial generation
    useState(() => generateGradient(baseColor));

    const handleGenerate = () => {
        const newColor = chroma.random().hex();
        setBaseColor(newColor);
        generateGradient(newColor);
    };

    const getConfig = () => {
        return `module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
${gradient.map(s => `          ${s.stop}: '${s.hex}',`).join('\n')}
        }
      }
    }
  }
}`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getConfig());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 space-y-8 bg-slate-50 dark:bg-slate-900">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Gradient Generator</h2>
                <p className="text-muted-foreground">Generate 5-step color scales for your Tailwind theme.</p>
            </div>

            <div className="w-full max-w-2xl grid grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-2xl h-40">
                {gradient.map((step) => (
                    <div
                        key={step.stop}
                        className="h-full flex flex-col items-center justify-center space-y-2 transition-all hover:flex-[1.5]"
                        style={{ backgroundColor: step.hex }}
                    >
                        <span className={`text-xs font-bold ${chroma.contrast(step.hex, 'white') > 4.5 ? 'text-white' : 'text-slate-900'}`}>{step.stop}</span>
                        <span className={`text-xs uppercase opacity-75 ${chroma.contrast(step.hex, 'white') > 4.5 ? 'text-white' : 'text-slate-900'}`}>{step.hex}</span>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <Button size="lg" onClick={handleGenerate} className="rounded-full">
                    <RefreshCw className="mr-2 h-4 w-4" /> Randomize
                </Button>
                <Button size="lg" variant="secondary" onClick={handleCopy} className="rounded-full">
                    <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied!" : "Copy Config"}
                </Button>
            </div>

            <div className="w-full max-w-lg bg-slate-950 rounded-xl p-6 overflow-hidden">
                <pre className="text-xs text-slate-50 font-mono">
                    {getConfig()}
                </pre>
            </div>
        </div>
    );
}
