"use client";

import { useState, useRef } from "react";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useColorStore } from "@/lib/store";
import ColorThief from "colorthief";
import chroma from "chroma-js";
import { getColorName } from "@/lib/naming";

export function ImageExtractor({ onComplete }: { onComplete: () => void }) {
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setColors } = useColorStore();

    const processImage = (file: File) => {
        setLoading(true);
        const objectUrl = URL.createObjectURL(file);

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = objectUrl;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();
                // Get 5 dominant colors
                const palette = colorThief.getPalette(img, 5);

                if (palette) {
                    // Palette is [[r,g,b], [r,g,b]...]
                    const colorItems = palette.map((rgb: number[]) => {
                        const hex = chroma.rgb(rgb[0], rgb[1], rgb[2]).hex();
                        const c = chroma(hex);
                        const [l, ch, h] = c.oklch();

                        return {
                            id: crypto.randomUUID(),
                            hex: hex,
                            value: `oklch(${l.toFixed(3)} ${ch.toFixed(3)} ${h || 0})`,
                            locked: true,
                            name: getColorName(hex)
                        };
                    });

                    // Ensure we have 5
                    while (colorItems.length < 5) {
                        // Fill with variations if fewer than 5 returned
                        const base = chroma(colorItems[0].hex);
                        const newC = base.brighten(colorItems.length * 0.5);
                        const hex = newC.hex();
                        const [l, ch, h] = newC.oklch();
                        colorItems.push({
                            id: crypto.randomUUID(),
                            hex: hex,
                            value: `oklch(${l.toFixed(3)} ${ch.toFixed(3)} ${h || 0})`,
                            locked: true,
                            name: getColorName(hex)
                        });
                    }

                    setColors(colorItems.slice(0, 5));
                    onComplete();
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
            console.error("Failed to load image");
        };
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            processImage(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            processImage(e.target.files[0]);
        }
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 border-2 rounded-xl border-dashed border-slate-200 dark:border-slate-800">
            <div
                className={`
           relative flex flex-col items-center justify-center w-full max-w-2xl 
           rounded-3xl p-12 transition-all
           ${isDragging ? 'scale-105 opacity-80' : ''}
         `}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleChange}
                />

                {loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-xl font-medium animate-pulse">Extracting Soul...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="rounded-full bg-white dark:bg-slate-800 p-6 shadow-xl ring-1 ring-slate-900/5">
                            <ImageIcon className="h-16 w-16 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-extrabold tracking-tight">Upload Inspiration</h3>
                            <p className="text-lg text-muted-foreground max-w-sm mx-auto">
                                Drag & drop an image or click to extract its color palette.
                            </p>
                        </div>
                        <Button size="lg" className="rounded-full px-8 font-bold" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="mr-2 h-5 w-5" /> Select Image
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
