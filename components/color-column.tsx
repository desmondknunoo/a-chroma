"use client";

import { useColorStore, ColorItem } from "@/lib/store";
import { Lock, Unlock, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import chroma from "chroma-js";

interface ColorColumnProps {
    color: ColorItem;
    index: number;
}

export function ColorColumn({ color, index }: ColorColumnProps) {
    const { toggleLock, updateColor } = useColorStore();
    const [copied, setCopied] = useState(false);

    // Determine text color based on luminance for accessibility
    const luminance = chroma(color.hex).luminance();
    const textColor = luminance > 0.5 ? "text-black" : "text-white";
    const iconColor = luminance > 0.5 ? "text-slate-800" : "text-slate-200";

    const handleCopy = () => {
        navigator.clipboard.writeText(color.hex.toUpperCase());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleToggleLock = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering other clicks if necessary
        toggleLock(color.id);
    };

    return (
        <div
            className="relative flex h-full w-full flex-col items-center justify-center transition-all duration-300 ease-in-out group"
            style={{ backgroundColor: color.hex }}
        >
            {/* Mobile: Horizontal layout adjustments needed later, assumed flex-row for desktop for now */}

            {/* Tools Overlay - Visible on hover or when locked */}
            <div
                className={cn(
                    "absolute flex flex-col items-center gap-4 transition-opacity duration-200",
                    textColor,
                    "opacity-0 group-hover:opacity-100",
                    color.locked && "opacity-100"
                )}
            >
                <button
                    onClick={handleToggleLock}
                    className={cn(
                        "rounded-full p-3 transition-colors hover:bg-white/20 active:scale-95",
                        color.locked ? "opacity-100" : "opacity-70 hover:opacity-100"
                    )}
                    aria-label={color.locked ? "Unlock colour" : "Lock colour"}
                >
                    {color.locked ? (
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
                {color.hex.replace("#", "")}
            </div>

            {/* Semantic Name (Placeholder for now) */}
            <div className={cn("absolute bottom-12 text-sm font-medium opacity-80 md:bottom-24", textColor)}>
                {color.name || "Colour " + (index + 1)}
            </div>
        </div>
    );
}
