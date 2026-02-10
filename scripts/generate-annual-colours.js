const fs = require('fs');
const chroma = require('chroma-js');

// Generate 365 unique colors
const colors = [];
const usedHex = new Set();

while (colors.length < 365) {
    const color = chroma.random();
    const hex = color.hex().toUpperCase().replace('#', '');

    // Ensure reasonable saturation/luminance for "good" colors
    if (color.get('hsl.s') > 0.3 && color.get('hsl.l') > 0.2 && color.get('hsl.l') < 0.9) {
        if (!usedHex.has(hex)) {
            colors.push(hex);
            usedHex.add(hex);
        }
    }
}

const fileContent = `// Auto-generated 365 colours for the year
export const annualColors: string[] = [
    ${colors.map(c => `"${c}"`).join(',\n    ')}
];
`;

fs.writeFileSync('../lib/annual-colours.ts', fileContent);
console.log('Generated lib/annual-colours.ts with 365 colours.');
