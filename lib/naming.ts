import namer from 'namer';

export function getColorName(hex: string): string {
    try {
        const names = namer(hex);
        // Prefer 'ntc' (Name That Color) or 'pantone' for best results
        // We capitalize the first letter of each word
        const rawName = names.ntc[0]?.name || names.pantone[0]?.name || names.basic[0]?.name;

        return rawName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    } catch (e) {
        return "Unknown Color";
    }
}
