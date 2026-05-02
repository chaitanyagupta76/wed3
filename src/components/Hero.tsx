"use client";

import { useLanguage } from "@/context/LanguageProvider";
import images from "@/data/images.json";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
    const { content } = useLanguage();


    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const dateParts = content.hero.date.split('-');
        let targetDate = 0;

        if (dateParts.length === 3) {
            const [day, month, year] = dateParts;
            // Create a date object in YYYY-MM-DD format which is more reliably parsed
            targetDate = new Date(`${year}-${month}-${day}T00:00:00`).getTime();
        } else {
            targetDate = new Date(content.hero.date).getTime();
        }

        const timer = setTimeout(() => setMounted(true), 0);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (isNaN(distance) || distance < 0) {
                clearInterval(interval);
                return;
            }
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                secs: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [content.hero.date]);

    return (
        <section id="home" className="relative min-h-screen w-full overflow-hidden">
            {/* Floral Corner Decorations */}
            <img
                src={images.floralCorner}
                alt=""
                className="absolute top-0 right-0 w-32 md:w-44 lg:w-56 z-10 pointer-events-none opacity-60"
            />
            <img
                src={images.floralCorner}
                alt=""
                className="absolute bottom-0 left-0 w-24 md:w-36 z-10 pointer-events-none opacity-40 transform rotate-180"
            />

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-ivory via-peach/20 to-champagne/30 -z-10"></div>

            <div className="container mx-auto px-6 max-w-7xl pt-28 pb-10 md:pb-8">
                {/* Main Hero: Split Layout */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 lg:mb-20">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 text-center lg:text-left z-10"
                    >
                        <p className="text-sm md:text-base tracking-[0.25em] uppercase text-textLight mb-4 font-sans">
                            {content.hero.title}
                        </p>
                        <h1 className="font-script text-4xl md:text-7xl lg:text-8xl text-textDark mb-4 leading-tight">
                            {content.hero.couple}
                        </h1>
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                            <span className="h-[1px] w-12 bg-gold"></span>
                            <p className="text-base md:text-lg text-textDark tracking-[0.2em] uppercase font-sans font-medium">
                                {content.hero.date}
                            </p>
                            <span className="h-[1px] w-12 bg-gold"></span>
                        </div>
                    </motion.div>

                    {/* Right: Couple Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="lg:w-1/2 relative z-10"
                    >
                        <div className="relative w-full max-w-lg mx-auto">
                            <img
                                src={images.heroImage}
                                alt="Wedding Couple"
                                className="w-full max-h-[480px] lg:max-h-[520px] rounded-tl-[5rem] rounded-br-[5rem] shadow-2xl object-cover"
                            />
                            {/* Gold border accent */}
                            <div className="absolute -inset-2 border-2 border-gold/20 rounded-tl-[5rem] rounded-br-[5rem] -z-10"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Three Info Cards Row */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {/* Card 1: Bride & Groom */}
                    <div id="brideGroom" className="bg-ivory rounded-2xl p-5 shadow-md border border-champagne/60 text-center">
                        {/* Card Header */}
                        <div className="flex items-center justify-center gap-2 mb-5">
                            <span className="w-8 h-[1px] bg-gold/40"></span>
                            <h3 className="text-xs tracking-[0.2em] uppercase text-textLight font-sans font-medium">
                                {content.brideGroom.title}
                            </h3>
                            <span className="w-8 h-[1px] bg-gold/40"></span>
                        </div>

                        {/* Profiles Row */}
                        <div className="flex items-stretch justify-center gap-3">
                            {/* Groom */}
                            <div className="flex flex-col items-center flex-1 h-full justify-start min-w-0">
                                <div
                                    className="w-full aspect-[3/4] overflow-hidden border-2 border-champagne/80 shadow-sm mb-3"
                                    style={{ borderRadius: '50% 50% 0 0 / 30% 30% 0 0', transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
                                >
                                    <img
                                        src={images.groomImage}
                                        alt={content.brideGroom.groom.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <span className="text-[9px] tracking-[0.2em] uppercase text-gold font-semibold mb-0.5">{content.brideGroom.groomLabel}</span>
                                <p className="font-script text-2xl text-textDark leading-tight">{content.brideGroom.groom.name}</p>
                                <div className="h-[1px] w-8 bg-gold/30 my-1.5 mx-auto"></div>
                                <div className="text-[10px] text-textLight leading-snug px-1 text-center w-full">
                                    {content.brideGroom.groom.parents.split('\n').map((line: string, i: number) => (
                                        <span key={i} className="block whitespace-nowrap">{line.trim()}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Heart Divider */}
                            <div className="flex flex-col items-center justify-center pt-16 px-1 flex-shrink-0">
                                <span className="text-rose text-lg">❤</span>
                                <div className="h-10 w-[1px] bg-gold/20 mt-1"></div>
                            </div>

                            {/* Bride */}
                            <div className="flex flex-col items-center flex-1 h-full justify-start min-w-0">
                                <div
                                    className="w-full aspect-[3/4] overflow-hidden border-2 border-champagne/80 shadow-sm mb-3"
                                    style={{ borderRadius: '50% 50% 0 0 / 30% 30% 0 0', transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
                                >
                                    <img
                                        src={images.brideImage}
                                        alt={content.brideGroom.bride.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <span className="text-[9px] tracking-[0.2em] uppercase text-gold font-semibold mb-0.5">{content.brideGroom.brideLabel}</span>
                                <p className="font-script text-2xl text-textDark leading-tight">{content.brideGroom.bride.name}</p>
                                <div className="h-[1px] w-8 bg-gold/30 my-1.5 mx-auto"></div>
                                <div className="text-[10px] text-textLight leading-snug px-1 text-center w-full">
                                    {content.brideGroom.bride.parents.split('\n').map((line: string, i: number) => (
                                        <span key={i} className="block whitespace-nowrap">{line.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Venue */}
                    <div id="venue" className="bg-ivory rounded-2xl p-6 shadow-md border border-champagne/60 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-8 h-[1px] bg-gold/40"></span>
                            <h3 className="text-xs tracking-[0.2em] uppercase text-textLight font-sans font-medium">
                                {content.venue.title}
                            </h3>
                            <span className="w-8 h-[1px] bg-gold/40"></span>
                        </div>
                        <div className="w-full h-28 rounded-xl overflow-hidden mb-4">
                            <img src={images.venueImage} alt={content.venue.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-script text-2xl text-textDark mb-1">{content.venue.name}</h4>
                        <p className="text-sm text-textLight mb-2">{content.venue.address}</p>
                        <div className="flex items-center justify-center gap-4 text-xs text-textLight mb-4">
                            <span className="flex items-center gap-1">📅 {content.venue.date}</span>
                            <span className="flex items-center gap-1">⏰ {content.venue.time}</span>
                        </div>
                        <a
                            href={content.venue.mapLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block px-6 py-2 border-2 border-textDark text-textDark text-xs tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-textDark hover:text-ivory transition-all duration-300"
                        >
                            {content.venue.cta}
                        </a>
                    </div>

                    {/* Card 3: Reception */}
                    <div id="reception" className="bg-ivory rounded-2xl p-6 shadow-md border border-champagne/60 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-8 h-[1px] bg-gold/40"></span>
                            <h3 className="text-xs tracking-[0.2em] uppercase text-textLight font-sans font-medium">
                                {content.reception.title}
                            </h3>
                            <span className="w-8 h-[1px] bg-gold/40"></span>
                        </div>
                        <div className="w-full h-28 rounded-xl overflow-hidden mb-4">
                            <img src={images.venueImage} alt={content.reception.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-script text-2xl text-textDark mb-1">{content.reception.name}</h4>
                        <p className="text-sm text-textLight mb-2">{content.reception.address}</p>
                        <div className="flex items-center justify-center gap-4 text-xs text-textLight mb-4">
                            <span className="flex items-center gap-1">📅 {content.reception.date}</span>
                            <span className="flex items-center gap-1">⏰ {content.reception.time}</span>
                        </div>
                        <a
                            href={content.reception.mapLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block px-6 py-2 border-2 border-textDark text-textDark text-xs tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-textDark hover:text-ivory transition-all duration-300"
                        >
                            {content.reception.cta}
                        </a>
                    </div>
                </motion.div>

                {/* Countdown + RSVP Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6 bg-ivory/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-champagne/40"
                >
                    {/* Countdown */}
                    <div className="flex items-center gap-6">
                        <p className="text-xs md:text-sm uppercase tracking-widest text-textLight font-sans hidden sm:block">
                            {content.hero.countdown}
                        </p>
                        {mounted && (
                            <div className="flex gap-3">
                                {[
                                    { val: timeLeft.days, label: "Days" },
                                    { val: timeLeft.hours, label: "Hours" },
                                    { val: timeLeft.mins, label: "Mins" },
                                    { val: timeLeft.secs, label: "Secs" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex flex-col items-center bg-peach/40 border border-champagne rounded-lg px-3 py-2 min-w-[50px]"
                                    >
                                        <span className="text-xl md:text-2xl font-semibold text-textDark font-sans">{item.val}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-textLight">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
