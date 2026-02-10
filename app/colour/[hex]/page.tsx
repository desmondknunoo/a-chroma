import type { Metadata, ResolvingMetadata } from "next";
import ColourDetailsPage from "./client-page";
import { coloursData } from "@/lib/colours-data";
import { getColourName } from "@/lib/naming";
import chroma from "chroma-js";

type Props = {
    params: Promise<{ hex: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getSEOContext(hex: string, colourName: string) {
    // Simple logic to determine style keywords based on colour properties
    const colour = chroma(`#${hex}`);
    const luminance = colour.luminance();
    const saturation = colour.get('hsl.s');

    let styleKeyword = "Modern";
    let industry = "Digital";

    if (luminance > 0.8) {
        styleKeyword = "Minimalist";
        industry = "SaaS";
    } else if (luminance < 0.1) {
        styleKeyword = "Dark Mode";
        industry = "Tech";
    } else if (saturation > 0.8) {
        styleKeyword = "Neon Cyberpunk";
        industry = "Gaming";
    } else if (saturation < 0.2) {
        styleKeyword = "Pastel Aesthetic";
        industry = "Social Media";
    } else {
        styleKeyword = "Professional";
        industry = "Brand";
    }

    // Keywords to rotate or include
    const extraKeywords = [
        `Colours that go with ${colourName}`,
        "Cohesive Instagram Feed Palette",
        "Mobile-First Accessible Palettes"
    ].join(". ");

    return { styleKeyword, industry, extraKeywords };
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { hex: hexParam } = await params;
    const hex = hexParam.startsWith("%23") ? hexParam.replace("%23", "") : hexParam.replace("#", "");

    if (!chroma.valid(hex)) {
        return {
            title: "Invalid Colour | A-Chroma",
            description: "The provided colour code is invalid."
        };
    }

    const colourName = getColourName(hex);
    const { styleKeyword, industry, extraKeywords } = getSEOContext(hex, colourName);

    const title = `${colourName} (#${hex.toUpperCase()}) - ${styleKeyword} Palette | A-Chroma`;
    const description = `Generate a ${styleKeyword} brand colour palette featuring ${colourName} (#${hex.toUpperCase()}). Perfect for ${industry} web design and accessible UI. ${extraKeywords}`;

    const ogImage = `https://a-chroma.app/api/og?hex=${hex}&name=${encodeURIComponent(colourName)}`; // Hypothetical OG image generator

    return {
        title,
        description,
        keywords: [
            colourName,
            `#${hex}`,
            "colour palette",
            `${styleKeyword} Colour Scheme`,
            "Professional Brand Identity Colours",
            "WCAG Colour Contrast Checker"
        ],
        openGraph: {
            title,
            description,
            images: [ogImage], // Ideally we'd have a dynamic OG image generator
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        }
    };
}

export default async function Page({ params }: Props) {
    const { hex } = await params;
    return <ColourDetailsPage params={{ hex }} />;
}
