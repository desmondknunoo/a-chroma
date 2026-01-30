"use client";

import Link from "next/link";
import { Menu, Palette, Sliders } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExportDialog } from "@/components/export-dialog";

import { usePathname } from "next/navigation";

export function SiteHeader() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isLegalPage = pathname === "/terms" || pathname === "/privacy" || pathname === "/about";

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Image src="/logo.png" alt="A-Chroma Logo" width={32} height={32} className="h-8 w-8" />
                    <span className="text-xl font-bold tracking-tight">A-Chroma</span>
                </Link>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center space-x-4">

                        {!isHome && !isLegalPage && <ExportDialog />}



                    </nav>
                </div>
            </div>
        </header>
    );
}
