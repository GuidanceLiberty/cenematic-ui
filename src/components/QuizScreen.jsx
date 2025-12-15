/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

// --- Card Component
const SelectionCard = ({ label, onClick }) => {
  const cardStyle = {
    border: "2px solid rgba(52, 211, 153, 0.4)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    boxShadow: "0 0 10px rgba(52, 211, 153, 0.4)",
    backdropFilter: "blur(2px)",
  };

  return (
    <motion.div
      className="w-full sm:w-64 h-80 p-8 flex flex-col items-center justify-center cursor-pointer relative transition-all duration-300"
      style={cardStyle}
      onClick={() => onClick(label)}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(52, 211, 153, 0.8)",
        borderColor: "rgba(52, 211, 153, 0.8)",
      }}
    >
      {/* Corner Markers */}
      <div className="absolute top-2 left-2 w-3 h-3 border-2 border-green-400 rounded-full bg-black/50" />
      <div className="absolute top-2 right-2 w-3 h-3 border-2 border-green-400 rounded-full bg-black/50" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-2 border-green-400 rounded-full bg-black/50" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-2 border-green-400 rounded-full bg-black/50" />

      <h3 className="text-3xl font-extrabold text-white uppercase tracking-wider mb-8">
        {label}
      </h3>

      {/* Decorative Green Line */}
      <div className="text-green-400 text-3xl font-mono tracking-widest opacity-80">
        &lt;&lt;&lt; &lt;&lt;&lt;
      </div>
    </motion.div>
  );
};

// --- MAIN QUIZ SCREEN COMPONENT
const QuizScreen = ({
  questionData,
  questionNumber,
  totalQuestions,
  onClose,
  onAnswer,
}) => {
  const screenVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[60]"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={screenVariants}
    >
      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-green-400 text-sm uppercase tracking-widest hover:text-white transition-colors z-70 flex items-center"
        onClick={onClose}
      >
        <X size={20} className="mr-1" /> CLOSE QUIZ
      </button>

      <div className="w-11/12 max-w-4xl flex flex-col items-center">
        <h1 className="text-base sm:text-xl font-semibold text-green-400 uppercase tracking-widest mb-2">
          QUESTION {questionNumber} of {totalQuestions}
        </h1>
        <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wider mb-16">
          {questionData.question}
        </h2>

        {/* Selection Cards Container */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center w-full">
          {questionData.options.map((option, index) => (
            <SelectionCard
              key={index}
              label={option}
              onClick={() => onAnswer(questionData.id, option)}
            />
          ))}
        </div>
      </div>

      {/* Fixed Bottom Content */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-40">
        <p className="text-white/60 text-xs mt-12 uppercase tracking-widest">
          FIND YOUR GIFT
        </p>
        <p className="text-green-400 text-sm font-bold uppercase tracking-widest">
          QUIZ EXPERIENCE
        </p>
      </div>
    </motion.div>
  );
};

export default QuizScreen;
