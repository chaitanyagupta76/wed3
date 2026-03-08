"use client";

import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";
import { motion } from "framer-motion";

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
                            {/* Bride's Parents */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-peach/30 rounded-2xl p-8 border border-champagne/50"
                            >
                                <p className="text-xs tracking-[0.15em] uppercase text-gold mb-6 font-sans font-medium">
                                    {content.waitingPresence.brideParents?.label}
                                </p>
                                <div className="flex items-center justify-center gap-6">
                                    {/* Father */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 mb-3 shadow-md">
                                            <img
                                                src={parents?.brideFather || "/images/bride-father.png"}
                                                alt={content.waitingPresence.brideParents?.father}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="font-script text-lg text-textDark">
                                            {content.waitingPresence.brideParents?.father}
                                        </p>
                                    </div>
                                    {/* Divider */}
                                    <span className="text-gold text-2xl font-light">&</span>
                                    {/* Mother */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 mb-3 shadow-md">
                                            <img
                                                src={parents?.brideMother || "/images/bride-mother.png"}
                                                alt={content.waitingPresence.brideParents?.mother}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="font-script text-lg text-textDark">
                                            {content.waitingPresence.brideParents?.mother}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Groom's Parents */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-peach/30 rounded-2xl p-8 border border-champagne/50"
                            >
                                <p className="text-xs tracking-[0.15em] uppercase text-gold mb-6 font-sans font-medium">
                                    {content.waitingPresence.groomParents?.label}
                                </p>
                                <div className="flex items-center justify-center gap-6">
                                    {/* Father */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 mb-3 shadow-md">
                                            <img
                                                src={parents?.groomFather || "/images/groom-father.png"}
                                                alt={content.waitingPresence.groomParents?.father}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="font-script text-lg text-textDark">
                                            {content.waitingPresence.groomParents?.father}
                                        </p>
                                    </div>
                                    {/* Divider */}
                                    <span className="text-gold text-2xl font-light">&</span>
                                    {/* Mother */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 mb-3 shadow-md">
                                            <img
                                                src={parents?.groomMother || "/images/groom-mother.png"}
                                                alt={content.waitingPresence.groomParents?.mother}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="font-script text-lg text-textDark">
                                            {content.waitingPresence.groomParents?.mother}
                                        </p>
                                    </div>
                                </div>
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
                >
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <span className="w-16 h-[1px] bg-gold/50"></span>
                        <span className="w-2 h-2 rounded-full bg-gold"></span>
                        <span className="w-16 h-[1px] bg-gold/50"></span>
                    </div>

                    <h2 className="font-script text-4xl md:text-5xl text-textDark mb-10 leading-relaxed md:leading-relaxed max-w-3xl mx-auto">
                        &ldquo;{content.waitingPresence.message}&rdquo;
                    </h2>

                    <div className="flex justify-center items-center gap-4">
                        <span className="w-16 h-[1px] bg-gold/50"></span>
                        <span className="w-2 h-2 rounded-full bg-gold"></span>
                        <span className="w-16 h-[1px] bg-gold/50"></span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
