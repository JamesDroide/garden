import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

const GiftBox = ({ onOpen }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            className="z-10 text-center relative"
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl font-bold text-gray-700 mb-8 font-['Poppins']"
            >
                Hola, <span className="text-pink-500">Lorena</span> 💕
            </motion.h1>

            {/* Partículas flotantes alrededor del regalo */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute text-2xl pointer-events-none"
                    style={{
                        left: `${50 + Math.cos(i * Math.PI / 3) * 120}%`,
                        top: `${50 + Math.sin(i * Math.PI / 3) * 120}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                >
                    {['✨', '💝', '🌹', '💕', '⭐', '💖'][i]}
                </motion.div>
            ))}

            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 105, 180, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                animate={{
                    rotate: [-2, 2, -2],
                    y: [0, -10, 0]
                }}
                transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-2xl border-4 border-pink-200 relative group"
            >
                <Gift size={80} className="text-red-500 group-hover:text-red-600 transition-colors" />

                {/* Destellos animados */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: 180 }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2"
                >
                    <Sparkles className="text-yellow-400" size={32} />
                </motion.div>
            </motion.button>

            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 text-gray-600 font-medium text-lg font-['Poppins']"
            >
                Te está esperando una sorpresa... 🎁
            </motion.p>

            {/* Indicador de clic */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="mt-2 text-gray-400 text-sm font-light"
            >
                Haz clic en el regalo ☝️
            </motion.p>
        </motion.div>
    );
};

export default GiftBox;