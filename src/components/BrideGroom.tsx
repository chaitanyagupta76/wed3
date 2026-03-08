"use client";

import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";
import { motion } from "framer-motion";

export default function BrideGroom() {
    const { content } = useLanguage();

    return (
        <section id="brideGroom" className="py-24 bg-peach/30">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm tracking-[0.2em] font-medium uppercase text-gold mb-2">
                        {content.brideGroom.title}
                    </h2>
                    <div className="flex justify-center items-center gap-4">
                        <span className="w-12 h-[1px] bg-gold/50"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                        <span className="w-12 h-[1px] bg-gold/50"></span>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 md:gap-8 relative">
                    {/* Decorative center element for desktop */}
                    <div className="hidden md:absolute md:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-script text-gold z-10 w-16 h-16 bg-ivory rounded-full items-center justify-center shadow-sm">
                        &
                    </div>

                    {/* Bride Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-ivory rounded-tr-[4rem] rounded-bl-[4rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center relative overflow-hidden group"
                    >
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-champagne mb-6 relative">
                            <img
                                src={images.brideImage}
                                alt={content.brideGroom.bride.name}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <h3 className="font-script text-4xl text-textDark mb-2">
                            {content.brideGroom.bride.name}
                        </h3>
                        <p className="text-rose font-medium tracking-widest uppercase text-sm mb-4">
                            {content.brideGroom.bride.description}
                        </p>
                        <p className="text-textLight text-sm italic">
                            {content.brideGroom.bride.parents}
                        </p>
                    </motion.div>

                    {/* Groom Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-ivory rounded-tl-[4rem] rounded-br-[4rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center relative overflow-hidden group"
                    >
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-champagne mb-6 relative">
                            <img
                                src={images.groomImage}
                                alt={content.brideGroom.groom.name}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <h3 className="font-script text-4xl text-textDark mb-2">
                            {content.brideGroom.groom.name}
                        </h3>
                        <p className="text-rose font-medium tracking-widest uppercase text-sm mb-4">
                            {content.brideGroom.groom.description}
                        </p>
                        <p className="text-textLight text-sm italic">
                            {content.brideGroom.groom.parents}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
