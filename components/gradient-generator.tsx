"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import chroma from "chroma-js";
import ColorThief from "colorthief";
import { Copy, RefreshCw, Minus, Plus, RotateCw, Upload, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportDialog } from "@/components/export-dialog";
import { getColourName } from "@/lib/naming";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// --- Types for Visual Editor ---
type ColorStop = {
    colour: string;
    position: number;
};

const defaultColorStops: ColorStop[] = [
    { colour: "#00e1ff", position: 0 },
    { colour: "#0000ff", position: 100 },
];

export function GradientGenerator() {
    // --- Visual Editor State ---
    const [colourStops, setColorStops] = useState<ColorStop[]>(defaultColorStops);
    const [angle, setAngle] = useState(90);
    const [noiseAmount, setNoiseAmount] = useState(0);
    const [applyNoise, setApplyNoise] = useState(false);
    const [isRadialGradient, setIsRadialGradient] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const displayCanvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [generatedGradients, setGeneratedGradients] = useState<ColorStop[][]>([]);

    // --- Image Processing ---

    const processImage = (file: File) => {
        setLoading(true);
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = objectUrl;

        img.onload = () => {
            try {
                const colourThief = new ColorThief();
                const palette = colourThief.getPalette(img, 10); // Extract more to mix

                if (palette && palette.length >= 2) {
                    const extractedColors = palette.map((rgb: number[]) => chroma.rgb(rgb[0], rgb[1], rgb[2]).hex());
                    const newGradients: ColorStop[][] = [];

                    // Generate 5 distinct gradients by mixing extracted colours
                    for (let i = 0; i < 5; i++) {
                        // Strategy: Pick 2 or 3 random unique colours from the palette
                        const numStops = Math.random() > 0.6 ? 3 : 2;
                        const shuffled = [...extractedColors].sort(() => 0.5 - Math.random());
                        const selected = shuffled.slice(0, numStops);

                        // Sort by luminance for a smoother natural gradient usually, or just random
                        // Let's sort by luminance to be safe/pleasing often
                        selected.sort((a, b) => chroma(b).luminance() - chroma(a).luminance());

                        const stops: ColorStop[] = selected.map((colour, idx) => ({
                            colour,
                            position: idx === 0 ? 0 : idx === selected.length - 1 ? 100 : 50
                        }));
                        newGradients.push(stops);
                    }

                    setGeneratedGradients(newGradients);
                    setColorStops(newGradients[0]); // Auto-load first one
                }
            } catch (e) {
                console.error("Failed to extract colours", e);
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

    // --- Visual Editor Logic ---
    const gradientString = colourStops
        .map((stop) => `${stop.colour} ${stop.position}%`)
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

    const updateCanvas = useCallback(() => {
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

                colourStops.forEach((stop) => {
                    // Guard against invalid positions
                    const pos = Math.max(0, Math.min(1, stop.position / 100));
                    gradient.addColorStop(pos, stop.colour);
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
    }, [colourStops, angle, noiseAmount, applyNoise, isRadialGradient]);

    useEffect(() => {
        updateCanvas();
    }, [colourStops, angle, noiseAmount, applyNoise, isRadialGradient]);

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
                const coloursName = colourStops.map(s => s.colour.replace('#', '')).join('-');
                const filename = `A-Chroma Gradient - ${coloursName}.jpg`;

                const dataURL = exportCanvas.toDataURL("image/jpeg");
                const link = document.createElement("a");
                link.download = filename;
                link.href = dataURL;
                link.click();
            }
        }
    };

    const addColorStop = () => {
        if (colourStops.length < 5) {
            const newPosition = 50;
            setColorStops([
                ...colourStops,
                { colour: "#ffffff", position: newPosition },
            ].sort((a, b) => a.position - b.position));
        }
    };

    const removeColorStop = (index: number) => {
        if (colourStops.length > 2) {
            setColorStops(colourStops.filter((_, i) => i !== index));
        }
    };

    const updateColorStop = (index: number, colour: string, position: number) => {
        const newColorStops = [...colourStops];
        newColorStops[index] = { colour, position };
        setColorStops(newColorStops.sort((a, b) => a.position - b.position));
    };

    const randomizeGradient = () => {
        // Randomly decide 2 or 3 stops
        const numStops = Math.random() > 0.5 ? 2 : 3;
        const newStops: ColorStop[] = [];

        for (let i = 0; i < numStops; i++) {
            const pos = i === 0 ? 0 : i === numStops - 1 ? 100 : 50;
            newStops.push({
                colour: chroma.random().hex(),
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
            {/* Header / Upload Section */}
            <div className="mx-auto w-full max-w-5xl flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-white dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-bold flex items-center gap-2 justify-center md:justify-start text-slate-900 dark:text-white">
                        <ImageIcon className="w-5 h-5 text-blue-500" /> Generate from Image
                    </h3>
                    <p className="text-slate-500 text-sm">
                        Upload an image to extract a palette and generate 5 unique gradients.
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
                </div>
            </div>

            {/* Generated Gradients List */}
            {generatedGradients.length > 0 && (
                <div className="mx-auto w-full max-w-5xl">
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 ml-2">Generated Presets</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {generatedGradients.map((stops, i) => {
                            const bg = `linear-gradient(135deg, ${stops.map(s => `${s.colour} ${s.position}%`).join(', ')})`;
                            return (
                                <button
                                    key={i}
                                    className="aspect-video w-full rounded-xl shadow-sm border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
                                    style={{ background: bg }}
                                    onClick={() => setColorStops(stops)}
                                >
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colours" />
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

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
                            {colourStops.map((stop, index) => (
                                <div key={index} className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg">
                                    <div className="relative flex w-full max-w-[40px] items-center gap-3">
                                        <label
                                            htmlFor={`colour-${index}`}
                                            className="text-lg font-bold"
                                        >
                                            <div
                                                className="size-10 cursor-pointer rounded-full border-2 border-white shadow-sm"
                                                style={{ backgroundColor: stop.colour }}
                                            />
                                        </label>
                                        <Input
                                            className="absolute left-0 top-3 opacity-0 cursor-pointer"
                                            type="colour"
                                            id={`colour-${index}`}
                                            value={stop.colour}
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
                                            updateColorStop(index, stop.colour, Number(e.target.value))
                                        }
                                        className="w-16 text-center"
                                    />
                                    {colourStops.length > 2 && (
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
                            {colourStops.length < 5 && (
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
                                <ExportDialog
                                    colours={colourStops.map((s, i) => ({
                                        hex: s.colour,
                                        name: getColourName(s.colour),
                                        id: `stop-${i}`
                                    }))}
                                    paletteName="Gradient Palette"
                                />
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
        </div>
    );
}
