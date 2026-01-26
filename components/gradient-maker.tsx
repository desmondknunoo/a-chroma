"use client";

import * as React from "react"
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Copy, Download, Minus, Plus, RefreshCw, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageExtractor } from "@/components/image-extractor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useColorStore } from "@/lib/store";

type ColorStop = {
    color: string;
    position: number;
};

const defaultColorStops: ColorStop[] = [
    { color: "#00e1ff", position: 0 },
    { color: "#0000ff", position: 100 },
];

export function GradientGenerator() {
    const [colorStops, setColorStops] = useState<ColorStop[]>(defaultColorStops);
    const [angle, setAngle] = useState(90);
    const [noiseAmount, setNoiseAmount] = useState(0);
    const [applyNoise, setApplyNoise] = useState(false);
    const [isRadialGradient, setIsRadialGradient] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const displayCanvasRef = useRef<HTMLCanvasElement>(null);

    // For Palette Integration
    const { colors } = useColorStore();
    const [pickerOpen, setPickerOpen] = useState(false);

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(gradientCSS).then(() => {
            // Toast or notification could go here
        });
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
                    // Calculate gradient coordinates based on angle
                    // Simple approximation for full coverage rotation
                    // For correct rotation logic you need trig, but canvas gradient is defined by 2 points.
                    // Simplified: Vertical or Horizontal based on angle is hard in canvas linear gradient API relative to center rotation without transforms.
                    // Using a large sized gradient vector.
                    const rad = (angle - 90) * (Math.PI / 180);
                    const length = Math.abs(canvas.width * Math.sin(rad)) + Math.abs(canvas.height * Math.cos(rad));
                    const x1 = canvas.width / 2 - Math.cos(rad) * length / 2;
                    const y1 = canvas.height / 2 - Math.sin(rad) * length / 2;
                    const x2 = canvas.width / 2 + Math.cos(rad) * length / 2;
                    const y2 = canvas.height / 2 + Math.sin(rad) * length / 2;

                    gradient = ctx.createLinearGradient(x1, y1, x2, y2);
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
                    gradient.addColorStop(stop.position / 100, stop.color);
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
            const dataURL = canvas.toDataURL("image/jpeg");
            const link = document.createElement("a");
            link.download = "gradient_with_noise.jpg";
            link.href = dataURL;
            link.click();
        }
    };

    const addColorStop = () => {
        if (colorStops.length < 5) {
            const newPosition = Math.round(
                (colorStops[colorStops.length - 1].position + colorStops[0].position) /
                2,
            );
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

    const resetSettings = () => {
        setColorStops(defaultColorStops);
        setAngle(90);
        setNoiseAmount(0);
        setApplyNoise(false);
        setIsRadialGradient(false);
    };

    // Apply colors from Image Extractor (first 2-5 colors)
    const applyExtractedColors = () => {
        if (colors.length < 2) return;
        const step = 100 / (colors.length - 1);

        const newStops = colors.slice(0, 5).map((c, i) => ({
            color: c.hex,
            position: Math.round(i * step)
        }));

        if (newStops.length > 1) {
            setColorStops(newStops);
            setPickerOpen(false);
        }
    };

    return (
        <div className="mt-10 flex items-center justify-center p-6 xl:p-0">
            <div className="mx-auto w-full max-w-7xl space-y-2 rounded-2xl border-2 bg-popover/80 p-6 shadow-xl backdrop-blur-sm bg-white/80">
                <div className="flex flex-wrap justify-center gap-6">
                    <div className="relative">
                        {/* Visual Preview */}
                        <div
                            className="aspect-square h-full w-60 rounded-md md:w-80 shadow-inner"
                            style={gradientStyle}
                        ></div>
                        {/* Canvas for Noise/Export */}
                        <canvas
                            ref={displayCanvasRef}
                            width={1000}
                            height={1000}
                            className="absolute left-0 top-0 aspect-square h-full w-60 rounded-md md:w-80 pointer-events-none opacity-0"
                        // Hide display canvas element if not using noise strictly or debug? 
                        // Actually user code overlays it? "mix-blend-overlay". 
                        // Original code: className="... mix-blend-overlay ..."
                        // If applyNoise is false, it might look weird if transparency isn't handled.
                        />
                        {applyNoise && (
                            <canvas
                                ref={displayCanvasRef}
                                width={1000}
                                height={1000}
                                className="absolute left-0 top-0 aspect-square h-full w-60 rounded-md mix-blend-overlay md:w-80 pointer-events-none"
                            />
                        )}
                    </div>

                    <div className="grid w-full flex-1 gap-2">
                        {/* Controls */}
                        <div className="flex flex-wrap items-center gap-2">
                            {colorStops.map((stop, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="relative flex w-full max-w-[40px] items-center gap-3">
                                        <label
                                            htmlFor={`color-${index}`}
                                            className="text-lg font-bold"
                                        >
                                            <div
                                                className="size-10 cursor-pointer rounded-full border-2 shadow-sm"
                                                style={{ backgroundColor: stop.color, borderColor: '#e2e8f0' }}
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
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeColorStop(index)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {colorStops.length < 5 && (
                                <Button variant="outline" size="icon" onClick={addColorStop}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <Label className={!isRadialGradient ? "font-medium" : "text-muted-foreground"}>
                                    Linear
                                </Label>
                                <Switch
                                    id="gradient-type"
                                    checked={isRadialGradient}
                                    onCheckedChange={(checked) => setIsRadialGradient(checked)}
                                />
                                <Label className={isRadialGradient ? "font-medium" : "text-muted-foreground"}>
                                    Radial
                                </Label>
                            </div>
                            {!isRadialGradient && (
                                <div className="flex w-full items-center gap-2 ml-4">
                                    <Label className="w-auto min-w-[3rem]" htmlFor="angle">
                                        {angle}°
                                    </Label>
                                    <Slider
                                        id="angle"
                                        value={[angle]}
                                        defaultValue={[90]}
                                        min={0}
                                        max={360}
                                        className="w-full"
                                        onValueChange={(value) => setAngle(Number(value))}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex w-full items-center gap-2 mt-2">
                            <Switch
                                id="apply-noise"
                                checked={applyNoise}
                                onCheckedChange={setApplyNoise}
                            />
                            <Label className="w-auto whitespace-nowrap" htmlFor="apply-noise">
                                Grain Noise
                            </Label>
                            {applyNoise && (
                                <div className="flex w-full gap-2 ml-4">
                                    <Slider
                                        id="noise"
                                        defaultValue={[33]}
                                        min={0}
                                        max={200}
                                        value={[noiseAmount]}
                                        className="w-full"
                                        onValueChange={(value) => setNoiseAmount(Number(value))}
                                    />
                                    <Label className="w-auto" htmlFor="noise">
                                        {noiseAmount}
                                    </Label>
                                </div>
                            )}
                        </div>

                        {/* Actions / Picker */}
                        <div className="grid gap-2 mt-4">
                            {/* Picker integration */}
                            <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full border-dashed">
                                        <Upload className="mr-2 h-4 w-4" /> Pick Colors from Image
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Extract Colors for Gradient</DialogTitle>
                                    </DialogHeader>
                                    <ImageExtractor onComplete={() => { }} />
                                    <Button onClick={applyExtractedColors} className="w-full mt-4">
                                        Apply Extracted Colors to Gradient
                                    </Button>
                                </DialogContent>
                            </Dialog>

                            <div>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                    <Label htmlFor="css" className="sr-only">CSS Code</Label>
                                    <Input
                                        id="css"
                                        value={gradientCSS}
                                        readOnly
                                        className="w-auto flex-grow font-mono text-xs"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={copyToClipboard}
                                        title="Copy CSS"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button onClick={downloadJPG} className="gap-2">
                                        <Download className="h-4 w-4" /> JPG
                                    </Button>
                                    <Button
                                        size="icon"
                                        onClick={resetSettings}
                                        variant="secondary"
                                        title="Reset"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </div>
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
