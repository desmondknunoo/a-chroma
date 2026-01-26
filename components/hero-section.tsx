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
                    Generate a color palette <br /> in seconds!
                </h2>
                <div className="space-y-6 z-10 pt-20 flex justify-center items-center flex-col text-center px-6">
                    <p className="text-black w-full  max-w-2xl font-light text-sm md:text-xl">
                        Design your ideal palette in seconds or spark new ideas from a vast library of stunning color combinations.
                    </p>
                    <div className="flex gap-3 mt-6 flex-wrap justify-center">
                        {/* Start Generator - This should link to /generator now */}
                        <Link href="/generator">
                            <Button className="h-12 md:h-14 rounded-full cursor-pointer px-8 md:px-10">
                                Start Generator
                            </Button>
                        </Link>
                        <Button
                            variant={"secondary"}
                            className="h-12 md:h-14 cursor-pointer rounded-full px-8 md:px-10"
                        >
                            Get Started Explore
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
