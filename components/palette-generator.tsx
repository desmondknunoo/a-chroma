"use client";

import { useEffect, useCallback } from "react";
import { useColorStore } from "@/lib/store";
import { ColorColumn } from "./color-column";
import { Loader2 } from "lucide-react";

export function PaletteGenerator() {
    const { colors, generatePalette } = useColorStore();

    // Initial generation on mount
    useEffect(() => {
        if (colors.length === 0) {
            generatePalette();
        }
    }, [colors.length, generatePalette]);

    // Spacebar listener
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // Don't trigger if user is typing in an input
            const target = e.target as HTMLElement;
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                return;
            }

            if (e.code === "Space") {
                e.preventDefault(); // Prevent scrolling
                generatePalette();
            }
        },
        [generatePalette]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (colors.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center bg-neutral-900 text-white">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <span className="ml-4 text-xl">Initializing ChromaFlow...</span>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-64px)] w-full flex-col md:flex-row">
            {colors.map((color, index) => (
                <ColorColumn key={color.id} color={color} index={index} />
            ))}
        </div>
    );
}
