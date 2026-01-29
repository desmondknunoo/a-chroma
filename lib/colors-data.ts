export interface ColorData {
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

export const colorsData: ColorData[] = [
        {
                hex: "0093AF",
                name: "Pacific Cyan",
                shortDescription: "Radiant blue-green hue, lively like tropical seas, infusing designs with fresh energy and vibrancy.",
                description: `This shade is an intense, medium-dark **cyan-blue** that captures the feeling of clear tropical waters. It’s modern, vivid, and **clean**, evoking energy and openness.

Among digital palettes, it stands out for its high **saturation** and cool temperature, making it ideal for conveying clarity and tech-oriented aesthetics.

The colour’s brightness brings visual **vitality** and focus to designs.`,
                psychology: `This colour projects a sense of **freshness**, trust, and tranquility. It often triggers feelings of innovation, calm, and reliability.

**Freshness**: Suggests new beginnings and vitality.
**Trust**: Often used in corporate branding to evoke honesty.
**Tranquility**: Reminiscent of peaceful waters.
**Clarity**: Clear tones promote mental sharpness.
**Innovation**: Contemporary vibe supports progress.

Its vibrant vibe is inviting without being overwhelming, fostering a productive atmosphere.`,
                meaning: `In global culture, cyan-blue shades represent clarity, water, and technological advancement. Associated with **healing, safety**, and communication.

**Technology**: Signifies progress and reliability in tech industries.
**Water**: Symbolizes purity and life in many societies.
**Trust**: Used in medical fields to invoke safety.
**Creativity**: Fuels innovative thinking and openness.
**Peace**: Seen as pacifying in many Asian cultures.

Interpreted as positive, forward-thinking, and universally appealing.`,
                usage: `Designers choose this colour for its modern, energetic feel and versatility. It instantly signals **clarity**, trust, and friendliness, performing especially well in digital platforms.

**Modernity**: Embodies trends in digital and corporate design.
**Trustworthiness**: Inspires confidence in users and clients.
**Attention-grabbing**: Vibrant hue catches the eye instantly.
**Flexibility**: Adapts to many brand personalities.
**Approachability**: Warmer than colder blue shades.

This colour is ideal for highlighting key information and fueling user engagement.`,
                applications: `Frequently used for **UI elements**, call-to-action buttons, websites, and corporate branding in tech and creative agencies.

**Digital interfaces**: Ensures navigational clarity.
**Branding**: Makes logos appear bold and energetic.
**Infographics**: Highlights data and info clearly.
**Presentations**: Engages audience attention.
**Mobile apps**: Drives user interaction.

Works well in settings needing optimism, dynamism, and clear communication.`,
                history: `Popularized in the digital age as a **web-safe** tone, this cyan-blue became prominent with advances in display technology.

It was widely adopted for web and app UI elements, revolutionizing the visual language of screens by offering a vibrant yet **professional** alternative to primary blue.

This tone has no notable historic pigment but thrives in modern branding and design.`,
                accessibility: `This shade offers medium-to-high **contrast** on light backgrounds, but may be less effective on dark ones due to reduced luminance.

For users with **colour vision deficiency** (particularly tritanopia), it can become indistinguishable from some blues and greens.

To ensure **legibility**, pair it with off-white or very dark grays. Always check contrast ratios for WCAG compliance.`
        },
        {
                hex: "FF6B6B",
                name: "Sunset Coral",
                shortDescription: "A warm, energetic hue that blends the passion of red with the cheerfulness of orange.",
                description: "This shade is a vibrant **coral-red** that evokes the warmth of a summer sunset. It is energetic, playful, and **welcoming**, avoiding the aggression sometimes associated with pure red.\n\nIt stands out for its high visibility and warm temperature, making it excellent for calls to action.",
                psychology: "Projects warmth, energy, and optimism. It stimulates **appetite** and conversation.\n\n**Energy**: High adrenaline but friendly.\n**Urgency**: Good for alerts without being alarming.\n**Playfulness**: Associated with leisure and fun.",
                meaning: "Represents community, warmth, and harvest. In some cultures, it signals **good luck** and longevity.",
                usage: "Ideal for **food/beverage** apps, lifestyle brands, and marketing campaigns requiring high conversion.",
                applications: "Common in **lifestyle apps**, food delivery services, and social media icons.",
                history: "A modern pigment often associated with the mid-century modern aesthetic and recent flat design trends.",
                accessibility: "High contrast against dark text. Pair with white text requires checking specific contrast ratios, often needs bold font."
        },
        {
                hex: "6C5CE7",
                name: "Electric Indigo",
                shortDescription: "A mystical and deep purple-blue that bridges the gap between digital precision and creative imagination.",
                description: "A rich, deep **indigo** that feels both royal and digital. It commands respect and invokes a sense of mystery.",
                psychology: "**Creativity**: Stimulates the imagination.\n**Wisdom**: Associated with higher knowledge.\n**Spirituality**: Often linked to mindfulness.",
                meaning: "Royalty, luxury, and spiritual awareness.",
                usage: "Used by **SaaS** companies, creative portfolios, and spiritual apps.",
                applications: "Primary buttons, dark mode accents, and hero backgrounds.",
                history: "Indigo dye has a rich history as a luxury item, trade currency, and symbol of status across ancient civilizations.",
                accessibility: "Excellent for text on light backgrounds. Good background for white text."
        }
];
