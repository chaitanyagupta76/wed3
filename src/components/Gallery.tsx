"use client";

import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";

const SLIDESHOW_INTERVAL = 3500;
const LIGHTBOX_INTERVAL  = 3000;

export default function Gallery() {
    const { content } = useLanguage();
    const galleryImages = images.gallery || [];

    // ── Shared animation variants ───────────────────────────────
    const variants = {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 100 : -100, scale: 1.04 }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -100 : 100, scale: 0.96 }),
    };

    // ── Top Slideshow ───────────────────────────────────────────
    const [slideIndex, setSlideIndex]   = useState(0);
    const [isPlaying, setIsPlaying]     = useState(true);
    const [direction, setDirection]     = useState(1);

    const goToSlide = useCallback((next: number, dir: number) => {
        setDirection(dir);
        setSlideIndex((next + galleryImages.length) % galleryImages.length);
    }, [galleryImages.length]);

    const slideNext = useCallback(() => goToSlide(slideIndex + 1,  1), [slideIndex, goToSlide]);
    const slidePrev = useCallback(() => goToSlide(slideIndex - 1, -1), [slideIndex, goToSlide]);

    useEffect(() => {
        if (!isPlaying) return;
        const t = setTimeout(slideNext, SLIDESHOW_INTERVAL);
        return () => clearTimeout(t);
    }, [isPlaying, slideNext]);

    // ── Lightbox ────────────────────────────────────────────────
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [lbDirection, setLbDirection]     = useState(1);
    const [lbPlaying, setLbPlaying]         = useState(true);
    const lbTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // helpers that update direction then index
    const lbGoNext = useCallback(() => {
        setLbDirection(1);
        setSelectedIndex(i => i !== null ? (i + 1) % galleryImages.length : i);
    }, [galleryImages.length]);

    const lbGoPrev = useCallback(() => {
        setLbDirection(-1);
        setSelectedIndex(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : i);
    }, [galleryImages.length]);

    const openLightbox  = (index: number) => { setSelectedIndex(index); setLbDirection(1); setLbPlaying(true); };
    const closeLightbox = () => { setSelectedIndex(null); setLbPlaying(false); };

    // Lightbox autoplay
    useEffect(() => {
        if (!lbPlaying || selectedIndex === null) return;
        lbTimerRef.current = setTimeout(lbGoNext, LIGHTBOX_INTERVAL);
        return () => { if (lbTimerRef.current) clearTimeout(lbTimerRef.current); };
    }, [lbPlaying, lbGoNext, selectedIndex]);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowRight') { setLbPlaying(false); lbGoNext(); }
            if (e.key === 'ArrowLeft')  { setLbPlaying(false); lbGoPrev(); }
            if (e.key === 'Escape')     closeLightbox();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedIndex, lbGoNext, lbGoPrev]);

    return (
        <section id="gallery" className="py-24 bg-ivory">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-sm tracking-[0.2em] font-medium uppercase text-gold mb-2 font-sans">
                        {content.gallery?.title || "GALLERY"}
                    </h2>
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <span className="w-12 h-[1px] bg-gold/50"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                        <span className="w-12 h-[1px] bg-gold/50"></span>
                    </div>
                    <p className="font-script text-3xl text-textDark">
                        {content.gallery?.subtitle || "Moments We Cherish"}
                    </p>
                </motion.div>

                {/* ── Top Autoplay Slideshow ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-champagne/40 mb-16"
                    style={{ aspectRatio: '16/7' }}
                >
                    <AnimatePresence custom={direction} initial={false} mode="popLayout">
                        <motion.img
                            key={slideIndex}
                            src={galleryImages[slideIndex]}
                            alt={`Slide ${slideIndex + 1}`}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                    <button onClick={() => { slidePrev(); setIsPlaying(false); }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all duration-200">
                        <FiChevronLeft size={20} />
                    </button>
                    <button onClick={() => { slideNext(); setIsPlaying(false); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all duration-200">
                        <FiChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 z-10">
                        <div className="flex items-center gap-1.5">
                            {galleryImages.map((_, i) => (
                                <button key={i}
                                    onClick={() => { goToSlide(i, i > slideIndex ? 1 : -1); setIsPlaying(false); }}
                                    className={`rounded-full transition-all duration-300 ${i === slideIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
                                />
                            ))}
                        </div>
                        <button onClick={() => setIsPlaying(p => !p)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all duration-200 ml-2">
                            {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
                        </button>
                    </div>

                    {isPlaying && (
                        <motion.div key={slideIndex}
                            className="absolute top-0 left-0 h-[3px] bg-gold z-10"
                            initial={{ width: "0%" }} animate={{ width: "100%" }}
                            transition={{ duration: SLIDESHOW_INTERVAL / 1000, ease: "linear" }}
                        />
                    )}
                </motion.div>

                {/* ── Gallery Grid ── */}
                <div className="columns-2 md:columns-3 gap-4">
                    {galleryImages.map((imageSrc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="break-inside-avoid mb-4 overflow-hidden rounded-2xl shadow-md border border-champagne/30 cursor-pointer group relative inline-block w-full"
                            onClick={() => openLightbox(index)}
                        >
                            <img src={imageSrc} alt={`Gallery image ${index + 1}`}
                                className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-textDark/0 group-hover:bg-textDark/20 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">✦</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] bg-black/92 flex flex-col items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Gold progress bar */}
                        {lbPlaying && (
                            <motion.div
                                key={`lb-bar-${selectedIndex}`}
                                className="absolute top-0 left-0 h-[3px] bg-gold z-[120]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: LIGHTBOX_INTERVAL / 1000, ease: "linear" }}
                            />
                        )}

                        {/* Top bar: dot indicators + play/pause + close */}
                        <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-5 z-[110]">
                            {/* Dots */}
                            <div className="flex items-center gap-1.5">
                                {galleryImages.map((_, i) => (
                                    <button key={i}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLbDirection(i > (selectedIndex ?? 0) ? 1 : -1);
                                            setSelectedIndex(i);
                                            setLbPlaying(false);
                                        }}
                                        className={`rounded-full transition-all duration-300 ${i === selectedIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
                                    />
                                ))}
                            </div>

                            {/* Play/Pause + Close */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setLbPlaying(p => !p); }}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-all duration-200"
                                    aria-label={lbPlaying ? "Pause" : "Play"}
                                >
                                    {lbPlaying ? <FiPause size={15} /> : <FiPlay size={15} />}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-lg backdrop-blur-sm transition-all duration-200"
                                >
                                    <FiX />
                                </button>
                            </div>
                        </div>

                        {/* Prev */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLbPlaying(false); lbGoPrev(); }}
                            className="absolute left-4 md:left-8 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl backdrop-blur-sm transition-all duration-200"
                        >
                            <FiChevronLeft />
                        </button>

                        {/* Image */}
                        <div className="relative flex items-center justify-center w-full h-full px-16 md:px-24"
                            onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence custom={lbDirection} mode="popLayout">
                                <motion.img
                                    key={selectedIndex}
                                    src={galleryImages[selectedIndex]}
                                    alt={`Gallery image ${selectedIndex + 1}`}
                                    custom={lbDirection}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                                    className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLbPlaying(false); lbGoNext(); }}
                            className="absolute right-4 md:right-8 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl backdrop-blur-sm transition-all duration-200"
                        >
                            <FiChevronRight />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest font-sans">
                            {selectedIndex + 1} / {galleryImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
