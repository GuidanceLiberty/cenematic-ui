/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Hero from "./Hero";
import Gift from "./Gift";
import Library from "./Library";
import Sprite from "./Sprite";
import Inspiration from "./Inspiration";
import Origin from "./Origin";

import VideoBg from "@/assets/img/hero/video1.webm";
import Logo from "@/assets/img/logo/logo-theme.png";
import { Menu, X } from "lucide-react";
import FullPageNavOverlay from "./FullPageNavOverlay";

// Sections array (scroll order)
const sections = [
  { id: "index", component: null }, 
  { id: "gift", component: <Gift /> },
  { id: "sprite", component: <Sprite /> },
  { id: "library", component: <Library /> },
  { id: "inspiration", component: <Inspiration /> },
  { id: "origin", component: <Origin /> },
  { id: "hero", component: <Hero /> },
];

const Main = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);

  const handleMenuToggle = () => setShowFullMenu(!showFullMenu);

  // Full-page scroll handler
  const handleWheel = (e) => {
    e.preventDefault();
    if (scrolling) return;

    setScrolling(true);
    if (e.deltaY > 0) {
      // scroll down
      setCurrentIndex((prev) => (prev + 1 < sections.length ? prev + 1 : 0));
    } else {
      // scroll up
      setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : sections.length - 1));
    }

    setTimeout(() => setScrolling(false), 1000); 
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [scrolling]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden" id="main">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VideoBg}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Top-left title */}
      <div className="absolute top-6 left-6 z-20">
        <p className="text-green-400 text-xs md:text-sm tracking-widest uppercase">The</p>
        <p className="text-white text-2xl md:text-3xl font-semibold tracking-wide leading-tight uppercase">
          Hall of <br />
          <span className="text-green-400 uppercase">Zero Limits</span>
        </p>
      </div>

      {/* Top-right menu */}
      <div className="absolute top-6 right-6 z-40">
        {showFullMenu ? (
          <button
            onClick={handleMenuToggle}
            className="p-3 rounded-full border border-green-700/50 bg-black/50 text-green-400 transition-all hover:border-green-400 hover:text-green-200"
            style={{ boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)" }}
          >
            <X size={24} />
          </button>
        ) : (
          <button
            onClick={handleMenuToggle}
            className="p-3 rounded-full border border-green-700/50 bg-black/50 text-green-400 transition-all hover:border-green-400 hover:text-green-200"
            style={{ boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)" }}
          >
            <Menu size={24} />
          </button>
        )}
      </div>
      <FullPageNavOverlay isOpen={showFullMenu} onClose={handleMenuToggle} />

      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="absolute bottom-4 right-4 w-16 sm:w-20 md:w-32 z-50 cursor-pointer"
      />

      {/* Sections */}
      <AnimatePresence mode="wait">
        {sections.map((section, index) =>
          index === currentIndex ? (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, rotate: 5 }}    
              animate={{ opacity: 1, rotate: 0 }}   
              exit={{ opacity: 0, rotate: -5 }}     
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex justify-center items-center"
            >
              {section.id === "index" ? (
                <div className="text-center text-white">
                  <h1 className="text-4xl sm:text-6xl font-bold text-green-400">
                    Welcome to the Hall of Zero Limits
                  </h1>
                  <p className="mt-4 text-xl sm:text-2xl">Scroll to begin your journey</p>
                </div>
              ) : (
                section.component
              )}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </section>
  );
};

export default Main;
