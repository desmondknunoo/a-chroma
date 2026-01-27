"use client";

import { useState, useRef, useEffect } from "react";
import chroma from "chroma-js";
import { Copy, RefreshCw, Minus, Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Types for Brand Scale ---
interface GradientStep {
    stop: number;
    hex: string;
}

// --- Types for Visual Editor ---
type ColorStop = {
    color: string;
    position: number;
};

const defaultColorStops: ColorStop[] = [
    { color: "#00e1ff", position: 0 },
    { color: "#0000ff", position: 100 },
];

export function GradientGenerator() {
    // --- Brand Scale State ---
    const [baseColor, setBaseColor] = useState(chroma.random().hex());
    const [scaleGradient, setScaleGradient] = useState<GradientStep[]>([]);
    const [scaleCopied, setScaleCopied] = useState(false);

    // --- Visual Editor State ---
    const [colorStops, setColorStops] = useState<ColorStop[]>(defaultColorStops);
    const [angle, setAngle] = useState(90);
    const [noiseAmount, setNoiseAmount] = useState(0);
    const [applyNoise, setApplyNoise] = useState(false);
    const [isRadialGradient, setIsRadialGradient] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const displayCanvasRef = useRef<HTMLCanvasElement>(null);

    // --- Brand Scale Logic ---
    const generateScale = (hex: string) => {
        const c = chroma(hex);
        const steps: GradientStep[] = [
            { stop: 100, hex: c.brighten(1.5).hex() },
            { stop: 200, hex: c.brighten(0.75).hex() },
            { stop: 300, hex: hex },
            { stop: 400, hex: c.darken(0.75).hex() },
            { stop: 500, hex: c.darken(1.5).hex() },
        ];
        setScaleGradient(steps);
    };

    useState(() => generateScale(baseColor));

    const handleGenerateScale = () => {
        const newColor = chroma.random().hex();
        setBaseColor(newColor);
        generateScale(newColor);
    };

    const getScaleConfig = () => {
        return `module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
${scaleGradient.map(s => `          ${s.stop}: '${s.hex}',`).join('\n')}
        }
      }
    }
  }
}`;
    };

    const handleCopyScale = () => {
        navigator.clipboard.writeText(getScaleConfig());
        setScaleCopied(true);
        setTimeout(() => setScaleCopied(false), 2000);
    };


    // --- Visual Editor Logic ---
    const gradientString = colorStops
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ");

    const gradientStyle = {
        background: !isRadialGradient
            ? `linear-gradient(${angle}deg, ${gradientString})`
            : `radial-gradient(circle, ${gradientString})`,
    };

    const gradientCSS = !isRadialGradient
        ? `background: linear-gradient(${angle}deg, ${gradientString});`
        : `background: radial-gradient(circle, ${gradientString});`;

    const copyToClipboardVisual = () => {
        navigator.clipboard.writeText(gradientCSS);
    };

    useEffect(() => {
        updateCanvas();
    }, [colorStops, angle, noiseAmount, applyNoise, isRadialGradient]);

    const updateCanvas = () => {
        const canvas = canvasRef.current;
        const displayCanvas = displayCanvasRef.current;
        if (canvas && displayCanvas) {
            const ctx = canvas.getContext("2d");
            const displayCtx = displayCanvas.getContext("2d");
            if (ctx && displayCtx) {
                let gradient;
                if (!isRadialGradient) {
                    gradient = ctx.createLinearGradient(
                        0,
                        0,
                        canvas.width,
                        canvas.height,
                    );
                } else {
                    gradient = ctx.createRadialGradient(
                        canvas.width / 2,
                        canvas.height / 2,
                        0,
                        canvas.width / 2,
                        canvas.height / 2,
                        canvas.width / 2,
                    );
                }

                colorStops.forEach((stop) => {
                    // Guard against invalid positions
                    const pos = Math.max(0, Math.min(1, stop.position / 100));
                    gradient.addColorStop(pos, stop.color);
                });

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                if (applyNoise) {
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const noise = (Math.random() - 0.5) * noiseAmount;
                        data[i] = Math.min(255, Math.max(0, data[i] + noise));
                        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
                        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
                    }
                    ctx.putImageData(imageData, 0, 0);
                }

                displayCtx.drawImage(
                    canvas,
                    0,
                    0,
                    displayCanvas.width,
                    displayCanvas.height,
                );
            }
        }
    };

    const downloadJPG = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Create a larger canvas for the watermark
            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = canvas.width;
            exportCanvas.height = canvas.height + 50; // Add space for footer
            const ctx = exportCanvas.getContext('2d');

            if (ctx) {
                // Draw white background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

                // Draw gradient image
                ctx.drawImage(canvas, 0, 0);

                // Draw Watermark
                ctx.font = '12px sans-serif';
                ctx.fillStyle = '#999999'; // Grey
                ctx.textAlign = 'center';
                ctx.fillText("Generated with A-Chroma on achendo.com/a-chroma", exportCanvas.width / 2, exportCanvas.height - 20);

                // Generate Filename
                const colorsName = colorStops.map(s => s.color.replace('#', '')).join('-');
                const filename = `A-Chroma Gradient - ${colorsName}.jpg`;

                const dataURL = exportCanvas.toDataURL("image/jpeg");
                const link = document.createElement("a");
                link.download = filename;
                link.href = dataURL;
                link.click();
            }
        }
    };

    const addColorStop = () => {
        if (colorStops.length < 5) {
            // Find a position between last and first or just append 50%
            // Current logic from user snippet seems odd for 'last + first / 2' if unsorted, but let's stick to safe default
            const newPosition = 50;
            setColorStops([
                ...colorStops,
                { color: "#ffffff", position: newPosition },
            ].sort((a, b) => a.position - b.position));
        }
    };

    const removeColorStop = (index: number) => {
        if (colorStops.length > 2) {
            setColorStops(colorStops.filter((_, i) => i !== index));
        }
    };

    const updateColorStop = (index: number, color: string, position: number) => {
        const newColorStops = [...colorStops];
        newColorStops[index] = { color, position };
        setColorStops(newColorStops.sort((a, b) => a.position - b.position));
    };

    const randomizeGradient = () => {
        // Randomly decide 2 or 3 stops
        const numStops = Math.random() > 0.5 ? 2 : 3;
        const newStops: ColorStop[] = [];

        for (let i = 0; i < numStops; i++) {
            const pos = i === 0 ? 0 : i === numStops - 1 ? 100 : 50;
            newStops.push({
                color: chroma.random().hex(),
                position: pos,
            });
        }
        setColorStops(newStops);
        setAngle(Math.floor(Math.random() * 360));
    };

    const resetSettings = () => {
        setColorStops(defaultColorStops);
        setAngle(90);
        setNoiseAmount(0);
        setApplyNoise(false);
        setIsRadialGradient(false);
    };

    return (
        <div className="flex h-full w-full flex-col p-6 space-y-8 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Gradient Studio</h2>
                <p className="text-muted-foreground">Create Tailwind scales or design advanced gradients.</p>
            </div>

            <Tabs defaultValue="visual" className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="brand">Brand Scale Generator</TabsTrigger>
                    <TabsTrigger value="visual">Visual Gradient Editor</TabsTrigger>
                </TabsList>

                {/* --- Brand Scale Content --- */}
                <TabsContent value="brand" className="space-y-8 flex flex-col items-center">
                    <div className="w-full max-w-2xl grid grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-2xl h-40">
                        {scaleGradient.map((step) => (
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
                        <Button size="lg" onClick={handleGenerateScale} className="rounded-full">
                            <RefreshCw className="mr-2 h-4 w-4" /> Randomize
                        </Button>
                        <Button size="lg" variant="secondary" onClick={handleCopyScale} className="rounded-full">
                            <Copy className="mr-2 h-4 w-4" /> {scaleCopied ? "Copied!" : "Copy Config"}
                        </Button>
                    </div>

                    <div className="w-full max-w-lg bg-slate-950 rounded-xl p-6 overflow-hidden">
                        <pre className="text-xs text-slate-50 font-mono">
                            {getScaleConfig()}
                        </pre>
                    </div>
                </TabsContent>

                {/* --- Visual Editor Content --- */}
                <TabsContent value="visual">
                    <div className="mx-auto w-full max-w-5xl space-y-2 rounded-2xl border-2 bg-white p-6 shadow-sm">
                        <div className="flex flex-wrap justify-center gap-12">
                            {/* Canvas Preview */}
                            <div className="relative">
                                <div
                                    className="aspect-square h-full w-60 rounded-md md:w-80 shadow-inner"
                                    style={gradientStyle}
                                ></div>
                                <canvas
                                    ref={displayCanvasRef}
                                    width={1000}
                                    height={1000}
                                    className="absolute left-0 top-0 aspect-square h-full w-60 rounded-md mix-blend-overlay md:w-80"
                                />
                            </div>

                            {/* Controls */}
                            <div className="grid w-full flex-1 gap-6">
                                {/* Color Stops */}
                                <div className="flex flex-wrap items-center gap-4">
                                    {colorStops.map((stop, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg">
                                            <div className="relative flex w-full max-w-[40px] items-center gap-3">
                                                <label
                                                    htmlFor={`color-${index}`}
                                                    className="text-lg font-bold"
                                                >
                                                    <div
                                                        className="size-10 cursor-pointer rounded-full border-2 border-white shadow-sm"
                                                        style={{ backgroundColor: stop.color }}
                                                    />
                                                </label>
                                                <Input
                                                    className="absolute left-0 top-3 opacity-0 cursor-pointer"
                                                    type="color"
                                                    id={`color-${index}`}
                                                    value={stop.color}
                                                    onChange={(e) =>
                                                        updateColorStop(index, e.target.value, stop.position)
                                                    }
                                                />
                                            </div>
                                            <Input
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={stop.position}
                                                onChange={(e) =>
                                                    updateColorStop(index, stop.color, Number(e.target.value))
                                                }
                                                className="w-16 text-center"
                                            />
                                            {colorStops.length > 2 && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeColorStop(index)}
                                                    className="h-8 w-8 text-slate-500 hover:text-red-500"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    {colorStops.length < 5 && (
                                        <Button variant="outline" size="icon" onClick={addColorStop} className="h-14 w-14 rounded-full border-dashed">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                {/* Gradient Type */}
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <Label className={!isRadialGradient ? "font-bold text-slate-900" : "text-slate-500"}>
                                            Linear
                                        </Label>
                                        <Switch
                                            id="gradient-type"
                                            checked={isRadialGradient}
                                            onCheckedChange={(checked) => setIsRadialGradient(checked)}
                                        />
                                        <Label className={isRadialGradient ? "font-bold text-slate-900" : "text-slate-500"}>
                                            Radial
                                        </Label>
                                    </div>
                                    {!isRadialGradient && (
                                        <div className="flex w-full items-center gap-4 border-l pl-4 ml-4">
                                            <Label className="w-auto font-medium" htmlFor="angle">
                                                Angle
                                            </Label>
                                            <Slider
                                                id="angle"
                                                value={[angle]}
                                                min={0}
                                                max={360}
                                                className="w-full max-w-[200px]"
                                                onValueChange={(value) => setAngle(Number(value))}
                                            />
                                            <span className="w-12 text-sm font-mono">{angle}°</span>
                                        </div>
                                    )}
                                </div>

                                {/* Noise */}
                                <div className="flex w-full items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                    <Switch
                                        id="apply-noise"
                                        checked={applyNoise}
                                        onCheckedChange={setApplyNoise}
                                    />
                                    <Label className="w-auto font-bold" htmlFor="apply-noise">
                                        Grainy Noise
                                    </Label>
                                    {applyNoise && (
                                        <div className="flex w-full gap-4 items-center border-l pl-4 ml-4">
                                            <Slider
                                                id="noise"
                                                min={0}
                                                max={200}
                                                value={[noiseAmount]}
                                                className="w-full max-w-[200px]"
                                                onValueChange={(value) => setNoiseAmount(Number(value))}
                                            />
                                            <span className="w-12 text-sm font-mono">{noiseAmount}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Output */}
                                <div className="grid gap-2">
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                        <Input
                                            id="css"
                                            value={gradientCSS}
                                            readOnly
                                            className="w-auto flex-grow font-mono text-xs bg-slate-950 text-white border-none h-12"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={copyToClipboardVisual}
                                            className="h-12 w-12"
                                            title="Copy CSS"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button onClick={downloadJPG} className="h-12">
                                            Download JPG
                                        </Button>
                                        <Button
                                            onClick={randomizeGradient}
                                            variant="secondary"
                                            className="h-12"
                                            title="Randomize Gradient"
                                        >
                                            <RefreshCw className="mr-2 h-4 w-4" /> Random
                                        </Button>
                                        <Button
                                            size="icon"
                                            onClick={resetSettings}
                                            variant="secondary"
                                            className="h-12 w-12"
                                            title="Reset"
                                        >
                                            <RotateCw className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <canvas
                        ref={canvasRef}
                        width="1000"
                        height="1000"
                        style={{ display: "none" }}
                    />
                </TabsContent>
            </Tabs>


        </div>
    );
}
