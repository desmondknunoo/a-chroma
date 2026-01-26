"use client";

import Image from "next/image";
import Link from "next/link";
import { GradientGenerator } from "@/components/gradient-maker";
import { SiteHeader } from "@/components/site-header";
import { StickyFooter } from "@/components/ui/sticky-footer";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function GradientPage() {
    return (
        <div className="min-h-screen bg-black relative flex flex-col">
            <SiteHeader />

            <main className="flex-1 relative z-10 w-full mb-20">
                <div className="relative pt-32 pb-12 w-full overflow-hidden">
                    {/* Background Image / Gradient */}
                    <div className="absolute inset-0 -z-10 h-[600px] w-full">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                        <img
                            src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop"
                            alt="Gradient Background"
                            className="w-full h-full object-cover opacity-60"
                        />
                    </div>

                    <div className="container mx-auto px-6 text-center">
                        <p className="text-lg font-light uppercase tracking-widest text-white/80 lg:text-xl mb-4">
                            Introducing
                        </p>

                        <h1 className="text-center text-6xl tracking-tighter text-white sm:text-8xl lg:text-9xl mb-6 font-bold">
                            Graaadients
                        </h1>
                        <p className="mx-auto max-w-lg text-center text-sm font-light text-slate-300 lg:text-lg">
                            Create abstract gradient elements and backgrounds for your amazing design projects.
                        </p>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href="/"
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="text-slate-500" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-white font-medium">
                                        Gradient Generator
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-20 relative z-20">
                    <GradientGenerator />
                </div>

                <p className="mt-12 text-center text-slate-500 text-sm font-medium">
                    All gradients are 100% free to use.
                </p>

            </main>

            <StickyFooter className="mt-auto" />
        </div>
    );
}
