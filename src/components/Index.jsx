/* eslint-disable no-unused-vars */
import React, { useState } from "react"; 
import VideoBg from "@/assets/img/hero/video1.webm";
import Logo from "@/assets/img/logo/logo-theme.png";
import { Menu, X } from "lucide-react"; 

import FullPageNavOverlay from "./FullPageNavOverlay"; 

const Index = () => {
 // New state to control the visibility of the full-page navigation
 const [showFullMenu, setShowFullMenu] = useState(false); 
 
 const [showSmallMenu, setShowSmallMenu] = useState(false);

 // Function to toggle the large menu
 const handleMenuToggle = () => {
  setShowFullMenu(!showFullMenu);
 };
 
 // Handler for the close menu button in the small dropdown
 const handleSmallMenuClose = () => {
  setShowSmallMenu(false);
 };

 return (
  <section className="fixed inset-0 z-50 h-full w-full flex justify-center items-center">
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

   {/* --- TOP-LEFT TITLE */}
   <div className="absolute top-6 left-6 z-20">
    <p className="text-green-400 text-xs md:text-sm tracking-widest uppercase">The</p>
    <p className="text-white text-2xl md:text-3xl font-semibold tracking-wide leading-tight uppercase">
     Hall of <br />
     <span className="text-green-400 uppercase">Zero Limits</span>
    </p>
   </div>

   {/* --- TOP-RIGHT FULL MENU TRIGGER / CLOSE BUTTON */}
   <div className="absolute top-6 right-6 z-40">
    {showFullMenu ? (
     // If full menu is open, show the Close (X) button
     <button
      onClick={handleMenuToggle}
      className="p-3 rounded-full border border-green-700/50 bg-black/50 text-green-400 transition-all hover:border-green-400 hover:text-green-200"
      style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)' }}
     >
      <X size={24} />
     </button>
    ) : (
     // If full menu is closed, show the Menu icon to open it
     <button
      onClick={handleMenuToggle}
      className="p-3 rounded-full border border-green-700/50 bg-black/50 text-green-400 transition-all hover:border-green-400 hover:text-green-200"
      style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)' }}
     >
      <Menu size={24} />
     </button>
    )}
   </div>
   {/* --- END TOP-RIGHT FULL MENU TRIGGER --- */}

   {/* Render the FullPageNavOverlay when showFullMenu is true */}
   <FullPageNavOverlay isOpen={showFullMenu} onClose={handleMenuToggle} />
   
   {/* --- BOTTOM CENTER TEXT */}
   <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 text-center">
    <p className="text-white text-xl sm:text-3xl font-semibold tracking-wide">
     THE HALL OF
    </p>
    <p className="text-green-400 text-2xl sm:text-4xl font-bold tracking-widest">
     ZERO LIMITS
    </p>
    <p className="mt-1 sm:mt-2 text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/80">WELCOME</p>
   </div>

   {/* LOGO */}
   <img
    src={Logo}
    alt="Logo"
    
    className="absolute bottom-4 right-4 w-16 sm:w-20 md:w-32 z-50 cursor-pointer"
   />
  </section>
 );
};

export default Index;