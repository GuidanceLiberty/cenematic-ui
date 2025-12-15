import React, { useEffect, useState } from "react";
import VideoBg from "@/assets/img/hero/video1.webm";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Logo from "@/assets/img/logo/logo-theme.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const cardTexts = [
    <>
      You have entered the{" "}
      <span className="text-white">Hall of Zero Limits.</span> Great things lie
      ahead for all who open themselves to finding their gift.
    </>,
    <>
      This is an ever-changing space for{" "}
      <span className="text-white">creativity and growth.</span>{" "}
      <span className="text-green-400">Here, you will find </span>
      new insights and tools{" "}
      <span className="text-green-400">
        to help inspire you. After all, inspiration is the water everything
        needs to grow.
      </span>
    </>,
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === cardTexts.length - 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (!isLast) {
      setActiveIndex((prev) => prev + 1);
    } else {
      navigate("/begin");
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="fixed inset-0 z-50 h-full w-full flex justify-center items-center" id="hero">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VideoBg}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/80" />

      <div className="absolute top-6 left-6 z-20">
        <p className="text-green-400 text-sm tracking-widest uppercase">The</p>
        <p className="text-white text-3xl font-semibold tracking-wide leading-tight uppercase">
          Hall of <br />
          <span className="text-green-400 uppercase">Zero Limits</span>
        </p>
      </div>

      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="absolute z-20 top-1/2 left-0 -translate-y-1/2 w-full px-6
                       md:top-unset md:bottom-72 md:left-1/2 md:-translate-x-1/2 md:translate-y-0 md:w-auto md:px-0
                       lg:bottom-6 lg:left-6 lg:-translate-x-0"
          >
            <div
              className="
                relative
                overflow-visible
                px-4 sm:px-10 rounded-xl
                bg-emerald-900/20 backdrop-blur-md
                p-4 shadow-lg
                w-full h-56 md:w-[500px] md:h-[250px]
                border border-white rounded-tr-4xl rounded-bl-4xl
              "
            >
              <div className="orb-wrapper">
                <div className="orb" />
              </div>

              <div className="grid grid-rows-[1fr_auto] h-full pl-10 md:pl-20">
                <div className="min-h-[100px] pt-2">
                  <p
                    key={activeIndex}
                    className="text-green-400 text-sm sm:text-md leading-relaxed transition-opacity duration-300"
                  >
                    {cardTexts[activeIndex]}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <p className="text-white uppercase tracking-widest text-xl sm:text-2xl font-semibold glow">
                    wisdom <br />
                    guide
                  </p>

                  <div className="flex gap-4 text-white">
                    <ArrowLeftCircle
                      size={44}
                      onClick={handlePrev}
                      className={`border rounded-2xl transition ${
                        isFirst
                          ? "border-white/30 text-white/30 cursor-not-allowed"
                          : "border-white cursor-pointer hover:bg-orange-600"
                      }`}
                    />

                    <ArrowRightCircle
                      size={44}
                      onClick={handleNext}
                      className="border border-white rounded-2xl cursor-pointer hover:bg-orange-600 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-center md:bottom-10">
        <p className="text-white text-xl sm:text-3xl font-semibold tracking-wide">
          THE HALL OF
        </p>
        <p className="text-green-400 text-2xl sm:text-4xl font-bold tracking-widest">
          ZERO LIMITS
        </p>
        <p className="mt-2 text-xs tracking-[0.3em] text-white/80">WELCOME</p>
      </div>

      <img
        src={Logo}
        alt="Logo"
        className="absolute bottom-4 right-4 w-12 sm:w-20 md:w-40 z-50 cursor-pointer"
      />
    </section>
  );
};

export default Hero;