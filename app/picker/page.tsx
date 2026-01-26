"use client";

import { ImageExtractor } from "@/components/image-extractor";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PickerPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-background">
            <SiteHeader />
            <main className="flex-1 relative">
                <ImageExtractor onComplete={() => router.push('/generator')} />
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
