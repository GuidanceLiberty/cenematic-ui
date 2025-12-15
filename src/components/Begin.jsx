/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Logo from "@/assets/img/logo/logo-theme.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Menu, Circle, CheckCircle } from "lucide-react";

const CornerBorder = () => (
  <>
    <div className="absolute w-8 h-2px bg-green-400" />
    <div className="absolute w-2px h-8 bg-green-400" />
  </>
);

const Begin = () => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTutorial(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleBeginJourney = () => navigate("/main");

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
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

      {/* TOP LEFT TITLE (hidden on very small screens) */}
      <div className="absolute top-6 left-6 z-20 hidden sm:block">
        <p className="text-green-400 text-sm tracking-widest uppercase">The</p>
        <p className="text-white text-3xl font-semibold uppercase leading-tight">
          Hall of <br />
          <span className="text-green-400">Zero Limits</span>
        </p>
      </div>

      {/* LOGO */}
      <img
        src={Logo}
        alt="Logo"
        className="absolute bottom-4 right-4 w-20 sm:w-32 md:w-40 z-50"
      />

      {/* CENTERED CONTENT */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="z-30 w-full max-w-5xl px-4"
          >
            <AspectRatio
              ratio={16 / 9}
              className="
                relative
                p-6 sm:p-8 md:p-16
                border-2 border-green-500/50
                bg-black/50 backdrop-blur-sm
                shadow-2xl shadow-green-900/50
                flex flex-col items-center justify-between
                max-h-[85vh] sm:max-h-[70vh]
                overflow-y-auto
              "
            >
              {/* CORNERS */}
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                <CornerBorder />
              </div>
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rotate-90">
                <CornerBorder />
              </div>
              <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 -rotate-90">
                <CornerBorder />
              </div>
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-180">
                <CornerBorder />
              </div>

              {/* HEADING */}
              <div className="text-center mb-6">
                <p className="text-white text-sm sm:text-lg tracking-widest uppercase">
                  Journey
                </p>
                <h2 className="text-green-400 text-3xl sm:text-4xl font-bold uppercase">
                  Tutorial
                </h2>
              </div>

              {/* STEPS */}
              <div className="flex flex-col sm:flex-row justify-between w-full max-w-2xl gap-6 sm:gap-0 mb-8">
                {/* STEP 1 */}
                <div className="flex flex-col items-center text-center w-full sm:w-1/3">
                  <div className="p-4 rounded-full border-2 border-green-400/50 mb-3 bg-green-900/20">
                    <Circle size={36} className="text-green-400" />
                  </div>
                  <p className="hidden sm:block text-white/80 text-sm md:text-base">
                    Scroll up and down to explore the Hall
                  </p>
                  <p className="sm:hidden text-xs tracking-widest uppercase text-white/70">
                    Scroll
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="flex flex-col items-center text-center w-full sm:w-1/3">
                  <div className="p-4 rounded-full border-2 border-green-400/50 mb-3 bg-green-900/20">
                    <CheckCircle size={36} className="text-green-400" />
                  </div>
                  <p className="hidden sm:block text-white/80 text-sm md:text-base">
                    Tap on this icon to access the content
                  </p>
                  <p className="sm:hidden text-xs tracking-widest uppercase text-white/70">
                    Open
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="flex flex-col items-center text-center w-full sm:w-1/3">
                  <div className="p-4 rounded-full border-2 border-green-400/50 mb-3 bg-green-900/20">
                    <Menu size={36} className="text-green-400" />
                  </div>
                  <p className="hidden sm:block text-white/80 text-sm md:text-base">
                    This menu will help track your progress
                  </p>
                  <p className="sm:hidden text-xs tracking-widest uppercase text-white/70">
                    Menu
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleBeginJourney}
                className="
                  px-10 py-3 text-sm sm:text-lg font-bold uppercase tracking-widest
                  bg-green-400 text-black rounded-full
                  hover:bg-green-300 transition duration-300
                "
                style={{
                  boxShadow: "0 0 10px #4ade80, 0 0 20px #4ade80 inset",
                }}
              >
                Begin Journey
              </button>
            </AspectRatio>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Begin;
