"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Point = { x: number; y: number };

const GRID_SIZE = 15;
const CANVAS_SIZE = 15; // 15x15 cells

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Point>({ x: 0, y: -1 });
  const [running, setRunning] = useState(false);
  const [foodLeft, setFoodLeft] = useState(10);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle keyboard input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && dir.y !== 1) setDir({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && dir.y !== -1) setDir({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && dir.x !== 1) setDir({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && dir.x !== -1) setDir({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dir]);

  // Start game loop
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(moveSnake, 150);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, dir, snake]);

  function moveSnake() {
    setSnake((prev) => {
      const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= CANVAS_SIZE ||
        head.y >= CANVAS_SIZE
      ) {
        setRunning(false);
        return prev;
      }
      let newSnake = [head, ...prev];
      if (head.x === food.x && head.y === food.y) {
        setFoodLeft((f) => f - 1);
        spawnFood();
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }

  function spawnFood() {
    const x = Math.floor(Math.random() * CANVAS_SIZE);
    const y = Math.floor(Math.random() * CANVAS_SIZE);
    setFood({ x, y });
  }

  function startGame() {
    setSnake([{ x: 7, y: 7 }]);
    setFood({ x: 5, y: 5 });
    setDir({ x: 0, y: -1 });
    setFoodLeft(10);
    setRunning(true);
  }

  return (
    <div className="flex items-center justify-center h-[90%] rounded-md bg-gradient-to-br from-primary to-primary/70 p-4 gap-8">
      {/* Game Board */}
      <div className="bg-background rounded-xl p-2">
        <div
          className="relative bg-background rounded-lg shadow-inner"
          style={{
            width: GRID_SIZE * CANVAS_SIZE,
            height: (GRID_SIZE + 5) * CANVAS_SIZE,
          }}
        >
          {/* Snake */}
          {snake.map((seg, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-destructive"
              style={{
                width: GRID_SIZE - 2,
                height: GRID_SIZE - 2,
                left: seg.x * GRID_SIZE,
                top: seg.y * GRID_SIZE,
              }}
              animate={{ scale: i === 0 ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
            />
          ))}
          {/* Food */}
          <motion.div
            className="absolute rounded-full bg-primary"
            style={{
              width: GRID_SIZE - 2,
              height: GRID_SIZE - 2,
              left: food.x * GRID_SIZE,
              top: food.y * GRID_SIZE,
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </div>

        {!running && (
          <button
            onClick={startGame}
            className="mt-4 w-full bg-primary hover:bg-primary/80 text-accent-foreground font-semibold rounded-lg py-2 transition"
          >
            start-game
          </button>
        )}
      </div>

      {/* Instructions Panel */}
      <div className="text-primary-foreground flex flex-col gap-4 justify-between">
        <div className=" flex flex-col items-center gap-2">
          <p>// use keyboard</p>
          <p>// arrows to play</p>
          <div className="grid grid-cols-3 gap-1 mt-2 w-28">
            <div></div>
            <div className="bg-muted text-muted-foreground rounded-md flex items-center justify-center p-2">
              ↑
            </div>
            <div></div>
            <div className="bg-muted text-muted-foreground rounded-md flex items-center justify-center p-2">
              ←
            </div>
            <div className="bg-muted text-muted-foreground rounded-md flex items-center justify-center p-2">
              ↓
            </div>
            <div className="bg-muted text-muted-foreground rounded-md flex items-center justify-center p-2">
              →
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2">// food left</p>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < foodLeft ? "bg-destructive" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <button className="mt-4 bg-muted hover:bg-muted/80 text-muted-foreground px-4 py-1 rounded-lg">
          skip
        </button>
      </div>
    </div>
  );
}
