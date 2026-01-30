"use client";

import { useState, useEffect, useCallback } from "react";
import { useColorStore } from "@/lib/store";
import { ColorColumn } from "./color-column";
import { Loader2, Image as ImageIcon, X } from "lucide-react";
import { ImageExtractor } from "./image-extractor";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export function PaletteGenerator() {
    const { colors, generatePalette } = useColorStore();
    const [showExtractor, setShowExtractor] = useState(false);

    // Initial generation on mount
    useEffect(() => {
        if (colors.length === 0) {
            generatePalette();
        }
    }, [colors.length, generatePalette]);


    if (colors.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center bg-neutral-900 text-white">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <span className="ml-4 text-xl">Initializing A-Chroma...</span>
            </div>
        );
    }

    return (
        <div className="relative h-[calc(100vh-64px)] w-full">
            {/* Toolbar / Action Button */}
            <div className="absolute bottom-6 right-6 z-50 flex gap-2">
                <Dialog open={showExtractor} onOpenChange={setShowExtractor}>
                    <DialogTrigger asChild>
                        <Button
                            size="lg"
                            className="h-14 rounded-full px-6 shadow-2xl font-bold bg-white text-black hover:bg-slate-100 border-2 border-slate-900/10"
                        >
                            <ImageIcon className="mr-2 h-5 w-5" />
                            Extract from Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-0 bg-transparent shadow-none">
                        <DialogHeader className="sr-only">
                            <DialogTitle>Image Extractor</DialogTitle>
                        </DialogHeader>
                        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative">
                            <div className="absolute top-4 right-4 z-10">
                                <Button size="icon" variant="ghost" className="rounded-full bg-white/50 backdrop-blur hover:bg-white" onClick={() => setShowExtractor(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <ImageExtractor onComplete={() => setShowExtractor(false)} />
                        </div>
                    </DialogContent>
                </Dialog>

                <Button
                    size="lg"
                    className="h-14 rounded-full px-6 shadow-2xl font-bold bg-slate-900 text-white hover:bg-slate-800"
                    onClick={generatePalette}
                >
                    <Loader2 className="mr-2 h-5 w-5" />
                    Generate
                </Button>
            </div>

            <div className="flex h-full w-full flex-col md:flex-row">
                {colors.map((color, index) => (
                    <ColorColumn key={color.id} color={color} index={index} />
                ))}
            </div>
        </div>
    );
}
