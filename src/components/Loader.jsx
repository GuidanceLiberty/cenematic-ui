import { useEffect, useState } from "react";
import Logo from "@/assets/img/logo/logo-theme.png";

const Loader = ({ onComplete, bgImage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const slideUpStyle = {
    animation: "slideUp 3.5s ease-out forwards", 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-white w-full px-4 sm:px-8 md:px-16 lg:px-32 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="w-32 sm:w-40 md:w-48 lg:w-48 max-w-xs mb-6 sm:mb-8 md:mb-10"
          style={slideUpStyle}
        />

        {/* Title */}
        <div
          className="flex flex-row flex-wrap justify-center items-end text-center gap-2"
          style={slideUpStyle}
        >
          <span className="text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-xl relative -top-1 sm:-top-2 uppercase font-bold glow">
            THE
          </span>

          <span className="text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-5xl font-extrabold uppercase glow">
            HALL
          </span>

          <span className="text-[3.5vw] sm:text-[2.5vw] md:text-[2vw] lg:text-xl relative top-0 sm:top-1 p-1 sm:p-2 uppercase font-bold glow">
            OF
          </span>
        </div>

        <span
          className="mb-6 sm:mb-8 md:mb-10 text-[6vw] sm:text-[4vw] md:text-[3vw] lg:text-5xl font-extrabold uppercase glow"
          style={slideUpStyle}
        >
          ZEROLIMITS
        </span>

        {/* Loading bar */}
        <div className="w-[80vw] sm:w-64 md:w-80 lg:w-96 h-[2px] bg-gray-600 overflow-hidden rounded">
          <div
            className="h-full bg-green-500 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p
          className="mt-2 sm:mt-4 text-[3vw] sm:text-xs tracking-widest"
          style={slideUpStyle}
        >
          {progress}%
        </p>
      </div>

      {/* Inline CSS Keyframes */}
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(100px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
