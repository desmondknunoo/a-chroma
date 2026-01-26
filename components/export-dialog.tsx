"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useColorStore } from "@/lib/store";
import { useState } from "react";

export function ExportDialog() {
    const { colors } = useColorStore();
    const [copied, setCopied] = useState(false);

    const getCSSVars = () => {
        return `:root {
${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}
  /* Semantic Names */
${colors.map((c, i) => `  --${c.name?.toLowerCase().replace(/\s/g, '-') || `color-${i}`}: ${c.hex};`).join('\n')}
}`;
    };

    const getTailwindConfig = () => {
        return `module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
${colors.map((c, i) => `          ${i + 1}00: '${c.hex}',`).join('\n')}
        }
      }
    }
  }
}`;
    };

    const getJSON = () => {
        return JSON.stringify(colors.map(c => ({ name: c.name, hex: c.hex, oklch: c.value })), null, 2);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Export</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Export Palette</DialogTitle>
                    <DialogDescription>
                        Copy your palette in various formats for your project.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="css" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="css">CSS</TabsTrigger>
                        <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                        <TabsTrigger value="json">JSON</TabsTrigger>
                    </TabsList>

                    <TabsContent value="css" className="mt-4 space-y-4">
                        <div className="relative rounded-md bg-slate-950 p-4">
                            <pre className="overflow-x-auto text-sm text-slate-50">
                                {getCSSVars()}
                            </pre>
                            <Button
                                size="sm"
                                className="absolute right-2 top-2 h-8 w-8 p-0"
                                onClick={() => handleCopy(getCSSVars())}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="tailwind" className="mt-4 space-y-4">
                        <div className="relative rounded-md bg-slate-950 p-4">
                            <pre className="overflow-x-auto text-sm text-slate-50">
                                {getTailwindConfig()}
                            </pre>
                            <Button
                                size="sm"
                                className="absolute right-2 top-2 h-8 w-8 p-0"
                                onClick={() => handleCopy(getTailwindConfig())}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="json" className="mt-4 space-y-4">
                        <div className="relative rounded-md bg-slate-950 p-4">
                            <pre className="overflow-x-auto text-sm text-slate-50">
                                {getJSON()}
                            </pre>
                            <Button
                                size="sm"
                                className="absolute right-2 top-2 h-8 w-8 p-0"
                                onClick={() => handleCopy(getJSON())}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
