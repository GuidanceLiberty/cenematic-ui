/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logo from "@/assets/img/logo/logo-theme.png";
import { Menu, X, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import FullPageNavOverlay from "./FullPageNavOverlay";

import CardImageMain from "@/assets/img/hero/sprite.png";
import CardImageLeft1 from "@/assets/img/hero/team-8.jpg";
import CardImageLeft2 from "@/assets/img/hero/team9.jpeg";
import CardImageRight1 from "@/assets/img/hero/team-10.jpeg";
import CardImageRight2 from "@/assets/img/hero/team9.jpeg";

const spriteCardData = [
  {
    name: "REYNA NORIEGA",
    title: "PREV",
    cardImage: CardImageLeft1,
    cardClasses:
      "bottom-[20%] left-[8%] w-40 h-[300px] opacity-70 rotate-[-15deg] hidden lg:block",
    clip: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
    isInteractive: false,
  },
  // 2. Middle Left Card
  {
    name: "JOAN MARIE",
    title: "PREV",
    cardImage: CardImageLeft2,
    cardClasses:
      "bottom-[10%] left-[18%] w-52 h-[380px] opacity-80 rotate-[-8deg]",
    clip: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
    isInteractive: false,
  },
  // 3. CENTER CARD (Interactive Video)
  {
  name: "THE NEXT LIMIT",
  title: "SPRITE ZERO SUGAR",
  cardImage: CardImageMain,
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  // Taller and wider, centered position, slightly bent
  cardClasses:
    "bottom-[0%] left-1/2 -translate-x-1/2 w-[30rem] max-w-[80vw] h-[550px] rotate-[0deg] z-20",
  // Custom clip path for the slightly bent/trapezoid look
  clip: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
  isInteractive: true,
},

  // 4. Middle Right Card (Non-interactive placeholder)
  {
    name: "HANNAH BEAUCHLER",
    title: "NEXT",
    cardImage: CardImageRight1,
    cardClasses:
      "bottom-[10%] right-[18%] w-52 h-[380px] opacity-80 rotate-[8deg]",
    clip: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
    isInteractive: false,
  },
  // 5. Far Right Card (Non-interactive placeholder)
  {
    name: "JASMINE ALEXIA",
    title: "NEXT",
    cardImage: CardImageRight2,
    cardClasses:
      "bottom-[20%] right-[8%] w-40 h-[300px] opacity-70 rotate-[15deg] hidden lg:block",
    clip: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
    isInteractive: false,
  },
];

// Custom style for the green glow/border effect on the card
const greenGlowStyle = {
  boxShadow:
    "0 0 10px rgba(110, 231, 183, 0.8), inset 0 0 10px rgba(110, 231, 183, 0.5)",
};

// Style for the 'WATCH' button glow (Reverting to solid-button style)
const buttonGlowStyle = {
  boxShadow: "0 0 15px rgba(74, 222, 128, 0.9)",
};

// MAIN COMPONENT ---
const Sprite = () => {
  // State for UI controls
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentVideo, setCurrentVideo] = useState(null);

  const handleMenuToggle = () => {
    setShowFullMenu(!showFullMenu);
  };

  // Video Modal Handler
  const handleWatchClick = (data) => {
    setCurrentVideo(data.videoUrl);
    setIsModalOpen(true);
  };

  // Close video modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  // Find the main interactive card
  const mainCardData = spriteCardData.find((d) => d.isInteractive);

  return (
    <section className="fixed inset-0 z-50 h-full w-full flex justify-center items-center">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* --- TOP-LEFT TITLE  */}
      <div className="absolute top-6 left-6 z-20 sm:hidden">
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

      {/* Render the FullPageNavOverlay when showFullMenu is true */}
      <FullPageNavOverlay isOpen={showFullMenu} onClose={handleMenuToggle} />

      {/* --- CONDITIONAL RENDERING FOR MAIN CONTENT WHEN MENU IS CLOSED --- */}
      {!showFullMenu && (
        <div className="absolute inset-0 z-30 w-full h-full flex justify-center items-center">
          {/* *** NEW: WATCH BUTTON POSITIONED ABOVE THE MAIN CARD *** */}
          {mainCardData && (
            <motion.button
              onClick={() => handleWatchClick(mainCardData)}
              className={`px-8 py-3 bg-green-400 text-black font-extrabold uppercase
                                rounded-full tracking-widest text-base z-30 
                                hover:bg-white transition-colors duration-300 flex items-center space-x-2
                                absolute top-[25%] left-1/2 -translate-x-1/2 
                            `}
              style={buttonGlowStyle}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              aria-label="Watch Sprite Video"
            >
              <PlayCircle size={20} fill="black" stroke="none" />
              <span>WATCH</span>
            </motion.button>
          )}

          {/* RENDER ALL CARDS  */}
          {spriteCardData.map((data, index) => (
            <motion.div
              key={index}
              className={`absolute z-10 transition-opacity duration-500 overflow-hidden 
                                ${data.cardClasses} 
                                ${data.isInteractive ? "shadow-2xl" : ""}
                            `}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.15 }}
              style={{
                // Only apply glow/border to the interactive center card
                ...(data.isInteractive ? greenGlowStyle : {}),
                backgroundImage: `url(${data.cardImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",

                clipPath: data.clip,
              }}
            >
              {/* *** Green Transparent Overlay *** */}
              <div
                className={`absolute inset-0 ${
                  data.isInteractive ? "bg-green-900/10" : "bg-black/50"
                }`}
              />

              {/* CONTENT OVERLAY (Names on side cards, Button removed from here) */}
              <div className="absolute inset-0 flex flex-col justify-end items-center p-4">
                {!data.isInteractive && (
                  <div className="text-center w-full bg-black/50 py-2">
                    <p className="text-white text-xl font-bold uppercase tracking-widest leading-none">
                      {data.name}
                    </p>
                    <p
                      className={`text-${
                        data.title === "PREV" ? "green-500" : "green-500"
                      } text-xs uppercase tracking-widest mt-1`}
                    >
                      {data.title}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* RENDER CHEVRON OVERLAYS on the side cards */}
          {spriteCardData
            .filter((d) => !d.isInteractive)
            .map((data, index) => (
              <motion.div
                key={`chevron-${index}`}
                className={`absolute z-30 ${data.cardClasses} pointer-events-none flex items-center justify-center`}
                style={{
                  opacity: 0.8,
                  clipPath: data.clip,
                  transform: data.cardClasses.includes("left")
                    ? `rotate(-15deg)`
                    : `rotate(15deg)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.15 }}
              >
                <div className="p-4 bg-black/50 rounded-full border border-green-500 text-green-400">
                  {data.title === "PREV" ? (
                    <ChevronLeft size={36} />
                  ) : (
                    <ChevronRight size={36} />
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      )}

      {/* --- CONDITIONAL BOTTOM CONTENT --- */}
      {!showFullMenu && (
        <>
          {/* BOTTOM CENTER TEXT */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-40 text-center">
            <p className="text-white text-xl sm:text-3xl font-semibold tracking-wide">
              SPRITE ZERO SUGAR
            </p>
            <p className="text-green-400 text-2xl sm:text-4xl font-bold tracking-widest">
              OPEN YOUR INFINITE POTENTIAL
            </p>
          </div>

          {/* LOGO  */}
          <img
            src={Logo}
            alt="Logo"
            className="absolute bottom-4 right-4 w-16 sm:w-20 md:w-32 z-40 cursor-pointer"
          />
        </>
      )}

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isModalOpen && currentVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-99 flex items-center justify-center"
            onClick={handleModalClose}
          >
            {/* Video Card Container  */}
            <div
              className="relative w-[90%] max-w-7xl bg-black border border-green-500/50 rounded-lg p-3 md:p-6 shadow-2xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 text-center">
                <h3 className="text-white text-3xl font-bold uppercase tracking-widest leading-none">
                  {mainCardData.title}
                </h3>
                <p className="text-green-400 text-lg uppercase tracking-widest mt-1">
                  {mainCardData.name}
                </p>
              </div>

              {/* 1. Video Player Container (for 16:9 Aspect Ratio) */}
              <div
                className="relative w-full overflow-hidden"
                style={{ paddingTop: "56.25%" }}
              >
                <video
                  key={currentVideo}
                  src={currentVideo}
                  autoPlay
                  controls
                  className="absolute top-0 left-0 w-full h-full rounded"
                />
              </div>

              {/* 2. Close button */}
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 p-2 text-black bg-green-400 rounded-full shadow-lg border-2 border-green-700 hover:bg-white transition-colors z-50"
              >
                <X size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Sprite;
