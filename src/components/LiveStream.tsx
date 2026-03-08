"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { motion } from "framer-motion";

export default function LiveStream() {
    const { content } = useLanguage();

    return (
        <section id="liveStream" className="py-24 bg-textDark text-ivory">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4 px-4 py-1.5 rounded-full border border-rose/30 bg-rose/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose animate-pulse"></span>
                        <span className="text-xs uppercase tracking-widest text-rose">{content.liveStream.title}</span>
                    </div>

                    <h2 className="font-script text-4xl md:text-5xl mt-4 mb-6 leading-tight">
                        {content.liveStream.description.split('\n')[0]} <br />
                        <span className="text-gold font-sans text-xl md:text-2xl font-light tracking-wide mt-2 block">
                            {content.liveStream.description.split('\n')[1]}
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative pb-[56.25%] h-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/20"
                >
                    <iframe
                        src={content.liveStream.embedUrl}
                        title={content.liveStream.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12"
                >
                    <a
                        href={content.liveStream.embedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-10 py-3 bg-gold text-textDark font-medium text-sm tracking-widest uppercase rounded-full hover:bg-rose transition-colors duration-300"
                    >
                        {content.liveStream.cta}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
