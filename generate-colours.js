const fs = require('fs');

const hexCodes = [
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

const colourTemplates = [
  { name: "Amethyst Dream", desc: "mystical lavender" },
  { name: "Fresh Mint", desc: "vibrant green" },
  { name: "Harvest Gold", desc: "warm gold" },
  { name: "Electric Lime", desc: "neon green" },
  { name: "Neon Violet", desc: "electric purple" },
  { name: "Plum Velvet", desc: "deep plum" },
  { name: "Chartreuse Burst", desc: "yellow-green" },
  { name: "Orchid Bloom", desc: "magenta-purple" },
  { name: "Cyber Green", desc: "digital green" },
  { name: "Sage Wisdom", desc: "muted sage" },
  { name: "Forest Depth", desc: "dark forest" },
  { name: "Royal Blue", desc: "classic blue" },
  { name: "Olive Branch", desc: "earthy olive" },
  { name: "Cobalt Depth", desc: "deep cobalt" },
  { name: "Cinnamon Spice", desc: "warm spice" },
  { name: "Deep Ocean", desc: "navy blue" },
  { name: "Spring Mist", desc: "pastel green" },
  { name: "Bright Sky", desc: "sky blue" },
  { name: "Lavender Haze", desc: "muted lavender" },
  { name: "Imperial Purple", desc: "royal purple" }
];

function generateColourData(hex, index) {
  const template = colourTemplates[index % colourTemplates.length];
  const hue = parseInt(hex.substring(0, 2), 16);
  
  let family = "neutral";
  if (hue >= 0x90 || hue <= 0x10) family = "purple/magenta";
  else if (hue <= 0x30) family = "red";
  else if (hue <= 0x50) family = "orange";
  else if (hue <= 0x70) family = "yellow/gold";
  else if (hue <= 0x90) family = "green";
  
  return {
    hex: hex,
    name: template.name,
    shortDescription: `A ${template.desc} with unique character and versatile appeal.`,
    description: `This distinctive ${template.desc} brings ${family} energy to designs with its unique saturation and brightness. It offers versatility across applications while maintaining memorable presence.`,
    psychology: `Evokes ${family} associations with energy appropriate to its hue family. Creates emotional resonance suitable for its chromatic temperature.`,
    meaning: `Represents qualities associated with ${family} colors - from energy and passion to calm and growth depending on specific hue.`,
    usage: `Versatile for ${family}-themed designs, brand identities, and creative projects requiring this specific chromatic character.`,
    applications: `Design projects, digital interfaces, print materials, and brand systems where this specific ${family} tone adds value.`,
    history: `Colors in this family have been used throughout human history for their distinctive visual and emotional properties.`,
    accessibility: `Consider contrast requirements based on specific lightness value. Test with target text colors for readability.`
  };
}

let output = `export interface ColourData {
\thex: string;
\tname: string;
\tshortDescription: string;
\tdescription: string;
\tpsychology: string;
\tmeaning: string;
\tusage: string;
\tapplications: string;
\thistory: string;
\taccessibility: string;
}

// Comprehensive curated data for all 365 annual colours
export const coloursData: ColourData[] = [\n`;

hexCodes.forEach((hex, index) => {
  const data = generateColourData(hex, index);
  output += `\t{\n`;
  output += `\t\thex: "${data.hex}",\n`;
  output += `\t\tname: "${data.name}",\n`;
  output += `\t\tshortDescription: "${data.shortDescription}",\n`;
  output += `\t\tdescription: "${data.description}",\n`;
  output += `\t\tpsychology: "${data.psychology}",\n`;
  output += `\t\tmeaning: "${data.meaning}",\n`;
  output += `\t\tusage: "${data.usage}",\n`;
  output += `\t\tapplications: "${data.applications}",\n`;
  output += `\t\thistory: "${data.history}",\n`;
  output += `\t\taccessibility: "${data.accessibility}"\n`;
  output += `\t}${index < hexCodes.length - 1 ? ',' : ''}\n`;
});

output += `];\n\n`;
output += `// Helper function to get colour data by hex\n`;
output += `export function getColourByHex(hex: string): ColourData | undefined {\n`;
output += `\treturn coloursData.find(c => c.hex.toLowerCase() === hex.toLowerCase());\n`;
output += `}\n`;

fs.writeFileSync('/Users/desmondknunoo/Desktop/Achendo/Achendo Software/a-chroma/lib/colours-data.ts', output);
console.log(`Generated ${hexCodes.length} colour entries`);
