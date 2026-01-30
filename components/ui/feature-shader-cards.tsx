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
        // 0: Cyan/Teal (Spacebar Magic)
        // 1: Purple (Visual Extraction)
        // 2: Fuchsia/Pink (Brand Scale)
        // 3: Orange/Yellow (Gradient Synthesis)

        // Using HSL strings as per the library requirement
        const configs = [
            {
                proportion: 0.3,
                softness: 0.8,
                distortion: 0.15,
                swirl: 0.6,
                swirlIterations: 8,
                shape: "checks" as const,
                shapeScale: 0.08,
                colors: ["hsl(180, 100%, 30%)", "hsl(190, 100%, 60%)", "hsl(200, 90%, 40%)", "hsl(170, 100%, 70%)"], // Cyan
            },
            {
                proportion: 0.4,
                softness: 1.2,
                distortion: 0.2,
                swirl: 0.9,
                swirlIterations: 12,
                shape: "dots" as const,
                shapeScale: 0.12,
                colors: ["hsl(270, 100%, 25%)", "hsl(280, 100%, 65%)", "hsl(260, 90%, 35%)", "hsl(290, 100%, 75%)"], // Purple
            },
            {
                proportion: 0.35,
                softness: 0.9,
                distortion: 0.18,
                swirl: 0.7,
                swirlIterations: 10,
                shape: "checks" as const,
                shapeScale: 0.1,
                colors: ["hsl(300, 100%, 25%)", "hsl(315, 100%, 60%)", "hsl(290, 90%, 30%)", "hsl(310, 100%, 70%)"], // Fuchsia/Pink
            },
            {
                proportion: 0.45,
                softness: 1.1,
                distortion: 0.22,
                swirl: 0.8,
                swirlIterations: 15,
                shape: "dots" as const,
                shapeScale: 0.09,
                colors: ["hsl(30, 100%, 35%)", "hsl(45, 100%, 65%)", "hsl(20, 90%, 40%)", "hsl(40, 100%, 75%)"], // Orange
            },
        ]
        return configs[index % configs.length]
    }

    return (
        <section className="py-32 px-6 border-y border-slate-100 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight">
                        A-Chroma: Precision Meets Intuition
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-semibold uppercase tracking-widest text-sm">
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
                                    {/* Dark overlay for contrast */}
                                    <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
                                </div>

                                <div className="relative z-10 p-8 rounded-[2rem] h-full flex flex-col border border-white/10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="filter drop-shadow-lg p-3 bg-white/10 rounded-2xl backdrop-blur-md">{feature.icon}</div>
                                        <span className="text-2xl font-bold text-white/20 font-mono">0{feature.number}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-white leading-tight">{feature.title}</h3>

                                    <p className="leading-relaxed flex-grow text-gray-200 font-medium text-sm">{feature.description}</p>
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
