"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { content, lang } = useLanguage();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === "en" ? "te" : "en";
        router.push(`/?lang=${newLang}`);
    };

    const navItems = [
        { label: content.nav.home, href: "#home" },
        { label: content.nav.brideGroom, href: "#brideGroom" },
        { label: content.nav.journey, href: "#journey" },
        { label: content.nav.venue, href: "#venue" },
        { label: content.nav.liveStream, href: "#liveStream" },
        { label: content.nav.gallery, href: "#gallery" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-ivory/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
                {/* Logo area */}
                <Link href={`/?lang=${lang}`} className="font-script text-3xl text-gold">
                    {content.hero.couple.split("&")[0].trim()[0]} & {content.hero.couple.split("&")[1].trim()[0]}
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = document.querySelector(item.href);
                                if (target) {
                                    target.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="text-xs tracking-[0.15em] uppercase text-textDark hover:text-gold transition-colors font-sans"
                        >
                            {item.label}
                        </a>
                    ))}

                    {/* Language Switch */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-gold/40 rounded-full text-xs tracking-wider uppercase text-gold hover:bg-gold hover:text-ivory transition-all duration-300 font-sans"
                        aria-label="Switch language"
                    >
                        <FiGlobe className="text-sm" />
                        {lang === "en" ? "తెలుగు" : "EN"}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-2xl text-textDark"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-ivory border-t border-champagne"
                    >
                        <div className="flex flex-col items-center py-6 gap-5">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                        const target = document.querySelector(item.href);
                                        if (target) {
                                            setTimeout(() => {
                                                target.scrollIntoView({ behavior: "smooth" });
                                            }, 100);
                                        }
                                    }}
                                    className="text-sm tracking-widest uppercase text-textDark font-sans block w-full text-center py-2"
                                >
                                    {item.label}
                                </a>
                            ))}

                            {/* Mobile Language Switch */}
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-2 px-4 py-2 border border-gold/40 rounded-full text-sm text-gold font-sans"
                            >
                                <FiGlobe />
                                {lang === "en" ? "తెలుగు" : "English"}
                            </button>


                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
