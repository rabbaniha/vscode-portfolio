"use client";

import { useTypingStore } from "@/stores/typingStore";
import { useEffect, useState, useRef } from "react";

type Props = {
  text: string;
  typingSpeed?: number;
  lineDelay?: number;
  uniqueKey: string; // اجباری
};

function CodeLikeText({
  text,
  typingSpeed = 5,
  lineDelay = 10,
  uniqueKey,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Zustand store
  const { hasBeenTyped, markAsTyped } = useTypingStore();
  const hasTyped = hasBeenTyped(uniqueKey);

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

    // اگر قبلاً تایپ شده، همه خط‌ها را نمایش بده
    if (hasTyped) {
      setDisplayedLines(result);
      setIsTyping(false);
    } else {
      // Reset برای شروع انیمیشن جدید
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsTyping(true);
    }
  }, [text, hasTyped]); // حذف uniqueKey از اینجا

  // انیمیشن typing
  useEffect(() => {
    console.log("Has typed: ", hasTyped);
    console.log("Is typing: ", isTyping);
    console.log("Current line index: ", currentLineIndex);
    console.log("Lines length: ", lines.length);

    if (
      hasTyped ||
      !isTyping ||
      currentLineIndex >= lines.length ||
      lines.length === 0
    ) {
      if (isTyping && !hasTyped && lines.length > 0) {
        // انیمیشن تمام شد، در store ذخیره کن
        markAsTyped(uniqueKey);
        setIsTyping(false);
      }
      return;
    }

    console.log("Start typing");
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
    hasTyped,
    uniqueKey,
    markAsTyped,
  ]); // text را حذف کردیم

  return (
    <div className="w-full">
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
