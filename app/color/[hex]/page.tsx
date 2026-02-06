import type { Metadata, ResolvingMetadata } from "next";
import ColorDetailsPage from "./client-page";
import { colorsData } from "@/lib/colors-data";
import { getColorName } from "@/lib/naming";
import chroma from "chroma-js";

type Props = {
    params: Promise<{ hex: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getSEOContext(hex: string, colorName: string) {
    // Simple logic to determine style keywords based on color properties
    const color = chroma(`#${hex}`);
    const luminance = color.luminance();
    const saturation = color.get('hsl.s');

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
        `Colors that go with ${colorName}`,
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
            title: "Invalid Color | A-Chroma",
            description: "The provided color code is invalid."
        };
    }

    const colorName = getColorName(hex);
    const { styleKeyword, industry, extraKeywords } = getSEOContext(hex, colorName);

    const title = `${colorName} (#${hex.toUpperCase()}) - ${styleKeyword} Palette | A-Chroma`;
    const description = `Generate a ${styleKeyword} brand color palette featuring ${colorName} (#${hex.toUpperCase()}). Perfect for ${industry} web design and accessible UI. ${extraKeywords}`;

    const ogImage = `https://a-chroma.app/api/og?hex=${hex}&name=${encodeURIComponent(colorName)}`; // Hypothetical OG image generator

    return {
        title,
        description,
        keywords: [
            colorName,
            `#${hex}`,
            "color palette",
            `${styleKeyword} Color Scheme`,
            "Professional Brand Identity Colors",
            "WCAG Color Contrast Checker"
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
    return <ColorDetailsPage params={{ hex }} />;
}
