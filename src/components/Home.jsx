import React from "react";
import VideoBg from "@/assets/img/hero/video.mp4";
import Logo from "@/assets/img/logo/logo-theme.png";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom"; 

const Home = () => {
  const navigate = useNavigate(); 

  const slideUpStyle = {
    animation: "slideUp 3.5s ease-out forwards", 
  };

  // ✅ handle Enter button click
  const handleEnter = () => {
    navigate("/hero");
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
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
      <div className="absolute inset-0 bg-green-400/20" />

      {/* Accessible Button */}
      <Button
        size="default"
        className="
          absolute top-4 right-4 z-50
          h-16 w-[200px]
          border border-white
          rounded-sm rounded-tr-2xl rounded-bl-2xl
          bg-black/20 hover:bg-green-600/20 text-white glow
          text-sm sm:text-base
          flex items-center justify-center
          whitespace-nowrap
          cursor-pointer
        "
      >
        Accessible Version &gt; &gt; &gt;
      </Button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white w-full h-full gap-6 cursor-pointer">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="w-32 sm:w-40 md:w-48 cursor-pointer"
        />

        {/* Title */}
        <div className="flex items-end gap-2" style={slideUpStyle}>
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold glow">THE</span>
          <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-extrabold glow">HALL</span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold glow">OF</span>
        </div>

        <p
          className="text-4xl sm:text-6xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-extrabold glow"
          style={slideUpStyle}
        >
          ZERO LIMITS
        </p>

        {/* Sub-text */}
        <p
          className="tracking-widest glow text-sm sm:text-lg md:text-xl lg:text-2xl uppercase"
          style={slideUpStyle}
        >
          explore new paths.
        </p>

        <p
          className="tracking-widest glow text-sm sm:text-lg md:text-xl lg:text-2xl uppercase"
          style={slideUpStyle}
        >
          find your gifts.
        </p>

        {/* Enter Button ✅ */}
        <Button
          size="default"
          className="
            h-16 w-[200px]
            border border-white
            rounded-sm rounded-tr-2xl rounded-bl-2xl
            bg-green-600/20 text-white glow
            text-sm sm:text-base
            flex items-center justify-center
            mt-6
            cursor-pointer
          "
          onClick={handleEnter} 
        >
          ENTER &gt; &gt; &gt;
        </Button>
      </div>

      {/* Bottom Corner logo */}
      <img
        src={Logo}
        alt="Logo"
        className="absolute bottom-4 right-4 w-20 sm:w-32 md:w-40 z-50 cursor-pointer"
        style={slideUpStyle}
      />

      {/* Inline CSS Keyframes */}
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(100px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </section>
  );
};

export default Home;
