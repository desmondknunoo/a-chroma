"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FooterProps {
    brandName: string
    dailyColour?: {
        name: string
        hex: string
    }
    mainLinks: Array<{
        href: string
        label: string
    }>
    legalLinks: Array<{
        href: string
        label: string
    }>
    copyright: {
        text: string
        license?: string
    }
}

export function Footer({
    brandName,
    dailyColour,
    mainLinks,
    legalLinks,
    copyright,
}: FooterProps) {
    return (
        <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
            <div className="px-4 lg:px-8">
                <div className="md:flex md:items-start md:justify-between">
                    <a
                        href="/"
                        className="flex items-center gap-x-2"
                        aria-label={brandName}
                    >
                        <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                            <Image src="/logo.png" alt={brandName} fill className="object-cover" />
                        </div>
                        <span className="font-bold text-xl">{brandName}</span>
                    </a>
                    <ul className="flex list-none mt-6 md:mt-0 space-x-3 items-center">
                        {dailyColour && (
                            <li className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-100/50 shadow-sm transition-transform hover:scale-105 cursor-default">
                                <div className="w-5 h-5 rounded-full border border-black/5 shadow-inner" style={{ backgroundColor: `#${dailyColour.hex}` }} />
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Colour of the Day</span>
                                    <span className="text-sm font-bold text-slate-900">{dailyColour.name}</span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
                    <nav className="lg:mt-0 lg:col-[4/11]">
                        <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
                            {mainLinks.map((link, i) => (
                                <li key={i} className="my-1 mx-2 shrink-0">
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-700 font-medium underline-offset-4 hover:underline hover:text-slate-900 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="mt-6 lg:mt-0 lg:col-[4/11]">
                        <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
                            {legalLinks.map((link, i) => (
                                <li key={i} className="my-1 mx-3 shrink-0">
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-500 underline-offset-4 hover:underline hover:text-slate-700 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li className="my-1 mx-3 shrink-0">
                                <a
                                    href="https://github.com/desmondknunoo/a-chroma"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-500 underline-offset-4 hover:underline hover:text-slate-700 transition-colors inline-flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-6 text-sm leading-6 text-slate-500 whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
                        <div>{copyright.text}</div>
                        <div className="mt-1">
                            <span className="text-xs">Open source under </span>
                            <a href="/terms" className="text-xs underline hover:text-slate-700">Custom License</a>
                            <span className="text-xs"> by Achendo Agency</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
