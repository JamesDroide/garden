import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Variantes para controlar la animación del contenedor principal
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            when: "beforeChildren",
            staggerChildren: 0.3
        }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

// Variantes para los elementos hijos
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, type: "spring" } }
};

const Surprise = () => {
    const [showText, setShowText] = useState(false);
    const [showNightMessage, setShowNightMessage] = useState(false);
    const [sunProgress, setSunProgress] = useState(0); // 0 a 1 (0 = arriba, 1 = oculto)

    // Memorizar las posiciones de las estrellas para que no cambien
    const [starPositions] = useState(() =>
        Array.from({ length: 40 }, () => ({
            left: Math.random() * 100,
            top: Math.random() * 60,
            size: Math.random() * 8 + 8,
            delay: 2 + Math.random() * 3
        }))
    );

    useEffect(() => {
        console.log('🎁 Componente Surprise montado!');
        const timer = setTimeout(() => {
            setShowText(true);
        }, 2500);

        // Animación progresiva del sol ocultándose (20 segundos de duración)
        const startTime = Date.now();
        const sunDuration = 20000;
        const sunDelay = 3000;

        const animateSun = () => {
            const elapsed = Date.now() - startTime - sunDelay;
            if (elapsed < 0) {
                requestAnimationFrame(animateSun);
                return;
            }

            const progress = Math.min(elapsed / sunDuration, 1);
            setSunProgress(progress);

            // Cuando el sol se oculta completamente, cambiar al mensaje de noche
            if (progress >= 0.95 && !showNightMessage) {
                setTimeout(() => {
                    setShowNightMessage(true);
                }, 3000); // 3 segundos después de que aparezca la luna
            }

            if (progress < 1) {
                requestAnimationFrame(animateSun);
            }
        };

        requestAnimationFrame(animateSun);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ zIndex: 100 }}
        >
            {/* --- CIELO CON TRANSICIÓN PROGRESIVA ATARDECER → NOCHE --- */}
            <div className="absolute inset-0 w-full h-full">
                {/* Atardecer inicial */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, #0a0e27 0%, #1e3a8a 15%, #7c3aed 30%, #db2777 45%, #f97316 60%, #fbbf24 75%, #fcd34d 90%, #fef3c7 100%)',
                        opacity: sunProgress >= 1 ? 0 : (1 - sunProgress * 0.7) // Se mantiene en 0 cuando llega a 1
                    }}
                />

                {/* Noche estrellada - aparece gradualmente y se mantiene */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, #000000 0%, #0a0e27 30%, #1a1a2e 60%, #16213e 100%)',
                        opacity: sunProgress > 0.5 ? Math.min((sunProgress - 0.5) * 2, 1) : 0 // Se detiene en 1
                    }}
                />
            </div>

            {/* --- SOL OCULTÁNDOSE GRADUALMENTE --- */}
            <motion.div
                className="absolute"
                style={{
                    left: '50%',
                    // El sol baja desde 60% hasta 90% (más abajo del horizonte)
                    top: `${60 + sunProgress * 30}%`,
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fef3c7 0%, #fbbf24 40%, #f59e0b 70%, #ea580c 100%)',
                    boxShadow: `0 0 ${100 * (1 - sunProgress)}px ${50 * (1 - sunProgress)}px rgba(251, 191, 36, ${0.6 * (1 - sunProgress)}), 0 0 ${200 * (1 - sunProgress)}px ${100 * (1 - sunProgress)}px rgba(251, 191, 36, ${0.3 * (1 - sunProgress)})`,
                    transform: 'translateX(-50%)',
                    opacity: 1 - sunProgress, // Se desvanece gradualmente
                    zIndex: 2
                }}
            />

            {/* --- LUNA LLENA HERMOSA (aparece cuando el sol se oculta) --- */}
            {sunProgress >= 0.95 && (
                <motion.div
                    className="absolute"
                    style={{
                        left: '50%',
                        top: '30%',
                        transform: 'translateX(-50%)',
                        zIndex: 3
                    }}
                    initial={{ opacity: 0, scale: 0, y: -100 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeOut"
                    }}
                >
                    {/* Luna llena con brillo */}
                    <div className="relative">
                        {/* Brillo exterior */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                width: '250px',
                                height: '250px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                                filter: 'blur(40px)',
                                transform: 'translate(-50%, -50%)',
                                left: '50%',
                                top: '50%'
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Luna principal */}
                        <div
                            style={{
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f0f0f0 40%, #d0d0d0 100%)',
                                boxShadow: '0 0 60px 20px rgba(255, 255, 255, 0.5), inset -20px -20px 40px rgba(0, 0, 0, 0.1)',
                                position: 'relative'
                            }}
                        >
                            <div style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', top: '30%', left: '40%' }} />
                            <div style={{ position: 'absolute', width: '15px', height: '15px', borderRadius: '50%', background: 'rgba(0,0,0,0.04)', top: '60%', left: '55%' }} />
                            <div style={{ position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0,0,0,0.06)', top: '45%', left: '70%' }} />
                            <div style={{ position: 'absolute', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(0,0,0,0.04)', top: '70%', left: '30%' }} />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* --- REFLEJO DEL SOL EN EL AGUA --- */}
            <motion.div
                className="absolute"
                style={{
                    left: '50%',
                    top: '60%',
                    width: '2px',
                    height: '40%',
                    background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0.3) 50%, transparent 100%)',
                    transform: 'translateX(-50%)',
                    zIndex: 1
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* --- NUBES FLOTANTES --- */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`cloud-${i}`}
                    className="absolute text-6xl opacity-30"
                    style={{
                        left: `${10 + i * 15}%`,
                        top: `${10 + (i % 3) * 15}%`,
                        filter: 'blur(2px)'
                    }}
                    initial={{ x: -200, opacity: 0 }}
                    animate={{
                        x: [0, 30, 0],
                        opacity: [0, 0.3, 0.3]
                    }}
                    transition={{
                        duration: 20 + i * 5,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                    }}
                >
                    ☁️
                </motion.div>
            ))}

            {/* --- ARENA DE PLAYA --- */}
            <motion.div
                className="absolute bottom-0 w-full h-1/6"
                style={{
                    background: 'linear-gradient(to bottom, rgba(194, 178, 128, 0) 0%, rgba(194, 178, 128, 0.4) 40%, rgba(194, 178, 128, 0.7) 100%)',
                    zIndex: 5
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1.8 }}
            />

            {/* --- ONDAS DEL MAR --- */}
            <motion.div
                className="absolute bottom-0 w-full h-1/3"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(14, 116, 144, 0.3) 30%, rgba(8, 76, 97, 0.5) 60%, rgba(6, 53, 70, 0.7) 100%)',
                    zIndex: 3
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1 }}
            >
                {/* Ondas animadas */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`wave-${i}`}
                        className="absolute w-full"
                        style={{
                            bottom: `${i * 15}%`,
                            height: '4px',
                            background: 'rgba(251, 191, 36, 0.2)',
                            borderRadius: '50%'
                        }}
                        animate={{
                            scaleX: [1, 1.2, 1],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 1.3,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>

            {/* --- ESTRELLAS PARPADEANTES (aumentan con la noche) --- */}
            {starPositions.slice(0, sunProgress > 0.9 ? 40 : Math.floor(8 + sunProgress * 32)).map((star, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute text-yellow-200"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        fontSize: `${star.size}px`,
                        zIndex: 2
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0.5, 1],
                        scale: [0, 1, 0.9, 1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut"
                    }}
                >
                    ✨
                </motion.div>
            ))}

            {/* --- PÁJAROS VOLANDO (solo 2) --- */}
            {[...Array(2)].map((_, i) => (
                <motion.div
                    key={`bird-${i}`}
                    className="absolute text-2xl"
                    style={{
                        top: `${25 + i * 15}%`,
                        opacity: 0.4,
                        filter: 'brightness(0)'
                    }}
                    initial={{ x: -100 }}
                    animate={{
                        x: ['0vw', '110vw'],
                        y: [0, -15, 0]
                    }}
                    transition={{
                        duration: 30 + i * 10,
                        repeat: Infinity,
                        delay: i * 5,
                        ease: "linear"
                    }}
                >
                    🦅
                </motion.div>
            ))}

            {/* --- PALMERAS EN SILUETA --- */}
            <motion.div
                className="absolute left-0 bottom-0 text-9xl opacity-70"
                style={{
                    filter: 'brightness(0)',
                    transform: 'rotate(-10deg)',
                    zIndex: 4
                }}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 0.7 }}
                transition={{ duration: 2, delay: 1.5 }}
            >
                🌴
            </motion.div>

            <motion.div
                className="absolute right-0 bottom-0 text-9xl opacity-70"
                style={{
                    filter: 'brightness(0)',
                    transform: 'rotate(10deg)',
                    zIndex: 4
                }}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 0.7 }}
                transition={{ duration: 2, delay: 1.5 }}
            >
                🌴
            </motion.div>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <motion.div
                variants={itemVariants}
                className="relative p-8 rounded-3xl max-w-sm text-center mx-4 mt-10"
                style={{ zIndex: 20 }}
            >
                {/* Corazón hermoso con animación elegante */}
                <motion.div
                    className="w-48 h-48 mx-auto mb-8 flex items-center justify-center relative"
                    initial={{ opacity: 0, y: -50, scale: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, -15, 0],
                        scale: 1
                    }}
                    transition={{
                        opacity: { duration: 1.5, ease: "easeOut" },
                        scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }, // Efecto elástico suave
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.2
                        }
                    }}
                >
                    {/* Brillo de fondo animado */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(255, 105, 180, 0.4) 0%, rgba(251, 191, 36, 0.2) 50%, transparent 70%)',
                            filter: 'blur(30px)'
                        }}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Corazón principal con gradiente */}
                    <motion.div
                        className="relative text-9xl"
                        animate={{
                            scale: [1, 1.08, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ❤️
                    </motion.div>

                    {/* Partículas de brillo flotantes alrededor */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`sparkle-${i}`}
                            className="absolute text-2xl"
                            style={{
                                left: `${50 + Math.cos(i * Math.PI / 3) * 80}%`,
                                top: `${50 + Math.sin(i * Math.PI / 3) * 80}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                y: [0, -20]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 1.5 + i * 0.3,
                                ease: "easeOut"
                            }}
                        >
                            ✨
                        </motion.div>
                    ))}

                    {/* Rosa decorativa con animación de aparición */}
                    <motion.div
                        className="absolute text-5xl"
                        style={{
                            top: '-25px',
                            right: '-15px'
                        }}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0
                        }}
                        transition={{
                            duration: 1,
                            delay: 1.5,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                    >
                        🌹
                    </motion.div>
                </motion.div>

                {showText && (
                    <AnimatePresence mode="wait">
                        {/* Título con animación elegante de aparición */}
                        {!showNightMessage && (
                            <motion.h1
                                key="sunset-title"
                                className="text-5xl font-bold text-white mb-6 font-serif"
                                style={{
                                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(251, 191, 36, 0.5)',
                                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
                                }}
                                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.34, 1.56, 0.64, 1]
                                }}
                            >
                                Para Ti🌹
                            </motion.h1>
                        )}

                        {/* MENSAJE DEL ATARDECER */}
                        {!showNightMessage && (
                            <motion.div
                                key="sunset-message"
                                className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl border-2 border-white/30 shadow-2xl"
                                style={{
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                                }}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3,
                                    ease: "easeOut"
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.15)',
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <motion.p
                                    className="text-white text-lg font-light leading-relaxed font-sans mb-4"
                                    style={{
                                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                                        letterSpacing: '0.5px'
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                >
                                    Lorena, como te encantan los atardeceres en la playa, quise programar uno especial solo para ti.
                                </motion.p>

                                <motion.p
                                    className="text-yellow-200 font-bold text-2xl"
                                    style={{
                                        textShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 2px 10px rgba(0, 0, 0, 0.8)'
                                    }}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 1,
                                        ease: [0.34, 1.56, 0.64, 1]
                                    }}
                                >
                                    <motion.span
                                        animate={{
                                            textShadow: [
                                                '0 0 20px rgba(251, 191, 36, 0.8), 0 2px 10px rgba(0, 0, 0, 0.8)',
                                                '0 0 40px rgba(251, 191, 36, 1), 0 2px 10px rgba(0, 0, 0, 0.8)',
                                                '0 0 20px rgba(251, 191, 36, 0.8), 0 2px 10px rgba(0, 0, 0, 0.8)'
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        ¡Feliz San Valentín! ✨
                                    </motion.span>
                                </motion.p>
                            </motion.div>
                        )}

                        {/* MENSAJE NOCTURNO SOBRE LAS ESTRELLAS */}
                        {showNightMessage && (
                            <motion.div
                                key="night-message"
                                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.34, 1.56, 0.64, 1]
                                }}
                            >
                                {/* Nuevo título para la noche */}
                                <motion.h1
                                    className="text-4xl font-bold text-white mb-6 font-serif"
                                    style={{
                                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 255, 255, 0.6)',
                                        filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))'
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    Bajo las Estrellas 🌟
                                </motion.h1>

                                <motion.div
                                    className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border-2 border-white/20 shadow-2xl"
                                    style={{
                                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.05)'
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <motion.p
                                        className="text-white text-lg font-light leading-relaxed font-sans mb-4"
                                        style={{
                                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                                            letterSpacing: '0.5px'
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.3 }}
                                    >
                                        Las estrellas no apuran su luz,
                                        simplemente brillan…
                                        y quien quiera mirar, las encuentra.
                                    </motion.p>

                                    <motion.p
                                        className="text-blue-200 text-lg font-light leading-relaxed font-sans mb-4 italic"
                                        style={{
                                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                                            letterSpacing: '0.5px'
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.8 }}
                                    >
                                    </motion.p>

                                    <motion.p
                                        className="text-purple-200 font-bold text-2xl"
                                        style={{
                                            textShadow: '0 0 25px rgba(168, 85, 247, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9)'
                                        }}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 1,
                                            delay: 1.3,
                                            ease: [0.34, 1.56, 0.64, 1]
                                        }}
                                    >
                                        <motion.span
                                            animate={{
                                                textShadow: [
                                                    '0 0 25px rgba(168, 85, 247, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9)',
                                                    '0 0 45px rgba(168, 85, 247, 1), 0 2px 10px rgba(0, 0, 0, 0.9)',
                                                    '0 0 25px rgba(168, 85, 247, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9)'
                                                ]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            Creo que contigo pasa algo parecido.
                                            No sé hacia dónde va esto,
                                            pero me gusta que esté pasando.
                                        </motion.span>
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Surprise;