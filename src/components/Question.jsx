import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Question = ({ onYes }) => {
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [attempts, setAttempts] = useState(0);

    const messages = [
        "¿Aceptas este detalle?",
        "¿Segura que no? 🥺",
        "¿Aunque sea un poquito? 💕",
        "Vamos, di que sí... 🌹",
        "¡Por favor! ❤️",
        "¿Ya? ¿Ahora sí? 🥰",
        "Ok, solo el Sí funciona 😊"
    ];

    const handleNoHover = () => {
        // Genera una posición aleatoria pero SIEMPRE dentro de la pantalla
        const buttonWidth = 150;
        const buttonHeight = 60;
        const margin = 20;

        const minX = margin;
        const maxX = window.innerWidth - buttonWidth - margin;
        const minY = margin;
        const maxY = window.innerHeight - buttonHeight - margin;

        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;

        setNoPosition({ x: newX, y: newY });
        setAttempts(prev => Math.min(prev + 1, messages.length - 1));
    };

    const handleNoClick = (e) => {
        e.preventDefault();
        handleNoHover();
    };

    const handleNoTouch = (e) => {
        e.preventDefault();
        handleNoHover();
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative z-20 text-center"
        >
            {/* Pregunta principal */}
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
            >
                <Heart
                    className="w-24 h-24 mx-auto mb-4 text-red-500 fill-red-500"
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-2 font-['Poppins']">
                    {messages[attempts]}
                </h2>
                <p className="text-lg text-gray-600 font-light">
                    Tengo algo especial para ti, Lorena
                </p>
            </motion.div>

            {/* Botones */}
            <div className="relative flex gap-6 justify-center items-center min-h-[100px] w-full max-w-2xl mx-auto">
                {/* Botón SÍ */}
                <motion.button
                    onClick={onYes}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        scale: { duration: 1.5, repeat: Infinity }
                    }}
                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all relative z-10"
                >
                    ❤️ Sí
                </motion.button>

                {/* Botón NO que se escapa */}
                <motion.button
                    animate={attempts > 0 ? {
                        left: noPosition.x,
                        top: noPosition.y,
                    } : {}}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                    }}
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoTouch}
                    onClick={handleNoClick}
                    className="bg-gray-300 text-gray-700 px-12 py-4 rounded-full font-bold text-xl shadow-lg cursor-pointer select-none"
                    style={{
                        position: attempts > 0 ? 'fixed' : 'relative',
                        touchAction: 'none',
                        zIndex: 20
                    }}
                >
                    😢 No
                </motion.button>
            </div>

            {/* Mensaje de ayuda después de varios intentos */}
            {attempts > 3 && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-sm text-gray-500 italic"
                >
                </motion.p>
            )}
        </motion.div>
    );
};

export default Question;

