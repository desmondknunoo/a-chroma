"use client";

import { GradientGenerator } from "@/components/gradient-generator";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StickyFooter } from "@/components/ui/sticky-footer";

export default function GradientPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-background">
            <SiteHeader />
            <main className="flex-1 relative pb-32">
                <GradientGenerator />
                <Link href="/">
                    <Button
                        variant="outline"
                        className="absolute top-6 left-6 z-10 shadow-lg"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>
            </main>
            <StickyFooter />
        </div>
    );
}
