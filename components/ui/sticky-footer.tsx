"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import {
    FacebookIcon,
    FrameIcon,
    InstagramIcon,
    LinkedinIcon,
    YoutubeIcon,
} from 'lucide-react';
import { Button } from './button';

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
    label: string;
    links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
    return (
        <footer
            className={cn('relative h-[720px] w-full', className)}
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
            {...props}
        >
            <div className="fixed bottom-0 h-[720px] w-full">
                <div className="sticky top-[calc(100vh-720px)] h-full overflow-y-auto">
                    {/* Changed border-t to border-slate-200 and explicit light bg */}
                    <div className="relative flex size-full flex-col justify-between gap-5 border-t border-slate-200 bg-white px-4 py-8 md:px-12 text-slate-900">
                        <div
                            aria-hidden
                            className="absolute inset-0 isolate z-0 contain-strict pointer-events-none"
                        >
                            {/* Adjusted gradients for Light Mode (subtle grey/blue flows instead of dark) */}
                            <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(0,0,0,0.02)_0,rgba(0,0,0,0.01)_50%,transparent_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
                            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(51,132,255,0.05)_0,rgba(0,0,0,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
                        </div>
                        <div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0 z-10">
                            <AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
                                <FrameIcon className="size-8 text-blue-600" />
                                <p className="text-slate-600 mt-8 text-sm md:mt-0 leading-relaxed">
                                    Innovative color tools empowering designers with seamless
                                    palettes, gradients, and extraction worldwide.
                                </p>
                                <div className="flex gap-2">
                                    {socialLinks.map((link) => (
                                        <Button size="icon" variant="outline" className="size-8 border-slate-200 hover:bg-slate-50" key={link.title}>
                                            <link.icon className="size-4 text-slate-600" />
                                        </Button>
                                    ))}
                                </div>
                            </AnimatedContainer>
                            {footerLinkGroups.map((group, index) => (
                                <AnimatedContainer
                                    key={group.label}
                                    delay={0.1 + index * 0.1}
                                    className="w-full"
                                >
                                    <div className="mb-10 md:mb-0">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">{group.label}</h3>
                                        <ul className="text-slate-500 mt-4 space-y-2 text-sm md:text-xs lg:text-sm">
                                            {group.links.map((link) => (
                                                <li key={link.title}>
                                                    <a
                                                        href={link.href}
                                                        className="hover:text-blue-600 inline-flex items-center transition-all duration-300"
                                                    >
                                                        {link.icon && <link.icon className="me-1 size-4" />}
                                                        {link.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimatedContainer>
                            ))}
                        </div>
                        <div className="text-slate-400 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-6 text-sm md:flex-row z-10">
                            <p>© 2026 A-Chroma, Inc. All rights reserved.</p>
                            <p>Designed for Creators.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const socialLinks = [
    { title: 'Facebook', href: '#', icon: FacebookIcon },
    { title: 'Instagram', href: '#', icon: InstagramIcon },
    { title: 'Youtube', href: '#', icon: YoutubeIcon },
    { title: 'LinkedIn', href: '#', icon: LinkedinIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
    {
        label: 'Products',
        links: [
            { title: 'Palette Generator', href: '/generator' },
            { title: 'Image Picker', href: '/picker' },
            { title: 'Gradient Maker', href: '/gradient' },
            { title: 'Contrast Checker', href: '#' },
        ],
    },
    {
        label: 'Resources',
        links: [
            { title: 'Color Theory', href: '#' },
            { title: 'Accessibility', href: '#' },
            { title: 'Blog', href: '#' },
            { title: 'Community', href: '#' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'About Us', href: '#' },
            { title: 'Privacy', href: '#' },
            { title: 'Terms', href: '#' },
            { title: 'Contact', href: '#' },
        ],
    },
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
    children?: React.ReactNode;
    delay?: number;
};

function AnimatedContainer({
    delay = 0.1,
    children,
    ...props
}: AnimatedContainerProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return children;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
