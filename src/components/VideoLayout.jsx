// src/components/VideoLayout.jsx
import React from "react";

const VideoLayout = ({ videoSrc, children }) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fullscreen video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* App content above the video */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default VideoLayout;
