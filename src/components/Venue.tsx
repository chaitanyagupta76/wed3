"use client";

import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";

export default function Venue() {
    const { content } = useLanguage();

    return (
        <section id="venue" className="py-24 bg-peach/20">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="bg-ivory shadow-lg rounded-[2rem] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row relative">

                    <div className="md:w-1/2 h-80 md:h-auto relative">
                        <img
                            src={images.venueImage}
                            alt={content.venue.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-textDark/20"></div>
                    </div>

                    <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center border-l-8 border-gold/20 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="absolute -top-16 right-10 md:-left-16 md:right-auto md:top-1/2 md:-translate-y-1/2 w-32 h-32 rounded-full bg-ivory shadow-xl border-4 border-gold/30 flex items-center justify-center flex-col z-10"
                        >
                            <h4 className="text-sm uppercase tracking-widest text-gold mb-1">Date</h4>
                            <p className="font-script text-2xl text-textDark">10 Dec</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-sm tracking-[0.2em] font-medium uppercase text-gold mb-4">
                                {content.venue.title}
                            </h2>
                            <h3 className="font-script text-5xl text-textDark mb-6 capitalize">
                                {content.venue.name}
                            </h3>

                            <div className="space-y-4 mb-10 text-textLight">
                                <div className="flex items-center gap-4">
                                    <FiMapPin className="text-xl text-rose" />
                                    <p>{content.venue.address}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FiCalendar className="text-xl text-rose" />
                                    <p>{content.venue.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FiClock className="text-xl text-rose" />
                                    <p>{content.venue.time}</p>
                                </div>
                            </div>

                            <a
                                href={content.venue.mapLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block px-8 py-3 bg-textDark text-ivory text-sm tracking-widest uppercase rounded-full hover:bg-gold transition-colors duration-300 shadow-md"
                            >
                                {content.venue.cta}
                            </a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
