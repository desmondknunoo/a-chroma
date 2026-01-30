"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FooterProps {
    brandName: string
    dailyColor?: {
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
    dailyColor,
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
                        {dailyColor && (
                            <li className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-100/50 shadow-sm transition-transform hover:scale-105 cursor-default">
                                <div className="w-5 h-5 rounded-full border border-black/5 shadow-inner" style={{ backgroundColor: `#${dailyColor.hex}` }} />
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Colour of the Day</span>
                                    <span className="text-sm font-bold text-slate-900">{dailyColor.name}</span>
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
                        </ul>
                    </div>
                    <div className="mt-6 text-sm leading-6 text-slate-500 whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
                        <div>{copyright.text}</div>
                        {copyright.license && <div>{copyright.license}</div>}
                    </div>
                </div>
            </div>
        </footer>
    )
}
