"use client";

import { GradientWave } from "@/components/ui/gradient-wave";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection01() {
    return (
        <div className="h-[80vh] w-full flex items-center justify-center relative overflow-hidden bg-white">
            {/* GradientWave behind the text */}
            <GradientWave
                colors={["#ffffff", "#fb7185", '#e879f9', "#a3e635", "#ffffff"]}
                shadowPower={4}
                darkenTop={false}
                noiseFrequency={[0.0001, 0.0002]}
                deform={{ incline: 0.2, noiseAmp: 100, noiseFlow: 2 }}
            />
            <div className="flex flex-col text-center relative z-10 max-w-5xl mx-auto px-4">
                {/* Placeholder for AI Logo if not available, using Pallete icon or Text */}
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-black/5 backdrop-blur-sm">
                    <span className="text-4xl">🎨</span>
                </div>

                <h2 className="font-extrabold text-slate-900 tracking-tighter text-6xl md:text-8xl lg:text-9xl leading-tight">
                    Design <br /> without Limits
                </h2>

                <div className="space-y-8 pt-12 flex justify-center items-center flex-col text-center">
                    <p className="text-slate-600 max-w-2xl font-medium text-lg md:text-2xl leading-relaxed">
                        Create the perfect palette or get inspired by thousands of beautiful color schemes.
                        The super fast color palettes generator.
                    </p>
                    <div className="flex gap-4 mt-6 flex-wrap justify-center">
                        <Link href="/generator">
                            <Button size="lg" className="h-14 rounded-full px-10 text-lg font-bold shadow-xl shadow-blue-500/20 bg-[#3384FF] hover:bg-[#2070e0] transition-transform hover:scale-105">
                                Start the Generator
                            </Button>
                        </Link>
                        <Button
                            variant={"secondary"}
                            className="h-14 rounded-full px-10 text-lg font-semibold bg-white/50 backdrop-blur-md border border-white/40 hover:bg-white/80"
                            onClick={() => alert("Exploring 10M+ Palettes (Coming Soon)")}
                        >
                            Explore 10M+ Palettes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
