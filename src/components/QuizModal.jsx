/* eslint-disable no-unused-vars */

import React from 'react';
import { motion } from 'framer-motion';

const QuizModal = ({ onClose, onBeginQuiz }) => { 
  
  // Define the base styles for the hexagonal clip-path used for the buttons
  const hexStyle = {
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", 
  };

  // Styles for the green button/glow effect
  const greenGlowStyle = {
    boxShadow: "0 0 10px rgba(52, 211, 153, 0.8), inset 0 0 5px rgba(52, 211, 153, 0.5)",
  };

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-60" everything
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
    >
      <motion.div 
        className="w-11/12 max-w-lg p-8 sm:p-12 text-center bg-black/70 border border-green-700/50 backdrop-blur-sm"
        style={greenGlowStyle}
      >
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-green-400 text-sm uppercase tracking-widest hover:text-white transition-colors"
          onClick={onClose}
        >
          CLOSE QUIZ
        </button>

        {/* Title */}
        <h2 className="text-5xl sm:text-6xl font-bold text-white uppercase tracking-wider mb-8 relative">
          FIND <span className="text-green-400">YOUR GIFT</span>
          {/* Decorative dots above and below the title */}
          <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-16 h-1 bg-green-400 opacity-50" />
          <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-16 h-1 bg-green-400 opacity-50" />
        </h2>
        
        {/* Body Text */}
        <p className="text-white/80 text-base sm:text-lg mb-10 leading-relaxed max-w-md mx-auto">
          Let's put the insight, learning, and inspiration you've
          found here in the Hall of Zero Limits to work.
          To see what purpose may be calling, answer the 
          following questions about your passions and
          preferences. Each has only two answers, so simply 
          choose the answer that best applies to you. Go 
          forth, the key to discovering your gift awaits.
        </p>

        {/* BEGIN QUIZ Button (Hexagonal Style) */}
        <motion.button
          className="w-48 h-16 flex items-center justify-center 
               // ✅ FIX: Set text to white for permanent visibility against the bright green background
               bg-[#7CFC00] text-white font-extrabold uppercase 
               tracking-wider text-sm border-2 border-green-400 
               // ✅ FIX: Invert hover state to use black text on green-400 background
               transition-all duration-300 hover:bg-green-400 hover:text-black mx-auto mt-6"
          style={{ ...hexStyle, ...greenGlowStyle }}
          onClick={onBeginQuiz} 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BEGIN QUIZ
        </motion.button>
        
        {/* Bottom Footer Text */}
        <p className="text-white/60 text-xs mt-12 uppercase tracking-widest">
          FIND YOUR GIFT
        </p>
        <p className="text-green-400 text-sm font-bold uppercase tracking-widest">
          OR KEEP EXPLORING FIRST
        </p>
      </motion.div>
    </motion.div>
  );
};

export default QuizModal;