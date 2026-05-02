"use client";

import { useLanguage } from "@/context/LanguageProvider";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
    const { content } = useLanguage();
    const coupleName = content.hero.couple;

    return (
        <footer className="w-full bg-champagne/20 py-8 text-center border-t border-gold/20">
            <div className="container mx-auto px-4 flex flex-col items-center gap-2">
                <p className="text-textDark font-sans text-sm md:text-base flex items-center justify-center gap-1.5 flex-wrap">
                    Made with <FaHeart className="text-[#d83535] animate-pulse mx-1" /> for{" "}
                    <span className="font-script text-xl md:text-2xl text-gold px-1">
                        {coupleName}
                    </span>
                    by{" "}
                    <Link
                        href="https://www.eventmacha.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-gold hover:text-goldLight transition-colors underline decoration-gold/30 underline-offset-4 ml-1"
                    >
                        Eventmacha.com
                    </Link>
                </p>
                <div className="w-16 h-[1px] bg-gold/50 mt-4 rounded-full" />
            </div>
        </footer>
    );
}
