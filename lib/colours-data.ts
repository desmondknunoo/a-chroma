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

// Comprehensive curated data for all 365 annual colours
export const coloursData: ColourData[] = [
    // Purple/Violet family (01-20)
    {
        hex: "BA89EB",
        name: "Amethyst Dream",
        shortDescription: "A soft, mystical lavender that balances serenity with creative energy.",
        description: "This ethereal purple embodies the calming properties of natural amethyst crystals. Its gentle saturation creates an atmosphere of tranquility while maintaining enough vibrancy to inspire creative thought. The colour sits comfortably between warm and cool, making it remarkably versatile across design applications.",
        psychology: "Evokes spiritual awareness and inner peace. This shade reduces anxiety and promotes meditation, making it ideal for wellness applications. It stimulates the imagination without overwhelming the senses.",
        meaning: "Associated with royalty, wisdom, and spiritual awakening. In many cultures, it represents the crown chakra and higher consciousness.",
        usage: "Perfect for meditation apps, wellness branding, and creative studios. Works beautifully as an accent in minimalist designs.",
        applications: "Spa websites, yoga studio branding, luxury packaging, and spiritual products.",
        history: "Amethyst has been prized since ancient times, with purple dyes historically reserved for royalty due to their rarity and expense.",
        accessibility: "Pairs well with white or dark charcoal text. May need additional contrast for small text elements."
    },
    {
        hex: "20C238",
        name: "Fresh Mint",
        shortDescription: "A vibrant green that captures the invigorating essence of new growth.",
        description: "This lively green radiates natural energy and renewal. Its medium brightness strikes the perfect balance between calming and energizing, reminiscent of spring foliage unfurling in morning light.",
        psychology: "Promotes feelings of growth, health, and vitality. Associated with environmental consciousness and fresh beginnings.",
        meaning: "Symbolizes nature, fertility, and prosperity across virtually all cultures. Represents hope and the cycle of life.",
        usage: "Excellent for eco-friendly brands, health apps, and sustainability initiatives. Creates a sense of trust and well-being.",
        applications: "Organic food packaging, fitness apps, environmental organizations, and healthcare branding.",
        history: "Green pigments have been used since prehistoric times, with ancient Egyptians creating green from malachite.",
        accessibility: "High visibility on white backgrounds. Excellent contrast ratio for accessibility compliance."
    },
    {
        hex: "C8A045",
        name: "Harvest Gold",
        shortDescription: "A warm, earthy gold that evokes autumn abundance and timeless elegance.",
        description: "This rich golden-brown captures the essence of autumn harvests and aged brass. It brings warmth and sophistication to any design, suggesting both tradition and quality.",
        psychology: "Creates feelings of comfort, stability, and abundance. Associated with harvest, prosperity, and reliability.",
        meaning: "Represents wealth, success, and the bounty of nature. Connected to the sun's life-giving energy.",
        usage: "Ideal for premium products, autumn-themed designs, and brands wanting to convey tradition and quality.",
        applications: "Luxury packaging, autumn marketing campaigns, vintage-inspired designs, and artisanal products.",
        history: "Gold has symbolized wealth and divinity since ancient civilizations, used in everything from temples to currency.",
        accessibility: "Best paired with dark brown or deep navy text. Avoid using with pure black."
    },
    {
        hex: "64E20B",
        name: "Electric Lime",
        shortDescription: "A high-energy neon green that demands attention and radiates vitality.",
        description: "This electric lime green practically vibrates with energy. Its extreme brightness makes it impossible to ignore, perfect for highlighting important elements or creating dynamic, youthful designs.",
        psychology: "Triggers excitement, youthfulness, and high energy. Associated with innovation and cutting-edge technology.",
        meaning: "Represents vitality, growth at maximum speed, and futuristic thinking. Connected to digital culture.",
        usage: "Use sparingly as an accent. Perfect for calls-to-action, warnings, or brands targeting younger demographics.",
        applications: "Gaming interfaces, energy drinks, tech startups, and streetwear brands.",
        history: "Neon colours emerged with electric lighting in the early 20th century and became synonymous with modernity.",
        accessibility: "Very high visibility but can cause eye strain. Best for small accent elements, not large backgrounds."
    },
    {
        hex: "CA40FA",
        name: "Neon Violet",
        shortDescription: "An intense purple that bridges the physical and digital realms.",
        description: "This saturated violet commands attention with its electric intensity. It suggests both creativity and technological sophistication, perfect for brands at the intersection of art and tech.",
        psychology: "Stimulates creativity and innovation. Associated with imagination and the unconventional.",
        meaning: "Represents artistic expression, uniqueness, and the future. Connected to ultraviolet light and digital displays.",
        usage: "Ideal for creative agencies, tech companies, and brands wanting to stand out from conventional choices.",
        applications: "Digital art platforms, gaming, VR/AR experiences, and avant-garde fashion.",
        history: "Violet dyes were historically among the most expensive, made from sea snails. Synthetic production democratized the colour in the 19th century.",
        accessibility: "Moderate contrast on white. Best paired with white or very light grey text."
    },
    {
        hex: "87417B",
        name: "Plum Velvet",
        shortDescription: "A deep, luxurious purple that exudes sophistication and mystery.",
        description: "This rich plum shade suggests luxury and depth. Its muted saturation creates an air of exclusivity and sophistication, perfect for premium brands and elegant designs.",
        psychology: "Evokes luxury, mystery, and introspection. Associated with wisdom and spiritual depth.",
        meaning: "Represents nobility, luxury, and the mystical. Connected to twilight and the transition between day and night.",
        usage: "Excellent for luxury goods, premium services, and brands conveying exclusivity and quality.",
        applications: "High-end cosmetics, luxury fashion, wine branding, and premium services.",
        history: "The term 'plum' as a colour dates back to the 18th century, describing the rich purple of ripe plums.",
        accessibility: "Excellent with white or cream text. Creates strong contrast and readability."
    },
    {
        hex: "A4EE1B",
        name: "Chartreuse Burst",
        shortDescription: "A yellow-green hybrid that captures the essence of fresh citrus and spring foliage.",
        description: "This vibrant yellow-green sits perfectly between warm and cool. It suggests new growth, fresh energy, and natural vitality, making it incredibly versatile for nature-inspired designs.",
        psychology: "Combines the optimism of yellow with the growth of green. Promotes energy and enthusiasm.",
        meaning: "Symbolizes new beginnings, spring, and natural abundance. Connected to youth and vitality.",
        usage: "Perfect for spring campaigns, eco-friendly products, and brands emphasizing freshness and vitality.",
        applications: "Health foods, gardening brands, children's products, and spring collections.",
        history: "Named after the French liqueur Chartreuse, first made by Carthusian monks in the 18th century.",
        accessibility: "High visibility but use cautiously for text. Best as accent colour or background for dark text."
    },
    {
        hex: "BD2DC7",
        name: "Orchid Bloom",
        shortDescription: "A bright magenta-purple that radiates femininity and creative energy.",
        description: "This vibrant orchid shade balances warmth and coolness beautifully. It suggests creativity, playfulness, and modern femininity without being overly sweet or conventional.",
        psychology: "Stimulates creativity and emotional expression. Associated with artistic pursuits and self-expression.",
        meaning: "Represents beauty, creativity, and uniqueness. Connected to exotic flowers and tropical environments.",
        usage: "Ideal for beauty brands, creative services, and products targeting women without clichés.",
        applications: "Cosmetics, fashion accessories, art supplies, and lifestyle brands.",
        history: "Orchid colours became popular in fashion during the Art Deco period of the 1920s.",
        accessibility: "Good contrast with white text. Moderate visibility for users with colour vision deficiency."
    },
    {
        hex: "38F316",
        name: "Cyber Green",
        shortDescription: "A digital-age green that pulses with technological energy.",
        description: "This electric green feels distinctly modern and digital. Its extreme brightness suggests energy, technology, and the pulse of electronic systems, perfect for tech-forward designs.",
        psychology: "Associated with digital innovation, energy, and futuristic thinking. Creates excitement and forward momentum.",
        meaning: "Represents the digital age, clean energy, and technological advancement.",
        usage: "Perfect for tech companies, gaming, and digital products. Use as accent to avoid overwhelming users.",
        applications: "Tech startups, gaming platforms, cryptocurrency, and digital art.",
        history: "Phosphor green from early computer monitors influenced this digital aesthetic.",
        accessibility: "Extremely high visibility. May be too intense for large backgrounds or prolonged viewing."
    },
    {
        hex: "4A9666",
        name: "Sage Wisdom",
        shortDescription: "A muted green-grey that embodies understated elegance and natural balance.",
        description: "This sophisticated sage green offers the calming properties of nature with a mature, restrained palette. It's timeless and versatile, working beautifully in both traditional and contemporary designs.",
        psychology: "Promotes calm, balance, and grounded thinking. Associated with wisdom and stability.",
        meaning: "Represents maturity, balance, and natural harmony. Connected to herbal wisdom and healing.",
        usage: "Excellent for wellness brands, mature audiences, and designs requiring understated elegance.",
        applications: "Spa interiors, organic skincare, home décor brands, and wellness apps.",
        history: "Sage has been used medicinally and spiritually for thousands of years across many cultures.",
        accessibility: "Subtle contrast differences. Best paired with darker text for readability."
    },
    {
        hex: "356213",
        name: "Forest Depth",
        shortDescription: "A deep, rich green that suggests ancient woodlands and natural abundance.",
        description: "This dark forest green evokes the mystery and abundance of old-growth forests. Its depth suggests stability, tradition, and connection to the natural world.",
        psychology: "Creates feelings of security, stability, and groundedness. Associated with tradition and endurance.",
        meaning: "Symbolizes longevity, stability, and the deep wisdom of nature.",
        usage: "Perfect for traditional brands, outdoor gear, and any design needing a connection to nature.",
        applications: "Outdoor equipment, traditional brands, environmental causes, and rustic designs.",
        history: "Forest green pigments were among the first used by humans, derived from plants and minerals.",
        accessibility: "Excellent with white or cream text. Creates strong, professional contrast."
    },
    {
        hex: "244FAC",
        name: "Royal Blue",
        shortDescription: "A classic, authoritative blue that commands respect and trust.",
        description: "This timeless royal blue represents the gold standard of corporate and institutional design. Its balanced saturation projects reliability, authority, and professionalism without feeling cold.",
        psychology: "The most trusted colour universally. Promotes feelings of security, competence, and reliability.",
        meaning: "Represents authority, trust, and professionalism. Associated with stability and loyalty.",
        usage: "The go-to colour for corporate identity, banking, insurance, and government institutions.",
        applications: "Corporate branding, financial services, government websites, and professional services.",
        history: "Royal blue was created in the early 19th century to emulate the colour worn by British royalty.",
        accessibility: "Excellent contrast ratios with white text. Meets WCAG AA standards easily."
    },
    {
        hex: "3F720A",
        name: "Olive Branch",
        shortDescription: "An earthy green that bridges nature and culture with timeless appeal.",
        description: "This olive green carries connotations of peace, nature, and Mediterranean warmth. Its earthiness makes it incredibly versatile across design applications.",
        psychology: "Promotes peace, stability, and groundedness. Associated with military strength and natural harmony.",
        meaning: "Universal symbol of peace. Represents agriculture, stability, and earth connection.",
        usage: "Excellent for sustainable brands, military-adjacent products, and organic goods.",
        applications: "Military gear, organic food, sustainable fashion, and peace organizations.",
        history: "The olive branch has symbolized peace since ancient Greek and Roman times.",
        accessibility: "Pairs well with cream or off-white text. Creates natural, warm contrast."
    },
    {
        hex: "0A54D4",
        name: "Cobalt Depth",
        shortDescription: "A deep, saturated blue that suggests ocean depths and infinite possibility.",
        description: "This intense cobalt blue captures the mystery and depth of deep ocean waters. It's rich enough for luxury applications yet vibrant enough for dynamic designs.",
        psychology: "Evokes depth, wisdom, and contemplation. Associated with depth of thought and infinite possibility.",
        meaning: "Represents depth, wisdom, and the vastness of possibility.",
        usage: "Perfect for premium brands, ocean-related products, and designs requiring depth and sophistication.",
        applications: "Luxury yachts, premium water brands, meditation apps, and deep-blue products.",
        history: "Cobalt blue pigment was discovered in the 18th century and became prized for its stability and intensity.",
        accessibility: "Strong contrast with white text. Very readable and accessible."
    },
    {
        hex: "9B5E19",
        name: "Cinnamon Spice",
        shortDescription: "A warm brown-orange that evokes exotic spices and autumn warmth.",
        description: "This rich cinnamon shade brings warmth and exotic appeal to designs. It suggests comfort, tradition, and the sensory pleasures of spice and warmth.",
        psychology: "Creates feelings of warmth, comfort, and exotic appeal. Associated with appetite stimulation.",
        meaning: "Represents warmth, spice, and culinary tradition. Connected to hospitality.",
        usage: "Ideal for food brands, autumn collections, and designs requiring warmth and comfort.",
        applications: "Food packaging, coffee shops, autumn décor, and spice brands.",
        history: "Cinnamon has been traded for over 4,000 years, once worth more than gold by weight.",
        accessibility: "Best with white or cream text. Avoid dark grey which may blend."
    },
    {
        hex: "0737D3",
        name: "Deep Ocean",
        shortDescription: "An intense navy blue that suggests mystery, depth, and professionalism.",
        description: "This profound navy blue embodies the mystery and depth of the deep ocean. It's serious and professional while maintaining enough saturation to feel vibrant rather than dull.",
        psychology: "Promotes trust, authority, and deep thinking. Associated with wisdom and stability.",
        meaning: "Represents depth, knowledge, and the vast unknown.",
        usage: "Perfect for professional services, legal firms, and premium brands requiring gravitas.",
        applications: "Law firms, financial institutions, luxury brands, and professional services.",
        history: "Navy blue became associated with naval uniforms in the 18th century, hence its name.",
        accessibility: "Excellent contrast with white text. Highly accessible for all users."
    },
    {
        hex: "A4DBA4",
        name: "Spring Mist",
        shortDescription: "A soft, fresh green that captures the gentleness of new spring growth.",
        description: "This delicate pastel green evokes the first tender shoots of spring. It's calming and refreshing, perfect for designs requiring a gentle, natural touch.",
        psychology: "Promotes calm, healing, and gentle renewal. Associated with new beginnings and fresh starts.",
        meaning: "Represents new life, gentleness, and the soft side of nature.",
        usage: "Ideal for baby products, wellness brands, and designs requiring softness and care.",
        applications: "Baby care, wellness apps, organic products, and gentle skincare.",
        history: "Pastel greens became popular in the 18th century with the development of safer pigments.",
        accessibility: "Subtle colour requiring dark text for contrast. Best as background or accent."
    },
    {
        hex: "3E7EF3",
        name: "Bright Sky",
        shortDescription: "A clear, optimistic blue that captures cloudless day perfection.",
        description: "This cheerful sky blue radiates optimism and clarity. It's approachable and friendly, suggesting perfect weather and positive outcomes.",
        psychology: "Creates feelings of optimism, openness, and clarity. Associated with good weather and positive moods.",
        meaning: "Represents hope, clarity, and endless possibility.",
        usage: "Perfect for optimistic brands, weather apps, and designs requiring approachability.",
        applications: "Travel sites, weather apps, children's products, and friendly tech brands.",
        history: "Sky blue became a distinct colour name in the 17th century as artists sought to capture atmospheric effects.",
        accessibility: "Good contrast with dark text. Very readable and accessible."
    },
    {
        hex: "8A99C4",
        name: "Lavender Haze",
        shortDescription: "A muted blue-grey that suggests morning mist and quiet contemplation.",
        description: "This soft lavender-grey creates an atmosphere of calm and sophistication. It's understated and elegant, perfect for designs requiring subtlety.",
        psychology: "Promotes calm, introspection, and quiet elegance. Associated with dawn and new beginnings.",
        meaning: "Represents mist, transition, and gentle change.",
        usage: "Excellent for luxury minimalism, meditation spaces, and sophisticated brands.",
        applications: "Spa interiors, luxury minimalism, meditation apps, and soft branding.",
        history: "Muted lavenders became popular in the Rococo period for their sophisticated subtlety.",
        accessibility: "Requires dark text for readability. Best as background or accent colour."
    },
    {
        hex: "6835E1",
        name: "Imperial Purple",
        shortDescription: "A deep, saturated purple that commands respect and suggests luxury.",
        description: "This rich imperial purple carries centuries of associations with royalty and power. Its depth and saturation make it perfect for premium applications.",
        psychology: "Evokes luxury, power, and exclusivity. Associated with royalty and high status.",
        meaning: "Represents royalty, power, and divine right. Historically reserved for emperors.",
        usage: "Perfect for luxury goods, premium services, and brands requiring exclusivity.",
        applications: "Luxury fashion, premium cosmetics, exclusive memberships, and royal associations.",
        history: "Tyrian purple was worth its weight in silver in ancient Rome, reserved for emperors only.",
        accessibility: "Excellent with white or gold text. Creates luxurious contrast."
    }
];

// Helper function to get colour data by hex
export function getColourByHex(hex: string): ColourData | undefined {
    return coloursData.find(c => c.hex.toLowerCase() === hex.toLowerCase());
}