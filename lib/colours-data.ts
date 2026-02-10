export interface ColourData {
        hex: string;
        name: string;
        shortDescription: string;
        description: string;
        psychology: string;
        meaning: string;
        usage: string;
        applications: string;
        history: string;
        accessibility: string;
}

// Helper to analyze colour characteristics
function analyzeColour(hex: string): { hue: string; family: string; intensity: string } {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    const brightness = max / 255;
    
    // Determine intensity
    let intensity = 'muted';
    if (saturation > 0.7 && brightness > 0.6) intensity = 'vibrant';
    else if (saturation > 0.5 && brightness > 0.4) intensity = 'moderate';
    else if (brightness < 0.3) intensity = 'dark';
    else if (brightness > 0.8) intensity = 'light';
    
    // Determine hue family
    let hue = 'neutral';
    let family = 'neutral';
    
    if (max === r && g > 150 && b < 100) {
        hue = 'orange';
        family = 'warm';
    } else if (max === r && g > 100 && b > 100) {
        hue = 'pink';
        family = 'warm';
    } else if (max === r) {
        hue = 'red';
        family = 'warm';
    } else if (max === g && r > 150) {
        hue = 'yellow-green';
        family = 'natural';
    } else if (max === g && b > 100) {
        hue = 'teal';
        family = 'cool';
    } else if (max === g) {
        hue = 'green';
        family = 'natural';
    } else if (max === b && r > 150) {
        hue = 'purple';
        family = 'cool';
    } else if (max === b && g > 100) {
        hue = 'cyan';
        family = 'cool';
    } else if (max === b) {
        hue = 'blue';
        family = 'cool';
    } else if (r > 200 && g > 200) {
        hue = 'yellow';
        family = 'warm';
    }
    
    return { hue, family, intensity };
}

// Generate unique colour data based on hex
function generateColourData(hex: string, index: number): ColourData {
    const { hue, family, intensity } = analyzeColour(hex);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Generate unique name based on characteristics
    const names: Record<string, string[]> = {
        red: ['Crimson', 'Ruby', 'Cherry', 'Scarlet', 'Vermilion', 'Carmine', 'Garnet', 'Cardinal', 'Rust', 'Brick'],
        orange: ['Tangerine', 'Amber', 'Copper', 'Marigold', 'Apricot', 'Marmalade', 'Persimmon', 'Pumpkin', 'Burnt Orange', 'Tiger'],
        yellow: ['Sunshine', 'Lemon', 'Goldenrod', 'Buttercup', 'Canary', 'Daffodil', 'Maize', 'Mustard', 'Saffron', 'Topaz'],
        green: ['Emerald', 'Jade', 'Fern', 'Moss', 'Pine', 'Lime', 'Sage', 'Olive', 'Mint', 'Seafoam'],
        teal: ['Turquoise', 'Aqua', 'Teal', 'Cyan', 'Lagoon', 'Peacock', 'Tiffany', 'Robin', 'Verdigris', 'Cerulean'],
        blue: ['Sapphire', 'Cobalt', 'Azure', 'Navy', 'Royal', 'Denim', 'Steel', 'Ocean', 'Midnight', 'Arctic'],
        purple: ['Amethyst', 'Violet', 'Lavender', 'Plum', 'Orchid', 'Magenta', 'Mulberry', 'Grape', 'Thistle', 'Wisteria'],
        pink: ['Rose', 'Coral', 'Blush', 'Salmon', 'Flamingo', 'Petal', 'Berry', 'Raspberry', 'Peony', 'Fuchsia'],
        neutral: ['Charcoal', 'Slate', 'Pewter', 'Ash', 'Stone', 'Taupe', 'Greige', 'Mocha', 'Cocoa', 'Graphite']
    };
    
    const modifiers: Record<string, string[]> = {
        vibrant: ['Electric', 'Neon', 'Radiant', 'Intense', 'Brilliant', 'Bold', 'Vivid', 'Luminous', 'Glowing', 'Fluorescent'],
        moderate: ['Classic', 'Rich', 'Warm', 'Cool', 'Soft', 'Balanced', 'Steady', 'True', 'Pure', 'Natural'],
        muted: ['Dusty', 'Smokey', 'Subdued', 'Softened', 'Vintage', 'Weathered', 'Faded', 'Pastel', 'Milky', 'Gentle'],
        dark: ['Deep', 'Shadow', 'Midnight', 'Dark', 'Rich', 'Intense', 'Heavy', 'Dense', 'Profound', 'Mysterious'],
        light: ['Pale', 'Light', 'Soft', 'Pastel', 'Delicate', 'Whisper', 'Tint', 'Subtle', 'Gentle', 'Misty']
    };
    
    const hueNames = names[hue] || names.neutral;
    const intensityModifiers = modifiers[intensity] || modifiers.moderate;
    
    // Use index to pick different combinations
    const nameIndex = index % hueNames.length;
    const modifierIndex = Math.floor(index / 10) % intensityModifiers.length;
    const name = `${intensityModifiers[modifierIndex]} ${hueNames[nameIndex]}`;
    
    // Generate descriptions based on actual colour values
    const descriptions: Record<string, string> = {
        red: `This ${intensity} red (#${hex}) combines warmth and energy with RGB values of ${r}, ${g}, ${b}. It ranges from passionate to sophisticated depending on saturation and brightness.`,
        orange: `A ${intensity} orange (#${hex}) with RGB values ${r}, ${g}, ${b} captures the warmth of fire and autumn. It balances energy with approachability.`,
        yellow: `This ${intensity} yellow (#${hex}) at RGB ${r}, ${g}, ${b} radiates optimism and sunshine. It brings warmth and visibility to any palette.`,
        green: `A ${intensity} green (#${hex}) with RGB values ${r}, ${g}, ${b} connects to nature and growth. It offers balance between warm and cool tones.`,
        teal: `This ${intensity} teal-cyan (#${hex}) at RGB ${r}, ${g}, ${b} bridges blue and green. It suggests clarity, water, and digital modernity.`,
        blue: `A ${intensity} blue (#${hex}) with RGB values ${r}, ${g}, ${b} evokes trust, depth, and professionalism. It ranges from sky to ocean depths.`,
        purple: `This ${intensity} purple (#${hex}) at RGB ${r}, ${g}, ${b} combines the stability of blue with the energy of red. It suggests luxury and creativity.`,
        pink: `A ${intensity} pink (#${hex}) with RGB values ${r}, ${g}, ${b} balances warmth with softness. It ranges from energetic to gentle depending on saturation.`,
        neutral: `This ${intensity} neutral (#${hex}) at RGB ${r}, ${g}, ${b} provides sophisticated balance. It anchors palettes and allows other colours to shine.`
    };
    
    // Generate psychology based on actual values
    const psychology: Record<string, string> = {
        warm: r > 150 ? `High red content (${r}) stimulates energy and warmth. This colour activates attention and creates emotional responses.` : `Moderate warmth creates inviting atmosphere without overwhelming intensity.`,
        cool: b > 150 ? `Strong blue component (${b}) promotes calm and trust. This shade encourages focus and reliability.` : `Cool undertones provide balance and sophistication.`,
        natural: g > 150 ? `Dominant green (${g}) connects to nature and growth. It promotes harmony and environmental consciousness.` : `Natural balance creates versatile, grounding presence.`,
        neutral: `Balanced RGB values create sophisticated neutrality. This shade provides stability and timeless elegance.`
    };
    
    // Generate meaning based on hue and intensity
    const meanings: Record<string, string> = {
        red: intensity === 'vibrant' ? 'Passion, urgency, and excitement' : intensity === 'dark' ? 'Power, sophistication, and drama' : 'Warmth, comfort, and tradition',
        orange: 'Creativity, enthusiasm, and warmth',
        yellow: 'Optimism, clarity, and energy',
        green: 'Growth, harmony, and renewal',
        teal: 'Clarity, communication, and modernity',
        blue: 'Trust, stability, and wisdom',
        purple: 'Luxury, creativity, and mystery',
        pink: 'Compassion, playfulness, and romance',
        neutral: 'Balance, sophistication, and timelessness'
    };
    
    // Generate usage
    const usage: Record<string, string> = {
        vibrant: `Use as an accent or call-to-action. This high-energy shade demands attention and drives action.`,
        moderate: `Versatile for primary or secondary roles. This balanced shade works across applications.`,
        muted: `Perfect for backgrounds and subtle accents. This soft shade creates sophisticated atmosphere.`,
        dark: `Excellent for text, headers, or dramatic backgrounds. This deep shade provides gravitas.`,
        light: `Ideal for backgrounds and breathing room. This light shade creates openness and space.`
    };
    
    // Generate applications
    const applications: Record<string, string> = {
        red: 'Brand identities, warnings, call-to-action buttons, food packaging, and entertainment',
        orange: 'Creative agencies, food and beverage, autumn campaigns, and youth brands',
        yellow: "Optimistic brands, children's products, caution signage, and sunny destinations",
        green: 'Environmental causes, organic products, financial services, and wellness brands',
        teal: 'Tech companies, healthcare, water brands, and modern corporate identities',
        blue: 'Corporate branding, financial services, technology, and healthcare',
        purple: 'Luxury goods, creative industries, spirituality, and premium cosmetics',
        pink: 'Beauty brands, feminine products, romance, and playful consumer goods',
        neutral: 'Minimalist designs, luxury brands, professional services, and timeless identities'
    };
    
    // Generate history
    const historyTexts: Record<string, string> = {
        red: 'Red pigments have been used since prehistoric times, derived from ochre and later cochineal insects.',
        orange: 'Orange as a distinct colour name emerged in the 16th century, named after the fruit.',
        yellow: 'Yellow ochre is one of humanity\'s oldest pigments, used in cave paintings 40,000 years ago.',
        green: 'Green symbolized fertility and rebirth in ancient Egypt, made from malachite and verdigris.',
        teal: 'Teal gained popularity in the 20th century with digital displays and cyan printing processes.',
        blue: 'Ultramarine blue was once more valuable than gold, made from crushed lapis lazuli.',
        purple: 'Tyrian purple was worth its weight in silver, reserved for Roman emperors and bishops.',
        pink: 'Pink became a gender signifier in the mid-20th century, previously worn by all genders.',
        neutral: 'Neutral earth tones have provided stability in art and design across all cultures and eras.'
    };
    
    // Calculate accessibility
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const accessibility = luminance > 0.5 
        ? `This light shade works best with dark text (charcoal, navy, or black). Contrast ratio: ${(luminance + 0.05) / 0.05 > 4.5 ? 'Passes WCAG AA' : 'May need adjustment for small text'}. RGB: ${r}, ${g}, ${b}.`
        : `This darker shade provides excellent contrast with white or light text. Contrast ratio: ${1.05 / (luminance + 0.05) > 4.5 ? 'Passes WCAG AA' : 'Good for large text'}. RGB: ${r}, ${g}, ${b}.`;
    
    return {
        hex,
        name,
        shortDescription: `${name} is a ${intensity} ${hue} tone with unique RGB character (${r}, ${g}, ${b}).`,
        description: descriptions[hue] || descriptions.neutral,
        psychology: psychology[family] || psychology.neutral,
        meaning: meanings[hue] || meanings.neutral,
        usage: usage[intensity],
        applications: applications[hue] || applications.neutral,
        history: historyTexts[hue] || historyTexts.neutral,
        accessibility
    };
}

// Generate all 365 colours
const annualHexCodes = [
    "BA89EB", "20C238", "C8A045", "64E20B", "CA40FA", "87417B", "A4EE1B", "BD2DC7", "38F316", "4A9666",
    "356213", "244FAC", "3F720A", "0A54D4", "9B5E19", "0737D3", "A4DBA4", "3E7EF3", "8A99C4", "6835E1",
    "99EA59", "96FDFB", "9D6BC7", "A6EB36", "547823", "AACBE8", "372790", "2AA4F5", "B45CD3", "334061",
    "27F8FB", "B8905F", "92ED75", "654F27", "EDCAF5", "95E867", "CF4931", "7F542F", "BEC142", "CB8A1E",
    "6AEFC6", "9BCEA8", "D28045", "CAC31C", "38C801", "6FB6DB", "70AECA", "00FCD4", "D129BF", "1EA0EE",
    "A086C9", "C20838", "7C2240", "8F053D", "6419F1", "C21A7D", "B7E188", "346811", "8A3CC5", "9BE507",
    "A8CC72", "94DA73", "63FF5E", "C76A83", "BC7F79", "C8327C", "E628B3", "4431ED", "8A984D", "BDA109",
    "D857A1", "082063", "DC5755", "8F080E", "EA763C", "44893A", "9A70BF", "67FB96", "8F2C0E", "A616C5",
    "339B20", "A6372D", "F4A3AA", "69F1CE", "A50E0A", "B0CC1B", "96D0BD", "A3F629", "5025FE", "B85E26",
    "50C212", "F063EE", "C7E9F2", "6B2D61", "2B04A5", "4650F3", "6A84E0", "EDB7FB", "87C3C9", "DADC6F",
    "1CA90A", "F176EB", "2A5417", "D72ACD", "F13555", "856DCA", "85882C", "BC8A5C", "A0E0C4", "33F16F",
    "09BB29", "50351A", "A3E7C5", "B1641A", "F3B038", "2A12E9", "58EEB9", "B9EDFA", "3B1CAC", "772FA6",
    "13B7DF", "CEE808", "FFFA04", "238091", "F64445", "CBE876", "22B8E9", "FDE5A8", "639D4B", "CF4D15",
    "878CBF", "1555DC", "15129C", "FB7960", "84D705", "3E913A", "A0E13C", "4BF100", "4BA76D", "32BECC",
    "E7BE2C", "BB4D62", "A44EE0", "3FF51D", "4DD34F", "19948F", "7829EC", "CD41C9", "9AE4CB", "A43D7E",
    "5FC101", "1CB604", "39E944", "E3E5A9", "DDF838", "F2FDB0", "F51503", "FA4D67", "FD07AC", "ABFE94",
    "11B33F", "75B66B", "68B1B0", "157020", "177EAC", "FC7109", "F691DD", "F40B87", "4BFBF9", "5BA2D3",
    "CB4EF0", "9B07CE", "033383", "2B75A1", "3BCA90", "6E3D26", "E313C2", "EFBAB2", "29F44C", "9DACF1",
    "480DB7", "65E371", "7681FB", "B5364E", "3265A9", "2C408E", "F3462D", "3D2470", "483BF8", "09EEE8",
    "F428F7", "2FC805", "206F35", "843D6D", "D43983", "97E258", "2C2B78", "D52600", "6232A3", "781722",
    "71A9B9", "1F1B9F", "ECC548", "C2F59A", "2D0BCB", "6FB25E", "B08DF9", "447089", "30A28C", "46DA9C",
    "095B60", "4BA19F", "4DBD8B", "3BE059", "EFCBE2", "9053F8", "C05211", "692492", "F469D0", "9D70F4",
    "96EA19", "C3E0C9", "A6EA14", "5D0980", "FFF377", "E958EF", "EDE083", "CA9529", "021DBF", "C01D92",
    "C730FF", "672D37", "8E622B", "E82ABD", "92E106", "30C88E", "83FF67", "07B3B1", "45E034", "923D70",
    "572AB2", "AB5932", "205F9A", "A0D83C", "330A83", "3D1CCF", "1A71E5", "6AC743", "D8809F", "471A89",
    "830C9A", "BD88F9", "884902", "ACB1FE", "0DC118", "62A4B5", "76F7C0", "F3A113", "763344", "FBF09D",
    "911D85", "34FD73", "EB8B59", "E7213F", "2E2C52", "61CB1B", "D13004", "6C308C", "4A6412", "FDFD4D",
    "5529A1", "6E8C06", "7FACF1", "545DC1", "A6C2ED", "CA0A94", "E5DA36", "71D0EC", "985843", "E8C776",
    "12CE25", "448759", "6EFC65", "D30309", "3EAC73", "903BFF", "D09E5B", "EBA8F2", "7B69B1", "581973",
    "CF6AC3", "BCFF88", "20EC3D", "53F111", "FE46DD", "C58C0D", "BD7A3F", "A0F1AF", "AFCD9D", "57870B",
    "55DCBD", "1CBF0F", "D47DFF", "C8221E", "F6C8F9", "42ADC8", "AE3730", "59FF24", "E01382", "D72574",
    "5771C6", "9DEF5B", "4FEF77", "7F8236", "71F794", "9100DC", "6ECEBF", "F128DA", "FBE4BE", "4604B2",
    "13C023", "6DEC6A", "F20C4C", "B6E9A9", "DA97E7", "C31C75", "6BBBF5", "4661E6", "10B796", "49C325",
    "3C6C1B", "D1DD45", "9EA61E", "61C651", "3CBF08", "C87FC4", "FA6719", "F04119", "F93F3C", "07B526",
    "FFED8A", "13A649", "2845EF", "C12277", "D3FA96", "C6F312", "1A9CCC", "F7A6CC", "9497CF", "F3DECC",
    "020882", "8964CD", "ED8819", "C1D715", "3530DC", "5FD5B2", "44B6A7", "22DC32", "B1F77F", "27C09A",
    "A51466", "9FD23F", "98E94D", "3A6D44", "21C896"
];

// Export the complete colour data array
export const coloursData: ColourData[] = annualHexCodes.map((hex, index) => generateColourData(hex, index));

// Helper function to get colour data by hex
export function getColourByHex(hex: string): ColourData | undefined {
    return coloursData.find(c => c.hex.toLowerCase() === hex.toLowerCase());
}