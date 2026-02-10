import { Download, FileJson, FileCode, FileImage, FileType, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useColourStore } from "@/lib/store";
import { useState } from "react";
import jsPDF from "jspdf";

interface ColourItem {
    hex: string;
    name?: string;
    value?: string;
    id?: string;
    locked?: boolean;
}

interface ExportDialogProps {
    colours?: ColourItem[];
    groups?: { name: string; colours: ColourItem[] }[];
    trigger?: React.ReactNode;
    paletteName?: string;
    allowedFileTypes?: ('png' | 'jpeg' | 'pdf' | 'svg')[];
}

export function ExportDialog({ colours: overrideColours, groups: overrideGroups, trigger, paletteName, allowedFileTypes }: ExportDialogProps = {}) {
    const { colours: storeColours } = useColourStore();

    // Normalize data into groups
    const groups = overrideGroups || [
        { name: "Palette", colours: overrideColours || storeColours }
    ];

    // Flatten for simple counts or legacy access if needed, though we should use groups primarily
    const allColours = groups.flatMap(g => g.colours);

    const [copied, setCopied] = useState<string | null>(null);

    // --- Formats ---

    const getCSSVars = () => {
        let scss = `:root {\n`;
        groups.forEach(group => {
            scss += `  /* ${group.name} */\n`;
            group.colours.forEach((c, i) => {
                const safeName = c.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || `color-${i}`;
                scss += `  --${safeName}: ${c.hex};\n`;
            });
            scss += `\n`;
        });
        scss += `}`;
        return scss;
    };

    const getTailwindConfig = () => {
        let config = `module.exports = {\n  theme: {\n    extend: {\n      colours: {\n`;

        groups.forEach(group => {
            const groupSlug = group.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            config += `        // ${group.name}\n`;
            config += `        ${groupSlug}: {\n`;
            group.colours.forEach((c, i) => {
                const nameKey = (c.name?.toLowerCase().match(/^[a-z0-9]+$/) ? c.name.toLowerCase() : undefined) || (i + 1) * 100;
                config += `          '${nameKey}': '${c.hex}',\n`;
            });
            config += `        },\n`;
        });

        config += `      }\n    }\n  }\n}`;
        return config;
    };

    const getJSON = () => {
        const data = groups.length === 1 && groups[0].name === "Palette"
            ? groups[0].colours.map(c => ({ name: c.name, hex: c.hex, oklch: c.value }))
            : groups.map(g => ({
                group: g.name,
                colours: g.colours.map(c => ({ name: c.name, hex: c.hex, oklch: c.value }))
            }));
        return JSON.stringify(data, null, 2);
    };

    const getSVG = () => {
        const width = 1000;
        const totalColors = allColors.length;
        // Simple SVG just shows all colours in a row for now, or we could stack rows.
        // For simplicity let's keep it as flat bar but maybe segmented?
        // Let's stick to flat bar of ALL colours for the simple SVG export.

        const height = 200;
        const barWidth = width / totalColors;

        const rects = allColors.map((c, i) =>
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
        // A4 size: 210mm x 297mm
        // Let's create a layout that handles groups vertically.

        let y = 20;

        doc.setFontSize(24);
        doc.text(paletteName ? `A-Chroma: ${paletteName}` : "A-Chroma Palette", 10, y);
        y += 10;

        // Watermark function
        const addWatermark = () => {
            const watermarkText = "Generated with A-Chroma by achendo.com";
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.textWithLink(watermarkText, 10, 287, { url: "https://achendo.com/" });
            doc.setTextColor(0); // Reset
        };

        addWatermark();

        groups.forEach((group) => {
            // Check for page break
            if (y > 250) {
                doc.addPage();
                y = 20;
                addWatermark();
            }

            // Group Title
            if (groups.length > 1) {
                y += 10;
                doc.setFontSize(14);
                doc.setFont("helvetica", 'bold');
                doc.text(group.name, 10, y);
                doc.setFont("helvetica", 'normal');
                y += 10;
            }



            // Grid layout for colours? Or list?
            // Let's do a compact list or 2-column if many colours
            // Simple list for daily color (which has ~35 colours total with vars) - might trigger many pages.
            // Let's do 2 columns

            const colWidth = 90;

            group.colours.forEach((c, i) => {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                    addWatermark();
                }

                const col = i % 2;
                const x = 10 + (col * colWidth);

                // Draw color box
                doc.setFillColor(c.hex);
                doc.rect(x, y, 15, 15, 'F');

                // Text details
                doc.setFontSize(11);
                doc.text(c.name || 'Colour', x + 20, y + 6);

                doc.setFontSize(9);
                doc.setTextColor(100);
                doc.text(`${c.hex.toUpperCase()}`, x + 20, y + 13);
                doc.setTextColor(0);

                if (col === 1) {
                    y += 20;
                }
            });
            // If ended on left column, move down for next group
            if (group.colours.length % 2 !== 0) {
                y += 20;
            }
        });

        const filename = paletteName ? `A-Chroma - ${paletteName}.pdf` : `A-Chroma - Palette.pdf`;
        doc.save(filename);
    };

    const downloadImage = (type: 'png' | 'jpeg') => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Calculate needed height
        // Header: 100px
        // For each group:
        //   Title: 60px
        //   Rows of colours: Math.ceil(colours.length / 5) * 120px (Grid 5 wide)
        // Footer: 60px

        const width = 1200;
        const cols = 5;
        const boxHeight = 220; // Increased form 140
        const boxWidth = width / cols;
        const headerHeight = 160; // Increased from 120
        const groupTitleHeight = 100; // Increased
        const footerHeight = 100; // Increased

        let totalHeight = headerHeight + footerHeight;
        groups.forEach(g => {
            if (groups.length > 1) totalHeight += groupTitleHeight;
            const rows = Math.ceil(g.colours.length / cols);
            totalHeight += rows * boxHeight;
        });

        canvas.width = width;
        canvas.height = totalHeight;

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Header
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(paletteName || "A-Chroma Palette", 60, 90);

        let y = headerHeight;

        groups.forEach(group => {
            if (groups.length > 1) {
                // Group Title
                ctx.fillStyle = '#333333';
                ctx.font = 'bold 36px sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(group.name, 60, y - 40);
                y += 0;
            }

            group.colours.forEach((c, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const x = col * boxWidth;
                const currentY = y + (row * boxHeight);

                // Draw Swatch
                ctx.fillStyle = c.hex;
                // Rect with padding - increased padding
                ctx.fillRect(x + 20, currentY, boxWidth - 40, 120);

                // Text
                ctx.fillStyle = '#000000';
                ctx.font = 'bold 18px sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(c.name || '', x + 20, currentY + 160);

                ctx.font = '16px monospace';
                ctx.fillStyle = '#666666';
                ctx.fillText(c.hex.toUpperCase(), x + 20, currentY + 190);
            });

            const rows = Math.ceil(group.colours.length / cols);
            y += (rows * boxHeight) + (groups.length > 1 ? groupTitleHeight : 0);
        });

        // Watermark
        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#999999';
        ctx.textAlign = 'center';
        ctx.fillText("Generated with A-Chroma by achendo.com", width / 2, canvas.height - 30);

        const link = document.createElement('a');
        const filename = paletteName ? `A-Chroma - ${paletteName}.${type}` : `A-Chroma - Palette.${type}`;
        link.download = filename;
        const dataURL = canvas.toDataURL(`image/${type}`);
        link.href = dataURL;
        link.click();
    };

    const downloadSVG = () => {
        const svgContent = getSVG();
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = paletteName ? `A-Chroma - ${paletteName}.svg` : `A-Chroma - Palette.svg`;
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
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
            <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Export Palette</DialogTitle>
                    <DialogDescription>
                        Download your palette in various formats or copy code.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="code" className="w-full h-full flex flex-col">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="code">Code (CSS/JSON)</TabsTrigger>
                        <TabsTrigger value="file">Files (Images/PDF)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="code" className="space-y-4 pt-4 flex-1 flex flex-col min-h-0">
                        <div className="grid grid-cols-3 gap-2 flex-none">
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

                        <div className="relative rounded-md bg-slate-950 p-4 flex-1 overflow-auto">
                            <pre className="text-xs text-slate-50 font-mono scrollbar-thin whitespace-pre">
                                {getCSSVars()}
                            </pre>
                        </div>
                    </TabsContent>

                    <TabsContent value="file" className="grid grid-cols-2 gap-2 pt-4">
                        {(!allowedFileTypes || allowedFileTypes.includes('png')) && (
                            <Button variant="outline" className="h-32 flex-col gap-2 hover:bg-slate-50 border-2" onClick={() => downloadImage('png')}>
                                <FileImage className="h-8 w-8 text-blue-500" />
                                <span className="font-bold">PNG Image</span>
                            </Button>
                        )}

                        {(!allowedFileTypes || allowedFileTypes.includes('jpeg')) && (
                            <Button variant="outline" className="h-32 flex-col gap-2 hover:bg-slate-50 border-2" onClick={() => downloadImage('jpeg')}>
                                <FileImage className="h-8 w-8 text-indigo-500" />
                                <span className="font-bold">JPEG Image</span>
                            </Button>
                        )}

                        {(!allowedFileTypes || allowedFileTypes.includes('pdf')) && (
                            <Button variant="outline" className="h-32 flex-col gap-2 hover:bg-slate-50 border-2" onClick={downloadPDF}>
                                <FileType className="h-8 w-8 text-red-500" />
                                <span className="font-bold">PDF Report</span>
                            </Button>
                        )}

                        {(!allowedFileTypes || allowedFileTypes.includes('svg')) && (
                            <Button variant="outline" className="h-32 flex-col gap-2 hover:bg-slate-50 border-2" onClick={downloadSVG}>
                                <FileCode className="h-8 w-8 text-orange-500" />
                                <span className="font-bold">SVG Vector</span>
                            </Button>
                        )}
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
