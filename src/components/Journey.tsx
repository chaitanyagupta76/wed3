"use client";

import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";
import { motion } from "framer-motion";

export default function Journey() {
    const { content } = useLanguage();

    return (
        <section id="journey" className="py-24 bg-peach/20">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm tracking-[0.2em] font-medium uppercase text-gold mb-2 font-sans">
                        {content.journey.title}
                    </h2>
                    <div className="flex justify-center items-center gap-4">
                        <span className="w-12 h-[1px] bg-gold/50"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                        <span className="w-12 h-[1px] bg-gold/50"></span>
                    </div>
                </motion.div>

                <div className="relative">
                    {/* Timeline Center Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10 hidden md:block"></div>

                    {content.journey.events.map((event, index) => {
                        const journeyImage = images.journeyImages?.[index];
                        return (
                            <div
                                key={index}
                                className={`flex flex-col-reverse md:flex-row items-center justify-between mb-20 relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Image side */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="w-full md:w-5/12 mt-6 md:mt-0"
                                >
                                    {journeyImage && (
                                        <div className="overflow-hidden rounded-2xl shadow-lg border-2 border-champagne/30">
                                            <img
                                                src={journeyImage}
                                                alt={event.title}
                                                className="w-full h-72 md:h-80 object-cover object-top hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    )}
                                </motion.div>

                                {/* Timeline Dot */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-gold rounded-full border-4 border-ivory z-10 shadow-sm"></div>

                                {/* Text side */}
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className={`w-full md:w-5/12 bg-ivory p-8 shadow-md rounded-2xl border border-champagne/40 relative ${index % 2 === 0 ? "text-left" : "text-left md:text-right"
                                        }`}
                                >
                                    {/* Mobile Dot */}
                                    <div className="md:hidden w-3 h-3 bg-gold rounded-full absolute -top-1.5 left-8"></div>

                                    <p className="text-xs tracking-[0.2em] text-gold mb-2 uppercase font-sans font-medium">
                                        {event.date}
                                    </p>
                                    <h3 className="font-script text-3xl text-textDark mb-3">
                                        {event.title}
                                    </h3>
                                    <p className="text-textLight leading-relaxed text-sm">
                                        {event.description}
                                    </p>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
