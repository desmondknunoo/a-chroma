"use client";

import { useState } from "react";
import { PaletteGenerator } from "@/components/palette-generator";
import { SiteHeader } from "@/components/site-header";
import { ImageExtractor } from "@/components/image-extractor";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sandbox } from "@/components/sandbox";
import { ArrowLeft, Sparkles, Image as ImageIcon, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";

type ViewState = "home" | "generator" | "extractor";

export default function Home() {
  const [view, setView] = useState<ViewState>("home");

  // If in a sub-view, show a back navigation or specific header
  if (view === "generator") {
    return (
      <div className="flex min-h-screen flex-col overflow-hidden bg-background">
        <SiteHeader />
        <main className="flex-1 relative">
          <PaletteGenerator />
          <Button
            variant="outline"
            className="absolute bottom-6 left-6 z-10 shadow-lg"
            onClick={() => setView("home")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </main>
      </div>
    );
  }

  if (view === "extractor") {
    return (
      <div className="flex min-h-screen flex-col overflow-hidden bg-background">
        <SiteHeader />
        <main className="flex-1 relative">
          <ImageExtractor onComplete={() => setView("generator")} />
          <Button
            variant="outline"
            className="absolute bottom-6 left-6 z-10 shadow-lg"
            onClick={() => setView("home")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center p-6 md:p-24">
        <div className="max-w-3xl text-center space-y-6 mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            A-Chroma
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The next-generation color suite. Generate perfect harmonies, extract souls from images, and preview in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Card 1: Generator */}
          <div
            className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            onClick={() => setView("generator")}
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Spacebar Magic</h3>
            <p className="text-muted-foreground">
              Generate infinite palettes with our smart OKLCH engine. Lock colors and find perfect harmonies.
            </p>
          </div>

          {/* Card 2: Image Extractor */}
          <div
            className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            onClick={() => setView("extractor")}
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Image Extraction</h3>
            <p className="text-muted-foreground">
              Upload any photo to extract its soul. We'll find the dominant vibes and build a palette.
            </p>
          </div>

          {/* Card 3: Preview (Opens Sheet directly) */}
          <Sheet>
            <SheetTrigger asChild>
              <div
                className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Live Sandbox</h3>
                <p className="text-muted-foreground">
                  Don't guess—preview. See your colors on a real landing page, dashboard, and gradient mesh.
                </p>
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[90vw] sm:w-[540px] md:w-[700px] overflow-hidden p-0">
              <div className="h-full overflow-y-auto pb-20">
                <Sandbox />
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </main>
    </div>
  );
}
