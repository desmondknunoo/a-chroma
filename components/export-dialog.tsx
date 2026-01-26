import { Copy, Download, FileJson, FileCode, FileImage, FileType } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useColorStore } from "@/lib/store";
import { useState } from "react";
import jsPDF from "jspdf";

export function ExportDialog() {
    const { colors } = useColorStore();
    const [copied, setCopied] = useState(false);

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

        let rects = colors.map((c, i) =>
            `<rect x="${i * barWidth}" y="0" width="${barWidth}" height="${height}" fill="${c.hex}" />`
        ).join('');

        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${rects}</svg>`;
    };

    // --- Actions ---

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const cleanName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const downloadPDF = () => {
        const doc = new jsPDF();
        const width = 210; // A4 width mm
        const height = 297;
        const barHeight = 40;

        doc.setFontSize(24);
        doc.text("A-Chroma Palette", 10, 20);

        colors.forEach((c, i) => {
            const y = 40 + (i * 45);
            doc.setFillColor(c.hex);
            doc.rect(10, y, 50, barHeight, 'F');

            doc.setFontSize(14);
            doc.text(c.name || 'Color', 70, y + 15);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(c.hex.toUpperCase(), 70, y + 25);
            doc.text(c.value, 70, y + 32);
        });

        doc.save('palette.pdf');
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
        canvas.height = 300; // Extra space for names
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const barWidth = 1000 / colors.length;

        colors.forEach((c, i) => {
            // Color Bar
            ctx.fillStyle = c.hex;
            ctx.fillRect(i * barWidth, 0, barWidth, 200);

            // Info Area
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(i * barWidth, 200, barWidth, 100);

            // Text
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(c.name || '', i * barWidth + barWidth / 2, 240);

            ctx.font = '14px monospace';
            ctx.fillStyle = '#666666';
            ctx.fillText(c.hex.toUpperCase(), i * barWidth + barWidth / 2, 265);
        });

        const link = document.createElement('a');
        link.download = `palette.${type}`;
        link.href = canvas.toDataURL(`image/${type}`);
        link.click();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Export
                </Button>
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
                            <Button variant="secondary" onClick={() => handleCopy(getCSSVars())} className="justify-start">
                                <FileCode className="mr-2 h-4 w-4" /> Copy CSS
                            </Button>
                            <Button variant="secondary" onClick={() => handleCopy(getTailwindConfig())} className="justify-start">
                                <FileType className="mr-2 h-4 w-4" /> Copy Tailwind
                            </Button>
                            <Button variant="secondary" onClick={() => handleCopy(getJSON())} className="justify-start">
                                <FileJson className="mr-2 h-4 w-4" /> Copy JSON
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
