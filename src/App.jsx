import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import FloatingHearts from './components/FloatingHearts';
import GiftBox from './components/GiftBox';
import Question from './components/Question';
import Surprise from './components/Surprise';

const App = () => {
    const [showQuestion, setShowQuestion] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setShowQuestion(true);
    };

    const handleYes = () => {
        // 1. Lanzamos el confeti
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FF69B4', '#FF4500', '#FFFFFF'],
            zIndex: 100
        });

        // 2. Activamos el cambio de escena
        setIsOpen(true);
        console.log('✅ isOpen ahora es:', true);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-pink-100 font-sans">

            {/* Fondo base (Día) - solo se muestra cuando NO está abierto */}
            {!isOpen && <FloatingHearts />}

            <div className="relative min-h-screen flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!showQuestion && !isOpen ? (
                        <GiftBox key="gift" onOpen={handleOpen} />
                    ) : showQuestion && !isOpen ? (
                        <Question key="question" onYes={handleYes} />
                    ) : (
                        <Surprise key="surprise" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default App;