/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import VideoBg from "@/assets/img/hero/video1.webm";
import Logo from "@/assets/img/logo/logo-theme.png";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import FullPageNavOverlay from "./FullPageNavOverlay";

import BustLeft from "@/assets/img/hero/bust.png";
import BustCenter from "@/assets/img/hero/bust.png";
import BustRight from "@/assets/img/hero/bust.png";

const bustsData = [
 {
  name: "DORA MILAJE",
  image: BustLeft,
  quote:
   "I AM LOYAL TO THAT THRONE, NO MATTER WHO SITS ON IT.",
  body:
   "Much can be gleaned from these elite warriors who provide protection and intel to protect the crown and country. Though known for being physically skilled in battle, their minds are also among their greatest weapons—overcoming and embracing adversity and solving problems as quickly as they arise. Do the Dora's gifts reflect yours?",
 },
 {
  name: "INGENUITY",
  image: BustCenter,
  quote:
   "VISION IS THE ART OF SEEING WHAT IS INVISIBLE TO OTHERS.",
  body:
   "True ingenuity is born from curiosity, resilience, and the courage to imagine beyond limitation. Those who innovate do not wait for permission—they create pathways where none existed.",
 },
 {
  name: "RESILIENCE",
  image: BustRight,
  quote:
   "PRESSURE DOES NOT BREAK ME — IT REVEALS ME.",
  body:
   "Resilience is the quiet strength that turns setbacks into momentum. Growth emerges not from comfort, but from the resolve to rise repeatedly in the face of challenge.",
 },
];

const Inspiration = () => {
 const [showFullMenu, setShowFullMenu] = useState(false);
 const [activeQuote, setActiveQuote] = useState(null);

 return (
  <section className="fixed inset-0 z-50 w-full h-full overflow-hidden bg-black" id="inspiration">
   {/* VIDEO BACKGROUND */}
   <video
    className="absolute inset-0 w-full h-full object-cover"
    src={VideoBg}
    autoPlay
    loop
    muted
    playsInline
   />

   {/* DARK OVERLAY */}
   <div className="absolute inset-0 bg-black/75" />

   {/* TOP LEFT TITLE */}
   <div className="absolute top-6 left-6 z-40">
    <p className="text-green-400 text-xs tracking-widest uppercase">The</p>
    <p className="text-white text-2xl md:text-3xl font-semibold uppercase leading-tight">
     Hall of <br />
     <span className="text-green-400">Zero Limits</span>
    </p>
   </div>

   {/* MENU BUTTON */}
   <div className="absolute top-6 right-6 z-40">
    <button
     onClick={() => setShowFullMenu(!showFullMenu)}
     className="p-3 rounded-full border border-green-400/40 bg-black/60 text-green-400
     shadow-[0_0_12px_rgba(74,222,128,0.6)] hover:text-green-200 transition"
    >
     {showFullMenu ? <X size={24} /> : <Menu size={24} />}
    </button>
   </div>

   <FullPageNavOverlay
    isOpen={showFullMenu}
    onClose={() => setShowFullMenu(false)}
   />

   {/* MAIN CONTENT*/}
   {!showFullMenu && (
    <div className="absolute inset-0 z-30 flex items-center justify-center">

     <div className="relative grid grid-cols-3 gap-4 lg:gap-8 items-end justify-center w-full max-w-7xl px-6 z-20">
      {bustsData.map((bust, index) => (
       <motion.div
        key={index}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.25 + 0.4, duration: 0.9 }}
        className={`relative flex flex-col items-center justify-end w-full py-4 lg:py-0
                    ${index === 1 ? "lg:scale-110 z-20" : "lg:scale-95 lg:opacity-90"}
        `}
       >
        <img
         src={bust.image}
         alt={bust.name}
         /* NEW: Reduced height significantly for the 3-column layout on mobile/md */
         className="max-h-[25vh] md:max-h-[35vh] lg:max-h-[70vh] object-contain lg:translate-y-10 grayscale"
        />

        {/* READ BUTTON: Repositioned since the image height is now different */}
        <motion.button
         onClick={() => setActiveQuote(bust)}
         initial={{ opacity: 0, scale: 0.85 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: index * 0.25 + 1.2 }}
         className="relative mt-4 lg:absolute lg:bottom-[20%] px-6 py-2 uppercase tracking-widest text-xs
          text-green-300 bg-green-400/10 border border-green-400/60
          backdrop-blur-md rounded-full
          shadow-[0_0_30px_rgba(74,222,128,0.8)]
          hover:bg-green-400/20 transition z-30"
        >
         READ
        </motion.button>
       </motion.div>
      ))}
     </div>
    </div>
   )}

   {/* QUOTE MODAL */}
   <AnimatePresence>
    {activeQuote && (
     <motion.div
      className="fixed inset-0 z-[999] bg-black/85 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
     >
      <motion.div
       initial={{ scale: 0.9, y: 40 }}
       animate={{ scale: 1, y: 0 }}
       exit={{ scale: 0.9, y: 40 }}
       transition={{ duration: 0.4 }}
       className="relative max-w-xl w-full p-8 border border-green-400/40
       bg-black/70 backdrop-blur-xl rounded-2xl
       shadow-[0_0_80px_rgba(74,222,128,0.4)] text-center"
      >
       <button
        onClick={() => setActiveQuote(null)}
        className="absolute top-4 right-4 text-green-400 text-xs tracking-widest"
       >
        ✕ CLOSE QUOTE
       </button>

       <p className="text-green-400 text-2xl md:text-3xl font-bold leading-tight uppercase">
        “{activeQuote.quote}”
       </p>

       <p className="mt-6 text-white tracking-widest uppercase">
        {activeQuote.name}
       </p>

       <p className="mt-4 text-gray-300 text-sm leading-relaxed">
        {activeQuote.body}
       </p>
      </motion.div>
     </motion.div>
    )}
   </AnimatePresence>

   {/* LOGO */}
   <img
    src={Logo}
    alt="Logo"
    className="absolute bottom-4 right-4 w-20 md:w-32 z-40"
   />
  </section>
 );
};

export default Inspiration;