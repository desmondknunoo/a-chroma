import namer from 'color-namer';

export function getColourName(hex: string): string {
    try {
        const names = namer(hex);
        // Prefer 'ntc' (Name That Color) as primary source
        const bestName = names.ntc[0]?.name || names.pantone[0]?.name || names.basic[0]?.name;

        // Capitalize Words
        return bestName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    } catch (e) {
        return "Unknown Colour";
    }
}
