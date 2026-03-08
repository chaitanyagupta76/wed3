"use client";

import { useState, useRef, useEffect } from "react";
import images from "@/data/images.json";
import { FiMusic, FiPause } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AudioInviteButton() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio object once
        audioRef.current = new Audio(images.audioInvitation);
        audioRef.current.loop = true;

        return () => {
            // Cleanup
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
            onClick={toggleAudio}
            className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-xl transition-all duration-300 border-2 ${isPlaying
                    ? "bg-ivory text-gold border-gold"
                    : "bg-gold text-ivory border-transparent"
                }`}
            aria-label={isPlaying ? "Pause music" : "Play music"}
        >
            {isPlaying ? (
                <FiPause className="animate-pulse" />
            ) : (
                <FiMusic className="animate-bounce" />
            )}

            {/* Ripple effect when playing */}
            {isPlaying && (
                <span className="absolute inset-0 rounded-full animate-ping bg-gold opacity-20 -z-10"></span>
            )}
        </motion.button>
    );
}
