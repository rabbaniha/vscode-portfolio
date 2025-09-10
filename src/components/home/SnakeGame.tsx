"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Point = { x: number; y: number };
type GameState =
  | "idle"
  | "playing"
  | "paused"
  | "gameOver"
  | "victory"
  | "nextLevel";

// Level configurations
const LEVELS = [
  { gridWidth: 25, gridHeight: 20, cellSize: 12, speed: 200, name: "آسان" },
  { gridWidth: 30, gridHeight: 24, cellSize: 10, speed: 150, name: "متوسط" },
  { gridWidth: 35, gridHeight: 28, cellSize: 8, speed: 120, name: "سخت" },
  { gridWidth: 40, gridHeight: 32, cellSize: 7, speed: 100, name: "بسیار سخت" },
  { gridWidth: 45, gridHeight: 36, cellSize: 6, speed: 80, name: "غیرممکن" },
];

export default function SnakeGame() {
  const t = useTranslations("games.snake-game");
  const [snake, setSnake] = useState<Point[]>([{ x: 12, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [nextDir, setNextDir] = useState<Point>({ x: 1, y: 0 });
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const currentLevel = LEVELS[level] || LEVELS[0];
  const BOARD_WIDTH = currentLevel.gridWidth * currentLevel.cellSize;
  const BOARD_HEIGHT = currentLevel.gridHeight * currentLevel.cellSize;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("snakeHighScore");
      setHighScore(parseInt(stored || "0"));
    }
  }, []);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(
    (currentSnake: Point[]) => {
      let newFood: Point;
      do {
        newFood = {
          x: Math.floor(Math.random() * currentLevel.gridWidth),
          y: Math.floor(Math.random() * currentLevel.gridHeight),
        };
      } while (
        currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y)
      );
      return newFood;
    },
    [currentLevel]
  );

  const checkSelfCollision = useCallback((head: Point, body: Point[]) => {
    return body.some((seg) => seg.x === head.x && seg.y === head.y);
  }, []);

  const togglePause = useCallback(() => {
    if (gameState === "playing") {
      setGameState("paused");
    } else if (gameState === "paused") {
      setGameState("playing");
    }
  }, [gameState]);

  // Handle keyboard input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (dir.y !== 1) setNextDir({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (dir.y !== -1) setNextDir({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (dir.x !== 1) setNextDir({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (dir.x !== -1) setNextDir({ x: 1, y: 0 });
          break;
        case " ":
          e.preventDefault();
          togglePause();
          break;
        case "Escape":
          setGameState("idle");
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, dir, togglePause]);

  // Game loop
  const moveSnake = useCallback(() => {
    setDir(nextDir);

    setSnake((prevSnake) => {
      const head = {
        x: prevSnake[0].x + nextDir.x,
        y: prevSnake[0].y + nextDir.y,
      };

      // Check wall collision
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= currentLevel.gridWidth ||
        head.y >= currentLevel.gridHeight
      ) {
        setGameState("gameOver");
        return prevSnake;
      }

      // Check self collision
      if (checkSelfCollision(head, prevSnake)) {
        setGameState("gameOver");
        return prevSnake;
      }

      let newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        const newScore = score + 10 * (level + 1); // امتیاز بیشتر در مراحل بالاتر
        setScore(newScore);

        // Check victory condition (snake fills 80% of the board)
        const totalCells = currentLevel.gridWidth * currentLevel.gridHeight;
        if (newSnake.length >= totalCells * 0.8) {
          if (level < LEVELS.length - 1) {
            setGameState("nextLevel");
          } else {
            setGameState("victory");
          }

          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("snakeHighScore", newScore.toString());
          }
          return newSnake;
        }

        // Generate new food
        setFood(generateFood(newSnake));

        // Update high score
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("snakeHighScore", newScore.toString());
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [
    nextDir,
    food,
    score,
    level,
    highScore,
    generateFood,
    checkSelfCollision,
    currentLevel,
  ]);

  // Start game loop
  useEffect(() => {
    if (gameState === "playing") {
      const speed = Math.max(
        50,
        currentLevel.speed - Math.floor(score / 100) * 10
      );
      intervalRef.current = setInterval(moveSnake, speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameState, moveSnake, score, currentLevel]);

  const startGame = useCallback(() => {
    const initialSnake = [
      {
        x: Math.floor(currentLevel.gridWidth / 2),
        y: Math.floor(currentLevel.gridHeight / 2),
      },
    ];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDir({ x: 1, y: 0 });
    setNextDir({ x: 1, y: 0 });
    setScore(0);
    setLevel(0);
    setGameState("playing");
  }, [generateFood, currentLevel]);

  const nextLevel = useCallback(() => {
    if (level < LEVELS.length - 1) {
      const newLevel = level + 1;
      setLevel(newLevel);
      const newLevelConfig = LEVELS[newLevel];
      const initialSnake = [
        {
          x: Math.floor(newLevelConfig.gridWidth / 2),
          y: Math.floor(newLevelConfig.gridHeight / 2),
        },
      ];
      setSnake(initialSnake);
      setFood(generateFood(initialSnake));
      setDir({ x: 1, y: 0 });
      setNextDir({ x: 1, y: 0 });
      setGameState("playing");
    }
  }, [level, generateFood]);

  const resetGame = useCallback(() => {
    setGameState("idle");
    setLevel(0);
  }, []);

  // Snake body segments with continuous appearance
  const renderSnake = () => {
    return snake.map((seg, i) => {
      const isHead = i === 0;
      const isTail = i === snake.length - 1;
      const isBody = !isHead && !isTail;

      // Direction calculations for smooth body
      const prevSeg = i > 0 ? snake[i - 1] : null;
      const nextSeg = i < snake.length - 1 ? snake[i + 1] : null;

      let segmentClass = "absolute bg-primary transition-all duration-100";
      let segmentStyle: React.CSSProperties = {
        left: seg.x * currentLevel.cellSize,
        top: seg.y * currentLevel.cellSize,
        width: currentLevel.cellSize,
        height: currentLevel.cellSize,
      };

      if (isHead) {
        segmentClass += " rounded-full shadow-md shadow-primary/40 z-10";
        segmentStyle.width = currentLevel.cellSize * 1.2;
        segmentStyle.height = currentLevel.cellSize * 1.2;
        segmentStyle.left =
          seg.x * currentLevel.cellSize - currentLevel.cellSize * 0.1;
        segmentStyle.top =
          seg.y * currentLevel.cellSize - currentLevel.cellSize * 0.1;
      } else if (isTail) {
        segmentClass += " rounded-full";
        segmentStyle.width = currentLevel.cellSize * 0.6;
        segmentStyle.height = currentLevel.cellSize * 0.6;
        segmentStyle.left =
          seg.x * currentLevel.cellSize + currentLevel.cellSize * 0.2;
        segmentStyle.top =
          seg.y * currentLevel.cellSize + currentLevel.cellSize * 0.2;
        segmentStyle.opacity = 0.7;
      } else {
        // Body segments - varying sizes for smooth transition
        const bodyRatio = 1 - (i / snake.length) * 0.4; // از 1 تا 0.6
        segmentClass += " rounded-sm";
        segmentStyle.width = currentLevel.cellSize * bodyRatio;
        segmentStyle.height = currentLevel.cellSize * bodyRatio;
        segmentStyle.left =
          seg.x * currentLevel.cellSize +
          (currentLevel.cellSize * (1 - bodyRatio)) / 2;
        segmentStyle.top =
          seg.y * currentLevel.cellSize +
          (currentLevel.cellSize * (1 - bodyRatio)) / 2;
        segmentStyle.opacity = 1 - i * 0.0005;
      }

      return (
        <motion.div
          key={i}
          className={segmentClass}
          style={segmentStyle}
          animate={{ scale: isHead ? 1 : 0.95 }}
          transition={{ duration: 0.1 }}
        >
          {isHead && (
            <div className="absolute inset-1 bg-primary-foreground rounded-full opacity-60" />
          )}
        </motion.div>
      );
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Unified Game Container */}
      <div className="bg-card backdrop-blur-sm rounded-sm p-3 md:p-6 flex flex-col items-center   ">
        {/* Mobile Score Display */}
        <div className="block md:hidden mb-4" style={{ width: BOARD_WIDTH }}>
          <div className="flex justify-between items-center text-sm bg-muted rounded-sm px-3 py-2">
            <div>
              <span className="text-muted-foreground">
                {t("score-board.score")}:{" "}
              </span>
              <span className="text-primary font-mono font-bold">{score}</span>
            </div>
            <div>
              <span className="text-muted-foreground">
                {t("score-board.level")}:{" "}
              </span>
              <span className="text-accent-foreground font-mono">
                {level + 1}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">
                {t("score-board.length")}:{" "}
              </span>
              <span className="text-primary font-mono">{snake.length}</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Game Board */}
          <div className="flex-1">
            <div
              className="relative bg-background border-2 border-primary/30 rounded-sm overflow-hidden shadow-inner mx-auto"
              style={{
                width: BOARD_WIDTH,
                height: BOARD_HEIGHT,
                maxWidth: "100%",
              }}
            >
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--muted-foreground)) 0.5px, transparent 0.5px),
                    linear-gradient(90deg, hsl(var(--muted-foreground)) 0.5px, transparent 0.5px)
                  `,
                  backgroundSize: `${currentLevel.cellSize}px ${currentLevel.cellSize}px`,
                }}
              />

              {/* Snake */}
              {renderSnake()}

              {/* Food */}
              <motion.div
                className="absolute bg-destructive rounded-full shadow-md shadow-destructive/40"
                style={{
                  width: currentLevel.cellSize * 0.8,
                  height: currentLevel.cellSize * 0.8,
                  left:
                    food.x * currentLevel.cellSize +
                    currentLevel.cellSize * 0.1,
                  top:
                    food.y * currentLevel.cellSize +
                    currentLevel.cellSize * 0.1,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="absolute inset-1 bg-destructive-foreground rounded-full opacity-70" />
              </motion.div>

              {/* Game Overlays */}
              <AnimatePresence>
                {(gameState === "gameOver" ||
                  gameState === "victory" ||
                  gameState === "nextLevel" ||
                  gameState === "paused") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center rounded-sm"
                  >
                    <div className="text-center p-4 space-y-3">
                      <motion.div
                        initial={{ scale: 0.9, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                      >
                        {gameState === "victory" && (
                          <>
                            <h2 className="text-xl font-bold text-primary mb-2">
                              {t("game-state.victory.title")}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              {t("game-state.victory.description")}
                            </p>
                          </>
                        )}
                        {gameState === "nextLevel" && (
                          <>
                            <h2 className="text-xl font-bold text-primary mb-2">
                              {t("game-state.next-level.title")}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              {t("game-state.next-level.description") +
                                " " +
                                level +
                                2}
                              {level + 2}؟
                            </p>
                          </>
                        )}
                        {gameState === "gameOver" && (
                          <>
                            <h2 className="text-xl font-bold text-destructive mb-2">
                              {t("game-state.game-over.title")}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              {t("score-board.level")}: {currentLevel.name}
                            </p>
                          </>
                        )}
                        {gameState === "paused" && (
                          <>
                            <h2 className="text-xl font-bold text-primary mb-2">
                              {t("game-state.game-paused.title")}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              {t("game-state.game-paused.description")}
                            </p>
                          </>
                        )}

                        {gameState !== "paused" && (
                          <p className="text-base font-mono">
                            {t("score-board.score")}:{" "}
                            <span className="text-primary font-bold">
                              {score}
                            </span>
                          </p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Score & Controls */}
          <div className="hidden md:block w-32 space-y-3">
            {/* Score Display */}
            <div
              className="bg-muted rounded-sm p-3 space-y-4"
              style={{ height: BOARD_HEIGHT }}
            >
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t("score-board.score")}
                </div>
                <div className="text-lg font-mono font-bold text-primary">
                  {score}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t("score-board.level")}
                </div>
                <div className="text-sm font-medium text-accent-foreground">
                  {currentLevel.name}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t("score-board.best")}
                </div>
                <div className="text-sm font-mono text-accent-foreground">
                  {highScore}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t("score-board.length")}
                </div>
                <div className="text-sm font-mono text-primary">
                  {snake.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 mt-4" style={{ width: BOARD_WIDTH }}>
          {gameState === "idle" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startGame}
              className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
            >
              {t("game-control.start")}
            </motion.button>
          )}

          {gameState === "nextLevel" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextLevel}
              className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
            >
              {t("game-control.next")}
            </motion.button>
          )}

          {gameState === "playing" && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={togglePause}
                className="flex-1 py-2.5 px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
              >
                {t("game-control.pause")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetGame}
                className="flex-1 py-2.5 px-4 bg-muted hover:bg-muted/80 text-muted-foreground font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
              >
                {t("game-control.restart")}
              </motion.button>
            </>
          )}

          {gameState === "paused" && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={togglePause}
                className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
              >
                {t("game-control.continue")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetGame}
                className="flex-1 py-2.5 px-4 bg-muted hover:bg-muted/80 text-muted-foreground font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
              >
                {t("game-control.restart")}
              </motion.button>
            </>
          )}

          {(gameState === "gameOver" || gameState === "victory") && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startGame}
                className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
              >
                {t("game-control.new-game")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetGame}
                className="flex-1 py-2.5 px-4 bg-muted hover:bg-muted/80 text-muted-foreground font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
              >
                {t("game-control.return")}
              </motion.button>
            </>
          )}
        </div>

        {/* Instructions */}
        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xs text-muted-foreground space-y-1 mt-3 pt-3 border-t border-border/30"
          >
            <p>{t("guid.line1")}</p>
            <p>
              <p>{t("guid.line2")}</p>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
