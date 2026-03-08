import sectionsConfig from "@/data/sections.json";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Gallery from "@/components/Gallery";
import WaitingPresence from "@/components/WaitingPresence";
import AudioInviteButton from "@/components/AudioInviteButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory font-sans overflow-x-hidden selection:bg-gold selection:text-ivory">
      <Navbar />

      {/* Hero includes BrideGroom cards, Venue card, LiveStream card, and Countdown */}
      {sectionsConfig.hero && <Hero />}

      {sectionsConfig.journey && <Journey />}
      {sectionsConfig.gallery && <Gallery />}
      {sectionsConfig.waitingForPresence && <WaitingPresence />}

      {sectionsConfig.audioInvite && <AudioInviteButton />}
    </main>
  );
}
