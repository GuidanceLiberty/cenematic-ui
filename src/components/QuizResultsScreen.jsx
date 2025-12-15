/* eslint-disable no-unused-vars */
// QuizResultsScreen.jsx (New File)

import React from "react";
import { motion } from "framer-motion";

// 1. Define the four gift categories and their descriptions
const GIFT_CATEGORIES = {
  AVANT_GARDE: {
    title: "THE AVANT-GARDE",
    description:
      "Creative to your core, your strong imagination and unique vision are your gifts, not only as your life's path, but also your gifts to the world around you. Film, music, fine arts, gaming, fashion and cuisine are among the canvases upon which you can leave your mark. Opportunities for you to make the world a better, more beautiful place are as vast as the imagination, which for you is limitless.",
    underlying: "The Decoder",
    tailwindColor: "text-green-400",
  },
  VISIONARY: {
    title: "THE VISIONARY",
    description: "The Visionary gift description...",
    underlying: "The Analyst",
    tailwindColor: "text-white/80",
  },
  ILLUMINATOR: {
    title: "THE ILLUMINATOR",
    description: "The Illuminator gift description...",
    underlying: "The Communicator",
    tailwindColor: "text-white/80",
  },
  EXPLORER: {
    title: "THE EXPLORER",
    description: "The Explorer gift description...",
    underlying: "The Connector",
    tailwindColor: "text-white/80",
  },
};

// --- RADAR CHART PLACEHOLDER COMPONENT (SVG Mock) ---
const RadarChartMock = ({ scores, primaryResultKey }) => {
  // CRITICAL: Check for scores before accessing them
  if (!scores) return null;

  // Data points and settings
  const points = [
    scores.VISIONARY.percentage,
    scores.ILLUMINATOR.percentage,
    scores.AVANT_GARDE.percentage,
    scores.EXPLORER.percentage,
  ];
  const maxVal = 30;
  const size = 300;
  const center = size / 2;
  const radius = center * 0.8;

  const getCoords = (index, score) => {
    const angle = (Math.PI / 2) * index - Math.PI / 2;
    const r = (score / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  const polygonPoints = points
    .map((score, index) => getCoords(index, score))
    .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
      {/* Draw Square Grid */}
      <g>
        {[0.4, 0.7, 1].map((scale, i) => {
          const r = scale * radius;
          const path = [0, 1, 2, 3]
            .map((index) => {
              const angle = (Math.PI / 2) * index - Math.PI / 2;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ");
          return (
            <polygon
              key={i}
              points={path}
              fill="none"
              stroke="rgba(52, 211, 153, 0.3)"
              strokeWidth="1"
            />
          );
        })}
      </g>

      {/* Draw Data Polygon */}
      <polygon
        points={polygonPoints}
        fill="rgba(52, 211, 153, 0.4)"
        stroke="#34D399"
        strokeWidth="2"
        className="transition-all duration-1000"
      />

      {/* Draw Axes/Spokes and Data Points */}
      {[0, 1, 2, 3].map((index) => {
        const angle = (Math.PI / 2) * index - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return (
          <line
            key={`ax-${index}`}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(52, 211, 153, 0.3)"
            strokeWidth="1"
          />
        );
      })}

      {points.map((score, index) => {
        const [x, y] = getCoords(index, score).split(",").map(parseFloat);

        return (
          <g key={`pt-${index}`}>
            <circle
              cx={x}
              cy={y}
              r="4"
              fill="#34D399"
              stroke="#fff"
              strokeWidth="1.5"
            />
          </g>
        );
      })}
    </svg>
  );
};

// --- MAIN QUIZ RESULTS SCREEN COMPONENT ---
const QuizResultsScreen = ({ onClose, scores, primaryResultKey }) => {
  // CRITICAL: Safety return if data hasn't been calculated yet.
  if (!scores || !primaryResultKey) {
    return <p className="text-white">Calculating Results...</p>;
  }

  const primaryResult = GIFT_CATEGORIES[primaryResultKey];

  // Custom label placement logic
  const customLabelPositions = {
    VISIONARY: { top: "23%", right: "23%", textAlign: "right" },
    ILLUMINATOR: { top: "33%", right: "12%", textAlign: "right" },
    AVANT_GARDE: { bottom: "10%", right: "15%", textAlign: "right" },
    EXPLORER: { bottom: "20%", left: "15%", textAlign: "left" },
  };

  return (
    <motion.div
      className="w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row p-4 md:p-10 z-60 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Left Section (Text) */}
      <div className="md:w-1/2 flex flex-col justify-start pt-16 md:pt-20 px-4 md:pr-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-sm uppercase tracking-[0.4em] text-green-400 mb-8">
            QUIZ RESULTS
          </h3>
          <p className="text-white/80 text-base leading-relaxed mb-12 max-w-md">
            You’ve reached the end of the quiz—and quite possibly the beginning
            of a new journey. The findings are each of us: multi-dimensional. Go
            ahead, absorb them, and ask yourself to which path they may be
            pointing.
          </p>
        </motion.div>

        {/* Primary Gift Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mb-10"
        >
          <h2
            className={`text-6xl sm:text-8xl font-black uppercase tracking-wider leading-none ${primaryResult.tailwindColor} mb-6`}
          >
            {primaryResult.title}
          </h2>
          <p className="text-lg uppercase tracking-widest text-white/70 mb-4">
            With underlying characteristics of{" "}
            <span className="text-green-400">{primaryResult.underlying}</span>
          </p>
          <p className="text-white/80 text-base leading-relaxed max-w-lg">
            {primaryResult.description}
          </p>
        </motion.div>

        {/* Back button */}
        <motion.button
          onClick={onClose}
          className="mt-8 px-8 py-3 w-48 bg-green-400 text-black font-extrabold uppercase text-sm border-2 border-green-400 hover:bg-green-700 hover:text-white transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          BACK TO HALL
        </motion.button>
      </div>

      {/* Right Section (Chart) */}
      <div className="md:w-1/2 flex justify-center items-center p-4 md:p-10 relative">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 50,
            delay: 0.5,
          }}
          className="w-[90%] md:w-[90%] h-[400px] md:h-auto"
        >
          {/* Chart Mock */}
          <RadarChartMock scores={scores} primaryResultKey={primaryResultKey} />

          {/* Custom Percentage Labels */}
          <div className="absolute inset-0 flex justify-center items-center">
            {Object.keys(scores).map((key) => {
              const { label, percentage } = scores[key];
              const isPrimary = key === primaryResultKey;

              const style = customLabelPositions[key];
              if (!style) return null;

              return (
                <motion.div
                  key={key}
                  className={`absolute text-white text-sm font-extrabold`}
                  style={style}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <p
                    className={`text-xs uppercase tracking-widest ${
                      isPrimary ? "text-green-400" : "text-white/70"
                    }`}
                  >
                    {label}
                  </p>
                  <p
                    className={`text-lg ${
                      isPrimary ? "text-green-400" : "text-white/90"
                    }`}
                  >
                    {percentage}%
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizResultsScreen;
