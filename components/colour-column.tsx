"use client";

import { useColourStore, ColourItem } from "@/lib/store";
import { Lock, Unlock, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import chroma from "chroma-js";

interface ColourColumnProps {
    colour: ColourItem;
    index: number;
}

export function ColourColumn({ colour, index }: ColourColumnProps) {
    const { toggleLock, updateColour } = useColourStore();
    const [copied, setCopied] = useState(false);

    // Determine text color based on luminance for accessibility
    const luminance = chroma(colour.hex).luminance();
    const textColor = luminance > 0.5 ? "text-black" : "text-white";
    const iconColor = luminance > 0.5 ? "text-slate-800" : "text-slate-200";

    const handleCopy = () => {
        navigator.clipboard.writeText(colour.hex.toUpperCase());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleToggleLock = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering other clicks if necessary
        toggleLock(colour.id);
    };

    return (
        <div
            className="relative flex h-full w-full flex-col items-center justify-center transition-all duration-300 ease-in-out group"
            style={{ backgroundColor: colour.hex }}
        >
            {/* Mobile: Horizontal layout adjustments needed later, assumed flex-row for desktop for now */}

            {/* Tools Overlay - Visible on hover or when locked */}
            <div
                className={cn(
                    "absolute flex flex-col items-center gap-4 transition-opacity duration-200",
                    textColor,
                    "opacity-0 group-hover:opacity-100",
                    colour.locked && "opacity-100"
                )}
            >
                <button
                    onClick={handleToggleLock}
                    className={cn(
                        "rounded-full p-3 transition-colours hover:bg-white/20 active:scale-95",
                        colour.locked ? "opacity-100" : "opacity-70 hover:opacity-100"
                    )}
                    aria-label={colour.locked ? "Unlock colour" : "Lock colour"}
                >
                    {colour.locked ? (
                        <Lock className={cn("h-6 w-6", iconColor)} />
                    ) : (
                        <Unlock className={cn("h-6 w-6", iconColor)} />
                    )}
                </button>

                <button
                    onClick={handleCopy}
                    className="rounded-full p-3 opacity-0 transition-all hover:bg-white/20 active:scale-95 group-hover:opacity-100"
                    aria-label="Copy hex code"
                >
                    {copied ? (
                        <Check className={cn("h-6 w-6", iconColor)} />
                    ) : (
                        <Copy className={cn("h-6 w-6", iconColor)} />
                    )}
                </button>
            </div>

            {/* Hex Code Display */}
            <div className={cn("absolute bottom-20 text-2xl font-bold uppercase tracking-wider md:bottom-32", textColor)}>
                {colour.hex.replace("#", "")}
            </div>

            {/* Semantic Name (Placeholder for now) */}
            <div className={cn("absolute bottom-12 text-sm font-medium opacity-80 md:bottom-24", textColor)}>
                {colour.name || "Colour " + (index + 1)}
            </div>
        </div>
    );
}
