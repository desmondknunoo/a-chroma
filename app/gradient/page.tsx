"use client";

import Image from "next/image";
import Link from "next/link";
import { GradientGenerator } from "@/components/gradient-generator";
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
        <div className="flex min-h-screen flex-col overflow-hidden bg-background relative">
            <SiteHeader />

            {/* Background Image Container */}
            <div className="absolute top-0 left-0 w-full h-[600px] -z-10 bg-slate-900">
                <div className="relative w-full h-full">
                    <Image
                        src="https://res.cloudinary.com/deelfmnhg/image/upload/v1737474221/grad_mscerb.png"
                        alt="Gradient Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
                </div>
            </div>

            <main className="flex-1 relative pt-20 pb-32 px-6">
                <div className="mx-auto max-w-7xl">
                    {/* Header Section from Demo */}
                    <div className="text-center mb-12 text-white">
                        <p className="text-lg font-light uppercase tracking-widest text-slate-300 lg:text-xl mb-4">
                            Introducing
                        </p>
                        <h1 className="text-6xl tracking-tighter sm:text-8xl font-bold mb-6">
                            Graaadients
                        </h1>
                        <p className="mx-auto max-w-lg text-lg text-slate-200">
                            Generate 5-step brand scales or craft stunning abstract gradient backgrounds for your projects.
                        </p>
                    </div>

                    {/* Breadcrumbs */}
                    <div className="flex justify-center mb-10">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href="/"
                                        className="text-slate-300 hover:text-white"
                                    >
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="text-slate-300" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-white font-medium">
                                        Gradient Studio
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* The Generator Component */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        <GradientGenerator />
                    </div>

                    <p className="mt-8 text-center text-slate-500 font-medium">
                        All gradients are 100% free to use.
                    </p>
                </div>
            </main>

            <StickyFooter />
        </div>
    );
}
