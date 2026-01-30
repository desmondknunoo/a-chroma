"use client";

import { GradientWave } from "@/components/ui/gradient-wave";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection01() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative">
            {/* GradientWave behind the text */}
            <GradientWave
                colors={["#ffffff", "#fb7185", '#e879f9', "#a3e635", "#ffffff"]}
                shadowPower={4}
                darkenTop={false}
                noiseFrequency={[0.0001, 0.0002]}
                deform={{ incline: 0.2, noiseAmp: 100, noiseFlow: 2 }}
            />
            <div className="flex flex-col text-center">
                {/* Using a placeholder or emoji since the user-provided image URL might be broken or external. 
            The user wants the code *exactly* as provided, but I should probably guard the image or use a local one.
            I will use the exact code but add error handling or just use it as is. 
            Actually, the user said "Copy-paste this component". I will adhere to that strictly.
        */}
                <h2 className="font-extrabold pt-10 text-black mix-blend-overlay tracking-tighter text-6xl md:text-7xl lg:text-8xl leading-none">
                    Generate a colour palette <br /> in seconds!
                </h2>
                <div className="space-y-6 z-10 pt-20 flex justify-center items-center flex-col text-center px-6">
                    <p className="text-black w-full  max-w-3xl font-light text-sm md:text-xl leading-relaxed">
                        Instantly craft your perfect palette, or ignite your creativity with our extensive library of professionally curated colour harmonies.
                    </p>
                    <div className="flex gap-4 mt-8 flex-wrap justify-center">
                        {/* Start Generator - Primary CTA (Cyan Theme) */}
                        <Link href="/generator">
                            <Button
                                size="lg"
                                className="h-14 md:h-16 rounded-full cursor-pointer px-10 md:px-12 text-base md:text-lg font-bold bg-[#4EC7CB] hover:bg-[#3EA7AB] text-white shadow-2xl shadow-[#4EC7CB]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Start Generator
                            </Button>
                        </Link>
                        {/* Create Gradient - Secondary CTA (Orange/Purple Theme) */}
                        <Link href="/gradient">
                            <Button
                                variant="outline"
                                className="h-14 md:h-16 cursor-pointer rounded-full px-10 md:px-12 text-base md:text-lg font-bold border-2 border-[#EFA128] bg-white/80 backdrop-blur-sm text-[#EFA128] hover:bg-gradient-to-r hover:from-[#EFA128] hover:to-[#8365C5] hover:text-white hover:border-transparent shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                                Create Gradient
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
