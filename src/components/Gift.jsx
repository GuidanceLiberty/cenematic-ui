/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logo from "@/assets/img/logo/logo-theme.png";
import { Menu, X } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

import FullPageNavOverlay from "./FullPageNavOverlay";
import QuizModal from "./QuizModal";
import QuizFlow from "./QuizFlow";




// Define keyframes as a global style block
const globalKeyframes = `
@keyframes particleDrift {
 from { background-position: 0 0; }
 to { background-position: 40px 60px; }
}

@keyframes orbPulse {
 0% { transform: scale(1); opacity: 0.85; }
 50% { transform: scale(1.07); opacity: 1; }
 100% { transform: scale(1); opacity: 0.85; }
}
`;

// Inject global keyframes once when the component is defined
if (typeof document !== 'undefined') {
 const style = document.createElement('style');
 style.innerHTML = globalKeyframes;
 document.head.appendChild(style);
}

// Style for the navigation button glow 
const buttonGlowStyle = {
boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
};

// --- ANIMATED ORB COMPONENT ---
const AnimatedGreenOrb = ({ className }) => {
 
 const size = '300px'; 
 
 // Base orb styles
 const orbStyle = {
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  overflow: 'hidden',
  background: 'radial-gradient(circle at 30% 30%, #7bffb2, #1aff6a 40%, #0a5f2a 70%, #032b14 100%)',
  boxShadow: 
  '0 0 30px rgba(26, 255, 106, 0.8), 0 0 80px rgba(26, 255, 106, 0.5), 0 0 140px rgba(26, 255, 106, 0.3)',
  filter: 'blur(0.3px)',
  animation: 'orbPulse 3s ease-in-out infinite',
 };

 const particleStyle = {
  content: "''",
  position: 'absolute',
  inset: 0,
  borderRadius: '50%',
  backgroundImage: 'radial-gradient(rgba(160, 255, 200, 0.9) 1px, transparent 1px)',
  backgroundSize: '6px 6px',
  opacity: 0.35,
  animation: 'particleDrift 6s linear infinite',
 };

 const highlightStyle = {
  content: "''",
  position: 'absolute',
  inset: 0,
  borderRadius: '50%',
  background: 'radial-gradient(circle at top left, rgba(255,255,255,0.35), transparent 60%)',
 };

 return (
  <motion.div 
   className={`absolute z-10 ${className}`} 
   style={orbStyle}
   initial={{ opacity: 0, scale: 0.5 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ duration: 1 }}
  >
   <div style={particleStyle} />
   <div style={highlightStyle} />
  </motion.div>
 );
};


// --- COMPONENT FOR THE QUIZ ACTION BUTTON 
const QuizButton = ({ onOpenModal }) => {
 const hexStyle = {
  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", 
 };

 const fixedQuizButtonStyle = {
  backgroundColor: '#34D399', 
  borderColor: '#34D399', 
  boxShadow: "0 0 4px rgba(52, 211, 153, 0.7)", 
 };

 return (
  <motion.button
  className="absolute top-[28%] right-[20%] sm:top-[30%] sm:right-[30%] 
     w-32 h-16 sm:w-40 sm:h-20 flex items-center justify-center 
     text-black font-extrabold uppercase 
     tracking-wider text-xs sm:text-sm z-30 cursor-pointer"
   style={{ ...fixedQuizButtonStyle, ...hexStyle }}
   onClick={onOpenModal} 
   initial={{ opacity: 0, scale: 0.8 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ delay: 0.5, duration: 0.5 }}
  >
   TAKE THE QUIZ
  </motion.button>
 );
};

// --- NAVIGATION BUTTON COMPONENT (PREV/NEXT) ---
const SideNavButton = ({ direction, label }) => {
 const isLeft = direction === 'left';
 const icon = isLeft ? <ChevronLeft size={24} /> : <ChevronRight size={24} />;
 const positionClasses = isLeft ? 'left-6' : 'right-6';

 return (
 <div className={`absolute bottom-1/2 transform translate-y-1/2 z-40 ${positionClasses}`}>
  <motion.button
  className="p-3 rounded-full border border-green-700/50 bg-black/50 text-green-400 
     transition-all hover:border-green-400 hover:text-green-200"
  style={buttonGlowStyle}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => console.log(`${label} clicked`)}
  >
  {icon}
  </motion.button>
  <p className="text-white text-xs uppercase mt-2 text-center">{label}</p>
 </div>
 );
};


// MAIN COMPONENT 
const Gift = () => {
// State for UI controls
const [showFullMenu, setShowFullMenu] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false); 
 const [isQuizStarted, setIsQuizStarted] = useState(false); 
const [currentVideo, setCurrentVideo] = useState(null);

const handleMenuToggle = () => {
 setShowFullMenu(!showFullMenu);
};
 
// 1. Handler to open the Quiz Modal (Instructions)
const handleOpenQuizModal = () => {
 setIsModalOpen(true);
   setIsQuizStarted(false); 
};

 // 2. Handler to start the Quiz 
const handleStartQuiz = () => { 
 setIsModalOpen(false); 
 setIsQuizStarted(true); 
};
 
// 3. Handler to close all quiz screens and return to main Gift page
const handleCloseQuiz = () => {
 setIsModalOpen(false);
 setIsQuizStarted(false);
};


const handleModalClose = () => {
 setIsModalOpen(false);
 setCurrentVideo(null);
};

return (
 <section className="fixed inset-0 z-50 h-full w-full flex justify-center items-center overflow-hidden" id="gift">
 {/* Video background */}
 <video
  className="absolute inset-0 w-full h-full object-cover"
  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  autoPlay
  loop
  muted
  playsInline
 />

 {/* Overlay */}
 <div className="absolute inset-0 bg-black/80" />

 {/* --- TOP-LEFT TITLE */}
 <div className="absolute top-6 left-6 z-20">
  <p className="text-green-400 text-xs md:text-sm tracking-widest uppercase">
  The
  </p>
  <p className="text-white text-2xl md:text-3xl font-semibold tracking-wide leading-tight uppercase">
  Hall of <br />
  <span className="text-green-400 uppercase">Zero Limits</span>
  </p>
 </div>

 {/* --- TOP-RIGHT FULL MENU TRIGGER / CLOSE BUTTON */}
 <div className="absolute top-6 right-6 z-40">
  {showFullMenu || isModalOpen || isQuizStarted ? ( 
  <button
   onClick={showFullMenu ? handleMenuToggle : handleCloseQuiz} 
   className="p-3 rounded-full border border-green-700/50 bg-black/50 text-green-400 transition-all hover:border-green-400 hover:text-green-200"
   style={buttonGlowStyle}
  >
   <X size={24} />
  </button>
  ) : (
  <button
   onClick={handleMenuToggle}
   className="p-3 rounded-full border border-green-700/50 bg-black/50 text-green-400 transition-all hover:border-green-400 hover:text-green-200"
   style={buttonGlowStyle}
  >
   <Menu size={24} />
  </button>
  )}
 </div>


 {/* Render the FullPageNavOverlay when showFullMenu is true */}
 <FullPageNavOverlay isOpen={showFullMenu} onClose={handleMenuToggle} />

 {/* --- MAIN GIFT CONTENT */}
 {!showFullMenu && !isModalOpen && !isQuizStarted && ( 
  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
  
  {/* ORB POSITIONING CHANGE: Moved from top-[35%] to top-[40%] for lower placement. */}
  <AnimatedGreenOrb 
   className="top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 
         lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2" 
  />

  {/* FIND YOUR GIFT TEXT (Centered over the orb) */}
  <motion.div
   initial={{ opacity: 0, y: 50 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 1, delay: 0.2 }}
   className="relative z-20 text-center -top-4 sm:-top-4" 
  >
   <h2 className="text-white text-4xl sm:text-6xl font-bold uppercase tracking-wider leading-none">
   FIND <br /> YOUR GIFT
   </h2>
  </motion.div>
  
  {/* TAKE THE QUIZ BUTTON */}
  <QuizButton onOpenModal={handleOpenQuizModal} />

  {/* Removed: PREV/NEXT Navigation Buttons */}

  </div>
 )}
 {/* --- END MAIN GIFT CONTENT --- */}

 {/* --- RENDER QUIZ MODAL / QUIZ FLOW --- */}
 <AnimatePresence>
  {/* Renders the instruction modal */}
  {isModalOpen && !showFullMenu && (
   <QuizModal 
    onClose={handleCloseQuiz} 
    onBeginQuiz={handleStartQuiz} 
   />
  )}
     {/* Renders the actual questions */}
  {isQuizStarted && !showFullMenu && ( 
   <QuizFlow 
    onClose={handleCloseQuiz} 
   />
  )}
 </AnimatePresence>


 {/* --- CONDITIONAL BOTTOM CONTENT */}
 {!showFullMenu && !isModalOpen && !isQuizStarted && ( 
  <>
  {/* BOTTOM CENTER TEXT ) */}
  <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-40 text-center">
   <p className="text-white text-xl sm:text-3xl font-semibold tracking-wide">
   FIND YOUR GIFT
   </p>
   <p className="text-green-400 text-2xl sm:text-4xl font-bold tracking-widest">
   QUIZ EXPERIENCE
   </p>
  </div>

  {/* LOGO */}
  <img
   src={Logo}
   alt="Logo"
   className="absolute bottom-4 right-4 w-16 sm:w-20 md:w-32 z-40 cursor-pointer"
  />
  </>
 )}

 </section>
);
};

export default Gift;