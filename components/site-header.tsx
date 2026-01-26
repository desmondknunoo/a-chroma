"use client";

import Link from "next/link";
import { Menu, Palette, Sliders, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sandbox } from "@/components/sandbox";
import { ExportDialog } from "@/components/export-dialog";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Palette className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">ChromaFlow</span>
                </Link>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center space-x-4">
                        <div className="hidden text-sm text-muted-foreground md:block">
                            Press Spacebar to Generate
                        </div>
                        <ExportDialog />
                        <Button variant="ghost" size="icon" aria-label="Adjust Palette" title="Adjust (Coming Soon)">
                            <Sliders className="h-5 w-5" />
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Preview Sandbox" title="Live Preview">
                                    <Eye className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[90vw] sm:w-[540px] md:w-[700px] overflow-hidden p-0">
                                <SheetHeader className="px-6 py-4 border-b">
                                    <SheetTitle>Live Preview</SheetTitle>
                                    <SheetDescription>See your colors in action.</SheetDescription>
                                </SheetHeader>
                                <div className="h-full pb-20 overflow-y-auto">
                                    <Sandbox />
                                </div>
                            </SheetContent>
                        </Sheet>

                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
