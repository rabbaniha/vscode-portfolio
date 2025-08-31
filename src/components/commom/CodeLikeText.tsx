"use client";

import { useEffect, useState, useRef } from "react";

type Props = {
  text: string;
  typingSpeed?: number; // میلی‌ثانیه بین هر کاراکتر
  lineDelay?: number; // مکث بین خط‌ها
  autoStart?: boolean; // شروع خودکار انیمیشن
};

function CodeLikeText({
  text,
  typingSpeed = 5,
  lineDelay = 10,
  autoStart = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // محاسبه خط‌ها بر اساس عرض container
  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth / 1.2;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    context.font = "14px monospace";

    const words = text.split(" ");
    let currentLine = "";
    let result: string[] = [];

    for (let word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const metrics = context.measureText(testLine);

      if (metrics.width > containerWidth - 60) {
        result.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) result.push(currentLine);

    setLines(result);

    // ریست انیمیشن برای متن جدید
    if (autoStart) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsTyping(true);
    }
  }, [text, autoStart]);

  // انیمیشن typing
  useEffect(() => {
    if (!isTyping || currentLineIndex >= lines.length || lines.length === 0) {
      setIsTyping(false);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex <= currentLine.length) {
      const timer = setTimeout(() => {
        const partialLine = currentLine.substring(0, currentCharIndex);

        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = partialLine;
          return newLines;
        });

        if (currentCharIndex === currentLine.length) {
          // خط تکمیل شد، برو به خط بعدی
          setTimeout(() => {
            setCurrentLineIndex((prev) => prev + 1);
            setCurrentCharIndex(0);
          }, lineDelay);
        } else {
          setCurrentCharIndex((prev) => prev + 1);
        }
      }, Math.random() * typingSpeed + typingSpeed * 0.5);

      return () => clearTimeout(timer);
    }
  }, [
    currentCharIndex,
    currentLineIndex,
    lines,
    isTyping,
    typingSpeed,
    lineDelay,
  ]);

  const startTyping = () => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
  };

  useEffect(() => {
    startTyping();
  }, []);

  const stopTyping = () => {
    setIsTyping(false);
    // نمایش کامل همه خط‌ها
    setDisplayedLines([...lines]);
  };

  return (
    <div className="w-full">
      {/* محتوای اصلی */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto space-y-2 font-mono p-4 rounded"
      >
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className="grid grid-cols-[50px_auto] items-start gap-2"
          >
            <div className="relative">
              <span className="text-gray-500">{`${index + 1}`}</span>
              <span className="absolute inset-x-9 text-gray-600">*</span>
            </div>
            <span className="relative">
              {line}
              {/* نشانگر cursor فقط در خط فعلی */}
              {index === currentLineIndex && isTyping && (
                <span className="animate-pulse text-primary ml-1">|</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodeLikeText;
