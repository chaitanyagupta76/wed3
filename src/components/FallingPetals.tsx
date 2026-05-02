"use client";

import { useEffect, useState } from "react";

// Petal SVG — a simple organic petal shape
function Petal({ color, size }: { color: string; size: number }) {
    return (
        <svg
            width={size}
            height={size * 1.4}
            viewBox="0 0 40 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 2 C30 8, 38 18, 38 28 C38 42, 30 54, 20 54 C10 54, 2 42, 2 28 C2 18, 10 8, 20 2Z"
                fill={color}
                opacity="0.55"
            />
            <path
                d="M20 2 C20 20, 20 38, 20 54"
                stroke="white"
                strokeWidth="0.8"
                opacity="0.4"
            />
        </svg>
    );
}

interface PetalConfig {
    id: number;
    left: number;       // vw %
    size: number;       // px
    duration: number;   // fall duration seconds
    delay: number;      // start delay seconds
    drift: number;      // horizontal drift px
    rotate: number;     // initial rotation degrees
    color: string;
    swayDuration: number;
    swayAmount: number;
}

const PETAL_COLORS = [
    "#e9c4c1", // rose
    "#f7e7ce", // champagne
    "#fceee9", // peach
    "#d4af37", // gold
    "#dfb163", // goldLight
    "#f7e7ce", // champagne (weighted a bit more — most common in floral)
];

function generatePetals(count: number): PetalConfig[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        left:         Math.random() * 100,
        size:         7 + Math.random() * 7,
        duration:     12 + Math.random() * 10,
        delay:        Math.random() * 20,       // spread start times up to 20s
        drift:        (Math.random() - 0.5) * 120,
        rotate:       Math.random() * 360,
        color:        PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        swayDuration: 2 + Math.random() * 3,
        swayAmount:   20 + Math.random() * 30,
    }));
}

export default function FallingPetals({ count = 8 }: { count?: number }) {
    const [petals, setPetals] = useState<PetalConfig[]>([]);

    // Generate petals only on client to avoid SSR mismatch
    useEffect(() => {
        setPetals(generatePetals(count));
    }, [count]);

    if (petals.length === 0) return null;

    return (
        <>
            {/* Keyframes injected once */}
            <style>{`
                @keyframes petalFall {
                    0%   { transform: translateY(-80px) rotate(var(--r0)) translateX(0px); opacity: 0; }
                    5%   { opacity: 1; }
                    90%  { opacity: 0.7; }
                    100% { transform: translateY(105vh) rotate(calc(var(--r0) + 280deg)) translateX(var(--drift)); opacity: 0; }
                }
                @keyframes petalSway {
                    0%,100% { margin-left: 0; }
                    50%     { margin-left: var(--sway); }
                }
            `}</style>

            {/* Fixed overlay — pointer-events-none so nothing is blocked */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 40,
                    overflow: "hidden",
                }}
            >
                {petals.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: `${p.left}%`,
                            // CSS custom props for keyframe access
                            ["--r0" as string]: `${p.rotate}deg`,
                            ["--drift" as string]: `${p.drift}px`,
                            ["--sway" as string]: `${p.swayAmount}px`,
                            animation: [
                                `petalFall ${p.duration}s ${p.delay}s linear infinite`,
                                `petalSway ${p.swayDuration}s ${p.delay}s ease-in-out infinite`,
                            ].join(", "),
                            willChange: "transform, opacity",
                        }}
                    >
                        <Petal color={p.color} size={p.size} />
                    </div>
                ))}
            </div>
        </>
    );
}
