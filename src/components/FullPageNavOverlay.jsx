/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import NavBgImage from "@/assets/img/hero/hero5.jpg";

// --- NavItem Component ---
const NavItem = ({ title, path, onClick, rotation, isActive }) => {
  const baseStyle = {
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
    boxShadow: "0 0 10px rgba(74, 222, 128, 0.4)",
    transform: `rotate(${-rotation}deg)`,
  };

  // Conditional classes for appearance:
  // If active (Welcome), use solid green background and white text.
  // If not active, use dark background, green text, and maintain the hover style.
  const activeClasses = isActive
    ? "bg-green-400 text-black border-green-400 hover:bg-green-300 hover:text-black"
    : "bg-black/50 text-green-400 border-green-700/50 hover:bg-green-400/80 hover:text-white";

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`relative w-24 h-12 sm:w-36 sm:h-20 flex items-center justify-center 
      font-semibold uppercase tracking-wider text-xs sm:text-sm
      border transition-all duration-300 ${activeClasses}`}
            style={baseStyle}
          >
      {title}
    </Link>
  );
};

const NavItemWrapper = ({ rotation, children }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0 transform origin-center"
      style={{
        transform: `rotate(${rotation}deg)`,
        zIndex: 20,
      }}
    >
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-40 sm:-translate-y-56">
        {children}
      </div>
    </div>
  );
};

const FullPageNavOverlay = ({ isOpen, onClose }) => {
  // Define the menu items with their paths
  const menuItems = [
    { title: "Inspiration Garden", path: "/inspiry" },
    { title: "The Library", path: "/library" },
    { title: "Find Your Gift", path: "/gift" },
    { title: "Welcome", path: "/index" },
    { title: "Origin Stories", path: "/origin" },
    { title: "Sprite Zero Sugar", path: "/sprite" },
  ];

  // Define the angles for 6 items
  const angleIncrement = 360 / menuItems.length;

  // Animation variants for the overlay
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          // Applied background image to the full overlay container
          className="fixed inset-0 z-30 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md bg-cover bg-center"
          style={{
            backgroundImage: `url(${NavBgImage})`,
            // Dark semi-transparent filter on the whole screen
            boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.7)",
          }}
        >
          {/* Aspect Ratio container  */}
          <div className="w-full h-full max-w-md sm:max-w-5xl aspect-square relative flex items-center justify-center">
            {/* Main Circular  */}
            <div className="w-full h-full relative p-4 sm:p-16 flex flex-col items-center justify-center rounded-full overflow-visible">
              {/* Ring structure remains full-size relative to its parent */}
              <div className="absolute inset-0 rounded-full border border-green-500/50 shadow-green-glow animate-pulse-slow">
                <div className="absolute inset-2 sm:inset-4 rounded-full border border-green-500/30">
                  <div className="absolute inset-2 sm:inset-4 rounded-full border border-green-500/20">
                    <div className="absolute inset-2 sm:inset-4 rounded-full border border-green-500/10"></div>
                  </div>
                </div>
              </div>
              {/* END: CONCENTRIC GLOWING RINGS */}

              <h1 className="relative z-10 text-lg sm:text-3xl font-bold uppercase text-green-400 mb-4 sm:mb-8 whitespace-normal sm:tracking-widest mt-4 sm:mt-0">
                JOURNEY NAVIGATION
              </h1>

              {/* --- CENTRAL LAYOUT --- */}
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-48 sm:h-48 rounded-full bg-green-800/60 border-4 border-green-400/50 flex items-center justify-center z-10">
                  <span className="text-green-300 font-bold text-sm sm:text-lg">
                    HALL CORE
                  </span>
                </div>

                {/* Map over menu items to create the perfect circular layout */}
                {menuItems.map((item, index) => {
                  const rotation = index * angleIncrement - 30;
                  const isActive = item.title === "Welcome";
                  return (
                    <NavItemWrapper key={item.title} rotation={rotation}>
                      <NavItem
                        title={item.title}
                        path={item.path}
                        onClick={onClose}
                        rotation={rotation}
                        isActive={isActive}
                      />
                    </NavItemWrapper>
                  );
                })}
              </div>
              {/* --- END CENTRAL LAYOUT --- */}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullPageNavOverlay;
