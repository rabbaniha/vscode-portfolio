"use client";
import { useState } from "react";

const ScreenshotImageBlur = ({ link, title, className = "" }) => {
  const [imageState, setImageState] = useState("loading");

  const screenshotUrl = `https://api.screenshotmachine.com?key=3ef6ca&url=${link}&device=desktop&dimension=1024x768&format=gif&cacheLimit=14&delay=7000`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent animate-shimmer"></div>
      </div>

      {/* Loading Overlay */}
      {imageState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-foreground/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      <img
        src={screenshotUrl}
        className={`w-full h-64  transition-all duration-700 ease-out ${
          imageState === "loaded"
            ? "opacity-100 scale-100 filter-none"
            : "opacity-0 scale-105 blur-sm"
        }`}
        alt={title}
        onLoad={() => setImageState("loaded")}
        onError={() => setImageState("error")}
        loading="lazy"
      />

      {/* Error State */}
      {imageState === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <div className="text-center text-red-500">
            <div className="w-12 h-12 mx-auto mb-2 text-red-400">❌</div>
            <p className="text-sm">خطا در بارگذاری تصویر</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotImageBlur;
