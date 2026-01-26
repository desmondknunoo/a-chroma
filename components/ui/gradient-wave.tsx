"use client";

import { useEffect, useRef } from "react";

interface GradientWaveProps {
    colors: string[];
    shadowPower?: number;
    darkenTop?: boolean;
    noiseFrequency?: number[];
    deform?: { incline: number; noiseAmp: number; noiseFlow: number };
}

export function GradientWave({
    colors,
}: GradientWaveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animeId: number;
        let t = 0;

        const render = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Simple approximated wave effect using multiple gradients
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

            colors.forEach((c, i) => {
                gradient.addColorStop(i / (colors.length - 1), c);
            });

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add some "noise" or movement
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "rgba(255,255,255,0.1)";

            for (let i = 0; i < 5; i++) {
                const y = Math.sin(t * 0.002 + i) * 100 + canvas.height / 2;
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2 + Math.cos(t * 0.001) * 200, y, 300, 100, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            t++;
            animeId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animeId);
    }, [colors]);

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
