"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const { content } = useLanguage();

    useEffect(() => {
        // Prevent scrolling while splash screen is active
        document.body.style.overflow = "hidden";

        // Hide splash screen after delay
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Allow scrolling again
            document.body.style.overflow = "auto";
            // Notify parent component
            setTimeout(onComplete, 1000); // Wait for exit animation
        }, 2500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory overflow-hidden"
                >
                    {/* Floral Corner Decorations */}
                    <img
                        src={images.floralCorner}
                        alt=""
                        className="absolute top-0 right-0 w-32 md:w-56 z-10 pointer-events-none opacity-60"
                    />
                    <img
                        src={images.floralCorner}
                        alt=""
                        className="absolute bottom-0 left-0 w-32 md:w-56 z-10 pointer-events-none opacity-60 transform rotate-180"
                    />

                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-ivory via-peach/20 to-champagne/30 -z-10"></div>

                    <div className="relative z-20 flex flex-col items-center">
                        {/* Animated Rings Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                {/* SVG for interlocking wedding rings */}
                                <svg
                                    viewBox="0 0 100 100"
                                    className="w-20 h-20 text-gold"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                >
                                    <circle cx="35" cy="50" r="25" className="animate-ring-spin origin-[35px_50px]" />
                                    <circle cx="65" cy="50" r="25" className="animate-ring-spin origin-[65px_50px]" style={{ animationDelay: '0.2s' }} />
                                    {/* Diamond detail */}
                                    <path d="M 35 25 L 40 20 L 45 25 L 40 30 Z" fill="currentColor" stroke="none" className="animate-pulse" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Couple's Names */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-center"
                        >
                            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-goldLight mb-3 font-sans font-medium">
                                {content.hero.title}
                            </p>
                            <h1 className="font-script text-5xl md:text-7xl text-textDark mb-4 relative inline-block">
                                <span className="relative z-10">{content.hero.couple}</span>
                                {/* Shimmer effect overlay */}
                                <span
                                    className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-gold/30 to-transparent bg-[length:200%_100%] animate-shimmer"
                                    style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}
                                >
                                    {content.hero.couple}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Loading Dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="mt-8 flex items-center justify-center gap-2"
                        >
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-gold animate-dot-pulse"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
