"use client";

import { PaletteGenerator } from "@/components/palette-generator";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GeneratorPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-background">
            <SiteHeader />
            <main className="flex-1 relative">
                <PaletteGenerator />
                <Link href="/">
                    <Button
                        variant="outline"
                        className="absolute bottom-6 left-6 z-10 shadow-lg"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>
            </main>
        </div>
    );
}
