"use client";

import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Gallery() {
    const { content } = useLanguage();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const galleryImages = images.gallery || [];

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);
    const goNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % galleryImages.length);
        }
    };
    const goPrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
        }
    };

    return (
        <section id="gallery" className="py-24 bg-ivory">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
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

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((imageSrc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`overflow-hidden rounded-2xl shadow-md border border-champagne/30 cursor-pointer group relative ${index === 0 || index === 5 ? "md:row-span-2" : ""
                                }`}
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={imageSrc}
                                alt={`Gallery image ${index + 1}`}
                                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${index === 0 || index === 5 ? "h-full min-h-[280px] md:min-h-[400px]" : "h-48 md:h-64"
                                    }`}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-textDark/0 group-hover:bg-textDark/20 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    ✦
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-[110] transition-colors"
                        >
                            <FiX />
                        </button>

                        {/* Prev Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="absolute left-4 md:left-8 text-white/60 hover:text-white text-4xl z-[110] transition-colors"
                        >
                            <FiChevronLeft />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={selectedIndex}
                            src={galleryImages[selectedIndex]}
                            alt={`Gallery image ${selectedIndex + 1}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="absolute right-4 md:right-8 text-white/60 hover:text-white text-4xl z-[110] transition-colors"
                        >
                            <FiChevronRight />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest font-sans">
                            {selectedIndex + 1} / {galleryImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
