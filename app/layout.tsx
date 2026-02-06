import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClarityAnalytics from "@/components/clarity-analytics";
import GoogleAnalytics from "@/components/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://a-chroma.app"),
  title: {
    default: "A-Chroma | Next-Gen Colour Suite",
    template: "%s | A-Chroma"
  },
  description: "The ultimate colour palette generator. Generate, extract, and visualize colours with AI. Create beautiful colour schemes in seconds.",
  keywords: [
    "colour palette generator", "color palette generator", "gradient palette generator", "brand palette generator", "palette generator",
    "Hex to CSS Gradient Converter", "WCAG Color Contrast Checker", "Tailwind CSS Palette Generator", "UI/UX Color Scheme Tool", "CMYK to Hex for Print",
    "Minimalist Web Design Palette", "Retro 70s Color Palette", "Material Design Color Tool", "Pastel Aesthetic Hex Codes", "Dark Mode UI Color Schemes",
    "Professional Brand Identity Colors", "Cohesive Instagram Feed Palette", "Modern SaaS Color Inspiration", "Nature-Inspired Color Combinations",
    "Download Figma Color Styles", "Copy to Clipboard Color Codes", "Linear and Radial Gradient CSS", "Trending Colors of 2026", "Mobile-First Accessible Palettes",
    "Hex Codes and RGB Values", "Copy-to-Clipboard CSS", "Export for Figma/Adobe", "Color Harmony Rules",
    "Modern Minimalist Palette", "Neon Cyberpunk Palette", "Create a cohesive brand identity"
  ],
  authors: [{ name: "A-Chroma" }],
  creator: "A-Chroma",
  publisher: "A-Chroma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "A-Chroma | Next-Gen Colour Suite",
    description: "The ultimate colour palette generator. Generate, extract, and visualize colours with AI.",
    url: "https://a-chroma.app", // Update with actual domain if known
    siteName: "A-Chroma",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "A-Chroma Color Suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A-Chroma | Next-Gen Colour Suite",
    description: "The ultimate colour palette generator. Generate, extract, and visualize colours with AI.",
    images: ["/og-image.png"],
    creator: "@achroma",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "A-Chroma",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "The ultimate colour palette generator. Generate, extract, and visualize colours with AI.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1024"
              }
            }),
          }}
        />
        <ClarityAnalytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
