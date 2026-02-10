import { coloursData, ColourData } from './colours-data';
import { annualColours } from './annual-colours';
import { getColourName } from './naming';

export function getDailyColour(): ColourData {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay); // 0-365 range

    // Ensure we wrap around if dayOfYear > 365 (leap years usually handled by Date, but array bound check is safe)
    const colorHex = annualColours[(dayOfYear - 1) % annualColours.length];

    // Check if we have curated data for this hex
    const curated = coloursData.find(c => c.hex.toLowerCase() === colorHex.toLowerCase());

    if (curated) {
        return curated;
    }

    // Fallback: Generate generic data
    const name = getColourName(colorHex);

    return {
        hex: colorHex,
        name: name,
        shortDescription: `A unique daily colour selection: ${name}.`,
        description: `This is the selected colour for day ${dayOfYear} of the year. Its hex code is #${colorHex}. It offers a distinct visual character suitable for various design applications.`,
        psychology: "This hue communicates a specific mood depending on its context and pairing. Trust your intuition when applying it.",
        meaning: `As a shade of ${name.split(' ').pop()}, it carries the symbolic weight of its hue family while standing on its own unique merit.`,
        usage: "Versatile for digital interfaces, branding accents, or illustrative details.",
        applications: "Web design, mobile app UI, marketing material, and digital art.",
        history: "Part of the A-Chroma annual curated collection, selected to provide daily inspiration.",
        accessibility: "Ensure adequate contrast ratios when placing text over this colour."
    };
}
