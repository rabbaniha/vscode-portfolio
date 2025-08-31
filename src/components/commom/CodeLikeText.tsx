"use client";

import { useEffect, useState, useRef } from "react";

type Props = {
  text: string;
};

export default function CodeLikeText({ text }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth / 2;

    // یک canvas برای محاسبه طول متن با فونت
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    // فونت باید با همون div یکی باشه
    context.font = "14px monospace";

    const words = text.split(" ");
    let currentLine = "";
    let result: string[] = [];

    for (let word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const metrics = context.measureText(testLine);

      if (metrics.width > containerWidth - 60) {
        // 60 = حدود عرض ستون شماره
        result.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) result.push(currentLine);

    setLines(result);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto space-y-2 font-mono"
    >
      {lines.map((line, index) => (
        <div
          key={index}
          className="grid grid-cols-[50px_auto] items-start gap-2"
        >
          <div className=" relative">
            <span className="text-gray-600">{`${index + 1}`}</span>
            <span className=" absolute inset-x-9">*</span>
          </div>
          <span>{line}</span>
        </div>
      ))}
    </div>
  );
}
