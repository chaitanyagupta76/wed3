"use client";

import { useState } from "react";
import sectionsConfig from "@/data/sections.json";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Gallery from "@/components/Gallery";
import WaitingPresence from "@/components/WaitingPresence";
import LiveStream from "@/components/LiveStream";
import AudioInviteButton from "@/components/AudioInviteButton";
import SplashScreen from "@/components/SplashScreen";
import FallingPetals from "@/components/FallingPetals";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Falling petals — site-wide fixed overlay */}
      <FallingPetals count={8} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-ivory font-sans overflow-x-hidden selection:bg-gold selection:text-ivory"
      >
        <Navbar />

        {/* Hero includes BrideGroom cards, Venue card, LiveStream card, and Countdown */}
        {sectionsConfig.hero && <Hero />}

        {sectionsConfig.journey && <Journey />}
        {sectionsConfig.gallery && <Gallery />}
        {sectionsConfig.liveStream && <LiveStream />}
        {sectionsConfig.waitingForPresence && <WaitingPresence />}

        {sectionsConfig.audioInvite && <AudioInviteButton />}
        <Footer />
      </motion.main>
    </>
  );
}

