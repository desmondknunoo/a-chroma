import { Download, FileJson, FileCode, FileImage, FileType, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useColorStore } from "@/lib/store";
import { useState } from "react";
import jsPDF from "jspdf";

interface ExportDialogProps {
    colors?: { hex: string; name?: string; value?: string; id?: string; locked?: boolean }[];
    trigger?: React.ReactNode;
    paletteName?: string;
}

export function ExportDialog({ colors: overrideColors, trigger, paletteName }: ExportDialogProps = {}) {
    const { colors: storeColors } = useColorStore();
    const colors = overrideColors || storeColors;
    const [copied, setCopied] = useState<string | null>(null);

    // --- Formats ---

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

    const getJSON = () => JSON.stringify(colors.map(c => ({ name: c.name, hex: c.hex, oklch: c.value })), null, 2);

    const getSVG = () => {
        const width = 1000;
        const height = 200;
        const barWidth = width / colors.length;

        const rects = colors.map((c, i) =>
            `<rect x="${i * barWidth}" y="0" width="${barWidth}" height="${height}" fill="${c.hex}" />`
        ).join('');

        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${rects}</svg>`;
    };

    // --- Actions ---

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const height = 297;
        const barHeight = 40;

        doc.setFontSize(24);
        doc.text(paletteName ? `A-Chroma: ${paletteName}` : "A-Chroma Palette", 10, 20);

        colors.forEach((c, i) => {
            const y = 40 + (i * 45);
            doc.setFillColor(c.hex);
            doc.rect(10, y, 50, barHeight, 'F');

            doc.setFontSize(14);
            doc.text(c.name || 'Color', 70, y + 15);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(c.hex.toUpperCase(), 70, y + 25);
            doc.text(c.value || '', 70, y + 32);
        });

        // Watermark
        const watermarkText = "Generated with A-Chroma on achendo.com/a-chroma";
        doc.setFontSize(12);
        doc.setTextColor(150);
        doc.textWithLink(watermarkText, 10, height - 10, { url: "https://achendo.com/a-chroma" });

        const filename = paletteName ? `A-Chroma - ${paletteName}.pdf` : `A-Chroma - Palette.pdf`;
        doc.save(filename);
    };

    const downloadSVG = () => {
        const blob = new Blob([getSVG()], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'palette.svg';
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadImage = (type: 'png' | 'jpeg') => {
        const canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 350; // Extra space for names and footer
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = 1000 / colors.length;

        colors.forEach((c, i) => {
            // Color Bar
            ctx.fillStyle = c.hex;
            ctx.fillRect(i * barWidth, 0, barWidth, 200);

            // Text
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(c.name || '', i * barWidth + barWidth / 2, 240);

            ctx.font = '14px monospace';
            ctx.fillStyle = '#666666';
            ctx.fillText(c.hex.toUpperCase(), i * barWidth + barWidth / 2, 265);
        });

        // Watermark
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#999999';
        ctx.textAlign = 'center';
        ctx.fillText("Generated with A-Chroma on achendo.com/a-chroma", canvas.width / 2, 330);

        const link = document.createElement('a');
        const filename = paletteName ? `A-Chroma - ${paletteName}.${type}` : `A-Chroma - Palette.${type}`;
        link.download = filename;
        link.href = canvas.toDataURL(`image/${type}`);
        link.click();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Export Palette</DialogTitle>
                    <DialogDescription>
                        Download your palette in various formats or copy code.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="code">Code (CSS/JSON)</TabsTrigger>
                        <TabsTrigger value="file">Files (Images/PDF)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="code" className="space-y-4 pt-4">
                        <div className="grid grid-cols-3 gap-2">
                            <Button variant="secondary" onClick={() => handleCopy(getCSSVars(), 'css')} className="justify-start">
                                {copied === 'css' ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <FileCode className="mr-2 h-4 w-4" />}
                                {copied === 'css' ? 'Copied!' : 'Copy CSS'}
                            </Button>
                            <Button variant="secondary" onClick={() => handleCopy(getTailwindConfig(), 'tailwind')} className="justify-start">
                                {copied === 'tailwind' ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <FileType className="mr-2 h-4 w-4" />}
                                {copied === 'tailwind' ? 'Copied!' : 'Copy Tailwind'}
                            </Button>
                            <Button variant="secondary" onClick={() => handleCopy(getJSON(), 'json')} className="justify-start">
                                {copied === 'json' ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <FileJson className="mr-2 h-4 w-4" />}
                                {copied === 'json' ? 'Copied!' : 'Copy JSON'}
                            </Button>
                        </div>

                        <div className="relative rounded-md bg-slate-950 p-4">
                            <pre className="h-48 overflow-auto text-xs text-slate-50 font-mono scrollbar-thin">
                                {getCSSVars()}
                            </pre>
                        </div>
                    </TabsContent>

                    <TabsContent value="file" className="grid grid-cols-2 gap-4 pt-4">
                        <Button variant="outline" className="h-32 flex-col gap-2 hover:bg-slate-50 border-2" onClick={() => downloadImage('png')}>
                            <FileImage className="h-8 w-8 text-blue-500" />
                            <span className="font-bold">PNG Image</span>
                        </Button>

                        <Button variant="outline" className="h-32 flex-col gap-2 hover:bg-slate-50 border-2" onClick={() => downloadImage('jpeg')}>
                            <FileImage className="h-8 w-8 text-indigo-500" />
                            <span className="font-bold">JPEG Image</span>
                        </Button>

                        <Button variant="outline" className="h-32 flex-col gap-2 hover:bg-slate-50 border-2" onClick={downloadPDF}>
                            <FileType className="h-8 w-8 text-red-500" />
                            <span className="font-bold">PDF Report</span>
                        </Button>

                        <Button variant="outline" className="h-32 flex-col gap-2 hover:bg-slate-50 border-2" onClick={downloadSVG}>
                            <FileCode className="h-8 w-8 text-orange-500" />
                            <span className="font-bold">SVG Vector</span>
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
