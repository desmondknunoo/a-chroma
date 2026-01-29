


import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Brand Scale Generator",
};

import { BrandScaleGenerator } from "@/components/brand-scale-generator";
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

export default function BrandScalePage() {
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
                                        Brand Scale Generator
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="text-center space-y-4 mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            Brand Scale Generator
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Create consistent color scales for your design system. Upload an image to extract a palette or pick colors manually.
                        </p>
                    </div>

                    {/* The Generator Component */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden p-8">
                        <BrandScaleGenerator />
                    </div>
                </div>
            </main>

            <StickyFooter />
        </div>
    );
}
