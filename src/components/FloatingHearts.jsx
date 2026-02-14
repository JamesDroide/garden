import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {

    const hearts = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // Posición horizontal %
        duration: Math.random() * 10 + 10, // Duración lenta (10-20s)
        delay: Math.random() * 5,
        scale: Math.random() * 0.5 + 0.3,
        opacity: Math.random() * 0.3 + 0.1,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((h) => (
                <motion.div
                    key={h.id}
                    initial={{ y: '110vh', x: `${h.x}vw`, opacity: 0, scale: h.scale }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, h.opacity, 0],
                        rotate: [0, 20, -20, 0]
                    }}
                    transition={{
                        duration: h.duration,
                        repeat: Infinity,
                        delay: h.delay,
                        ease: "linear",
                    }}
                    className="absolute text-pink-400"
                >
                    <Heart fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;