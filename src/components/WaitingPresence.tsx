"use client";

import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";
import { motion } from "framer-motion";

const CornerDecor = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 20 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20V0H20" stroke="currentColor" strokeWidth="1" />
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    </svg>
);

export default function WaitingPresence() {
    const { content } = useLanguage();
    const parents = (images as Record<string, unknown>).parents as Record<string, string> | undefined;

    return (
        <section id="rsvp" className="py-24 bg-ivory text-center relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(223,177,99,0.05)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                {/* Parents Section */}
                {content.waitingPresence.parentsTitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <h3 className="text-sm tracking-[0.2em] uppercase text-gold mb-2 font-sans font-medium">
                            {content.waitingPresence.parentsTitle}
                        </h3>
                        <div className="flex justify-center items-center gap-4 mb-10">
                            <span className="w-12 h-[1px] bg-gold/50"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                            <span className="w-12 h-[1px] bg-gold/50"></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                            {/* Groom's Parents */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-white/40 backdrop-blur-sm rounded-3xl p-10 border border-gold/10 shadow-sm flex flex-col items-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gold/20"></div>

                                <p className="text-xs tracking-[0.2em] uppercase text-gold/80 mb-8 font-sans font-semibold">
                                    {content.waitingPresence.groomParents?.label}
                                </p>

                                {/* Elegant Square photo frame */}
                                <div className="relative mb-8 p-3">
                                    {/* Corner Accents */}
                                    <CornerDecor className="absolute top-0 left-0 w-6 h-6 text-gold/60" />
                                    <CornerDecor className="absolute top-0 right-0 w-6 h-6 text-gold/60 transform rotate-90" />
                                    <CornerDecor className="absolute bottom-0 left-0 w-6 h-6 text-gold/60 transform -rotate-90" />
                                    <CornerDecor className="absolute bottom-0 right-0 w-6 h-6 text-gold/60 transform rotate-180" />

                                    <div className="w-60 h-44 rounded-lg overflow-hidden border border-gold/30 shadow-2xl relative z-10 bg-ivory">
                                        <div className="absolute inset-0 bg-gold/5 group-hover:bg-transparent transition-colors duration-500 z-20"></div>
                                        <img
                                            src={parents?.groomFamily || "/images/groom_family.png"}
                                            alt={content.waitingPresence.groomParents?.label}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                <p className="font-script text-lg md:text-2xl text-textDark text-center leading-relaxed flex flex-wrap justify-center items-center">
                                    <span className="whitespace-nowrap">{content.waitingPresence.groomParents?.father}</span>
                                    <span className="text-gold/60 mx-2 italic text-lg">&</span>
                                    <span className="whitespace-nowrap">{content.waitingPresence.groomParents?.mother}</span>
                                </p>
                            </motion.div>

                            {/* Bride's Parents */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white/40 backdrop-blur-sm rounded-3xl p-10 border border-gold/10 shadow-sm flex flex-col items-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gold/20"></div>

                                <p className="text-xs tracking-[0.2em] uppercase text-gold/80 mb-8 font-sans font-semibold">
                                    {content.waitingPresence.brideParents?.label}
                                </p>

                                {/* Elegant Square photo frame */}
                                <div className="relative mb-8 p-3">
                                    {/* Corner Accents */}
                                    <CornerDecor className="absolute top-0 left-0 w-6 h-6 text-gold/60" />
                                    <CornerDecor className="absolute top-0 right-0 w-6 h-6 text-gold/60 transform rotate-90" />
                                    <CornerDecor className="absolute bottom-0 left-0 w-6 h-6 text-gold/60 transform -rotate-90" />
                                    <CornerDecor className="absolute bottom-0 right-0 w-6 h-6 text-gold/60 transform rotate-180" />

                                    <div className="w-60 h-44 rounded-lg overflow-hidden border border-gold/30 shadow-2xl relative z-10 bg-ivory">
                                        <div className="absolute inset-0 bg-gold/5 group-hover:bg-transparent transition-colors duration-500 z-20"></div>
                                        <img
                                            src={parents?.brideFamily || "/images/bride_family.png"}
                                            alt={content.waitingPresence.brideParents?.label}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                <p className="font-script text-lg md:text-2xl text-textDark text-center leading-relaxed flex flex-wrap justify-center items-center">
                                    <span className="whitespace-nowrap">{content.waitingPresence.brideParents?.father}</span>
                                    <span className="text-gold/60 mx-2 italic text-lg">&</span>
                                    <span className="whitespace-nowrap">{content.waitingPresence.brideParents?.mother}</span>
                                </p>
                            </motion.div>


                        </div>
                    </motion.div>
                )}

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-16"
                >
                    <div className="flex justify-center items-center gap-4 mb-10">
                        <span className="w-16 h-[1px] bg-gold/30"></span>
                        <div className="w-2 h-2 rounded-full border border-gold flex items-center justify-center">
                            <div className="w-0.5 h-0.5 rounded-full bg-gold"></div>
                        </div>
                        <span className="w-16 h-[1px] bg-gold/30"></span>
                    </div>

                    <h2 className="font-script text-xl md:text-5xl text-textDark mb-12 leading-relaxed md:leading-relaxed max-w-3xl mx-auto px-4 whitespace-pre-line">
                        &ldquo;{content.waitingPresence.message}&rdquo;
                    </h2>

                    <div className="flex justify-center items-center gap-4">
                        <span className="w-16 h-[1px] bg-gold/30"></span>
                        <div className="w-2 h-2 rounded-full border border-gold flex items-center justify-center">
                            <div className="w-0.5 h-0.5 rounded-full bg-gold"></div>
                        </div>
                        <span className="w-16 h-[1px] bg-gold/30"></span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
