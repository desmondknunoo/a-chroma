"use client"

import type React from "react"
import { Warp } from "@paper-design/shaders-react"
import { Sparkles, Image as ImageIcon, Layers, Zap } from "lucide-react"

interface Feature {
    title: string
    description: string
    icon: React.ReactNode
    number: string
}

const features: Feature[] = [
    {
        number: "1",
        title: "Spacebar Magic",
        description:
            "Generate balanced, high-fidelity palettes based on perceptually uniform OKLCH models. Secure the shades you love while our algorithm hunts for the perfect partners.",
        icon: <Sparkles className="w-12 h-12 text-white" />,
    },
    {
        number: "2",
        title: "Visual Extraction",
        description: "Bridge the gap between worlds. Analyze pixel data from any photograph to isolate dominant hues, distilling the atmosphere of the real world into brand kits.",
        icon: <ImageIcon className="w-12 h-12 text-white" />,
    },
    {
        number: "3",
        title: "Brand Scale Architecture",
        description: "Establish consistency with algorithmic tint and shade generation. Instantly deploy 5-step scales that ensure your design system maintains accessible contrast.",
        icon: <Layers className="w-12 h-12 text-white" />,
    },
    {
        number: "4",
        title: "Gradient Synthesis",
        description: "Move beyond flat design with our advanced gradient engine. Blend colours with granular control over noise and interpolation to create rich, textured backgrounds.",
        icon: <Zap className="w-12 h-12 text-white" />,
    },
]

export default function FeaturesCards() {
    const getShaderConfig = (index: number) => {
        // Brand theme colors - high saturation for vibrancy under overlay
        const configs = [
            {
                proportion: 0.3,
                softness: 0.8,
                distortion: 0.15,
                swirl: 0.6,
                swirlIterations: 8,
                shape: "checks" as const,
                shapeScale: 0.08,
                colors: ["#00B4B8", "#00E5E9", "#40F0F4", "#80F7F9"], // Vibrant Cyan
            },
            {
                proportion: 0.4,
                softness: 1.2,
                distortion: 0.2,
                swirl: 0.9,
                swirlIterations: 12,
                shape: "stripes" as const,
                shapeScale: 0.12,
                colors: ["#6B30D8", "#8850F0", "#A070FF", "#B890FF"], // Vibrant Purple
            },
            {
                proportion: 0.35,
                softness: 0.9,
                distortion: 0.18,
                swirl: 0.7,
                swirlIterations: 10,
                shape: "checks" as const,
                shapeScale: 0.1,
                colors: ["#E88C00", "#FFA800", "#FFBE30", "#FFD060"], // Vibrant Orange
            },
            {
                proportion: 0.45,
                softness: 1.1,
                distortion: 0.22,
                swirl: 0.8,
                swirlIterations: 15,
                shape: "edge" as const,
                shapeScale: 0.09,
                colors: ["#7B20C0", "#9040E0", "#00D0D4", "#A060F0"], // Vibrant Purple-Cyan
            },
        ]
        return configs[index % configs.length]
    }

    return (
        <section className="py-32 px-6 border-y border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">A-Chroma Suite</span>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6">
                        Precision Meets Intuition
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        Eliminating the friction between a creative spark and a finalized visual identity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const shaderConfig = getShaderConfig(index)
                        return (
                            <div key={index} className="relative h-[480px] group transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-xl">
                                    {/* Background Shader */}
                                    <Warp
                                        style={{ height: "100%", width: "100%" }}
                                        proportion={shaderConfig.proportion}
                                        softness={shaderConfig.softness}
                                        distortion={shaderConfig.distortion}
                                        swirl={shaderConfig.swirl}
                                        swirlIterations={shaderConfig.swirlIterations}
                                        shape={shaderConfig.shape}
                                        shapeScale={shaderConfig.shapeScale}
                                        scale={1}
                                        rotation={0}
                                        speed={0.8}
                                        colors={shaderConfig.colors}
                                    />
                                    {/* Subtle grey overlay */}
                                    <div className="absolute inset-0 bg-black/25" />
                                </div>

                                <div className="relative z-10 p-8 rounded-[2rem] h-full flex flex-col bg-white/20 backdrop-blur-sm border border-white/30">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="filter drop-shadow-lg p-3 bg-white/30 rounded-2xl backdrop-blur-md">{feature.icon}</div>
                                        <span className="text-2xl font-bold text-white/50 font-mono">0{feature.number}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-white leading-tight drop-shadow-md">{feature.title}</h3>

                                    <p className="leading-relaxed flex-grow text-white font-medium text-sm drop-shadow-sm">{feature.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="pt-16 text-center">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">
                        The foundational pillar of the Achendo Suite
                    </p>
                </div>
            </div>
        </section>
    )
}
