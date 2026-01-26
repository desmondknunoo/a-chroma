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

            <main className="flex-1 relative pt-20 pb-32 px-6">
                <div className="mx-auto max-w-7xl">
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
