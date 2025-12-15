/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
import VideoBg from "@/assets/img/hero/video1.webm";
import Logo from "@/assets/img/logo/logo-theme.png";
import { Menu, X, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import FullPageNavOverlay from "./FullPageNavOverlay";

import CardImage1 from "@/assets/img/hero/team-6.jpg";
import CardImage2 from "@/assets/img/hero/team-5.jpg";
import CardImage3 from "@/assets/img/hero/fega.jpg";

// TESTIMONIAL DATA
const testimonialData = [
  {
    name: "GUIDANCE OGAR",
    title: "FULLSTACK DEVELOPER",
    cardImage: CardImage1,
    videoUrl: "/ogar.mp4",

    cardClassesSm: "w-32 h-64 relative md:w-36 md:h-72",

    cardClassesLg:
      "lg:w-64 lg:h-[400px] lg:absolute lg:bottom-[20%] lg:left-[20%]",

    pointerTop: "lg:top-[20%]",
    pointerLeft: "lg:left-[20%]",
  },
  {
    name: "LIBERTY OJUA",
    title: "NURSING MID-WIFE",
    cardImage: CardImage2,
    videoUrl: "/health.mp4",

    cardClassesSm: "w-32 h-64 relative md:w-36 md:h-72",

    cardClassesLg:
      "lg:w-64 lg:h-[400px] lg:absolute lg:bottom-[15%] lg:left-1/2 lg:-translate-x-1/2",

    pointerTop: "lg:top-[20%]",
    pointerLeft: "lg:left-1/2",
  },
  {
    name: "FEGA MICHAEL",
    title: "SPORT ATHLETE",
    cardImage: CardImage3,
    videoUrl: "/sport.mp4",

    cardClassesSm: "w-32 h-64 relative md:w-36 md:h-72",

    cardClassesLg:
      "lg:w-64 lg:h-[400px] lg:absolute lg:bottom-[18%] lg:right-[20%]",

    pointerTop: "lg:top-[20%]",
    pointerLeft: "lg:right-[20%]",
  },
];

// Custom style for the green glow/border effect
const greenGlowStyle = {
  boxShadow:
    "0 0 10px rgba(110, 231, 183, 0.8), inset 0 0 10px rgba(110, 231, 183, 0.5)",
};

// Style for the button glow
const buttonGlowStyle = {
  boxShadow: "0 0 8px rgba(74, 222, 128, 0.8)",
};

// MAIN COMPONENT ---
const Origin = () => {
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

  return (
    <section
      className="fixed inset-0 z-50 h-full w-full flex justify-center items-center"
      id="origin"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VideoBg}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* --- TOP-LEFT TITLE (Responsive) --- */}
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
        <div className="absolute inset-0 z-30 w-full h-full">
          <div className="flex justify-around items-center h-full w-full p-6 lg:block lg:p-0">
            {/* RENDER CARD GROUPS */}
            {testimonialData.map((data, index) => (
              <div
                key={`card-group-${index}`}
                className="flex flex-col items-center"
              >
                {/* 1. THE IMAGE CARD */}
                <motion.div
                  className={`z-10 transition-opacity duration-500 overflow-hidden ${data.cardClassesSm} ${data.cardClassesLg}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  style={{
                    ...greenGlowStyle,
                    backgroundImage: `url(${data.cardImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    // Custom clip path to simulate the top/bottom rounded cut-off shape
                    clipPath: "polygon(0% 10%, 100% 0%, 100% 90%, 0% 100%)",
                  }}
                >
                  {/* *** Green Transparent Overlay *** */}
                  <div className="absolute inset-0 bg-green-900/40" />
                </motion.div>

                <motion.button
                  key={`button-mobile-${index}`}
                  onClick={() => handleWatchClick(data)}
                  className={`block lg:hidden px-3 py-1 bg-green-400 text-black font-extrabold uppercase
            rounded-full tracking-widest text-[10px] md:text-xs z-30 -mt-4 mb-2 md:-mt-6 md:mb-3
            hover:bg-white transition-colors duration-300`}
                  style={buttonGlowStyle}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                >
                  WATCH STORY
                </motion.button>

                <div className="lg:hidden text-center">
                  <p className="text-white text-sm md:text-lg font-bold uppercase tracking-widest leading-none">
                    {data.name}
                  </p>
                  <p className="text-green-400 text-[8px] md:text-xs uppercase tracking-widest mt-0.5">
                    {data.title}
                  </p>
                </div>
              </div>
            ))}

            {testimonialData.map((data, index) => (
              <React.Fragment key={`pointer-group-${index}`}>
                <motion.div
                  className={`hidden lg:block absolute w-4 h-4 rounded-full bg-green-400 z-30 ${data.pointerTop} ${data.pointerLeft} -translate-x-1/2`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                >
                  {/* 1. Name and Title Text  */}
                  <div className="absolute text-center w-48 -top-24 left-1/2 -translate-x-1/2">
                    <p className="text-white text-base font-bold uppercase tracking-widest leading-none">
                      {data.name}
                    </p>
                    <p className="text-green-400 text-xs uppercase tracking-widest mt-0.5">
                      {data.title}
                    </p>
                  </div>

                  {/* 2. Connector Line pointing down to the watch button */}
                  <div className="absolute w-0.5 h-8 bg-green-400/90 -bottom-8 left-1/2 -translate-x-1/2" />

                  <motion.button
                    onClick={() => handleWatchClick(data)}
                    className={`absolute px-4 py-1.5 bg-green-400 text-black font-extrabold uppercase
          rounded-full tracking-widest text-[10px] z-30
          hover:bg-white transition-colors duration-300
          -bottom-14 left-1/2 -translate-x-1/2`}
                    style={buttonGlowStyle}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  >
                    WATCH
                  </motion.button>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      {/* --- END CONDITIONAL CENTER TESTIMONIALS --- */}

      {/* --- CONDITIONAL BOTTOM CONTENT --- */}
      {!showFullMenu && (
        <>
          {/* BOTTOM CENTER TEXT */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-40 text-center">
            <p className="text-white text-xl sm:text-3xl font-semibold tracking-wide">
              ORIGIN STORIES
            </p>
            <p className="text-green-400 text-2xl sm:text-4xl font-bold tracking-widest">
              FIND YOUR INSPIRATION
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

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-99 flex items-center justify-center"
            onClick={handleModalClose}
          >
            {/* Video Card Container */}
            <div
              className="relative w-[90%] max-w-5xl bg-black border border-green-500/50 rounded-lg p-3 md:p-6 shadow-2xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
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

              <button
                onClick={handleModalClose}
                className="absolute top-[-15px] right-[-15px] p-2 text-black bg-green-400 rounded-full shadow-lg border-2 border-green-700 hover:bg-white transition-colors z-50"
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

export default Origin;
