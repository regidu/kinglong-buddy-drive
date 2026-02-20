import { useState, useEffect, useRef, useCallback } from "react";
import truckImg from "@/assets/truck-line-art.png";

const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const GROUND_Y = 200;
const TRUCK_W = 80;
const TRUCK_H = 50;
const CONE_W = 30;
const CONE_H = 40;
const BASE_SPEED = 5;

interface Obstacle { x: number; scored: boolean; }

const KingoRunner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem("kingo_high") || "0"));

  const stateRef = useRef({ y: GROUND_Y - TRUCK_H, vy: 0, obstacles: [] as Obstacle[], score: 0, speed: BASE_SPEED, frame: 0, roadOffset: 0, gameState: "idle" as string });
  const rafRef = useRef<number>(0);
  const truckImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = truckImg;
    img.onload = () => { truckImgRef.current = img; };
  }, []);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState === "idle") {
      s.gameState = "playing";
      s.y = GROUND_Y - TRUCK_H;
      s.vy = 0;
      s.obstacles = [];
      s.score = 0;
      s.speed = BASE_SPEED;
      s.frame = 0;
      setGameState("playing");
      setScore(0);
    }
    if (s.gameState === "playing" && s.y >= GROUND_Y - TRUCK_H - 1) {
      s.vy = JUMP_FORCE;
    }
    if (s.gameState === "over") {
      s.gameState = "idle";
      setGameState("idle");
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); jump(); } };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;

    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Sky
      ctx.fillStyle = "#e8f0fe";
      ctx.fillRect(0, 0, w, GROUND_Y);
      // Road
      ctx.fillStyle = "#555";
      ctx.fillRect(0, GROUND_Y, w, h - GROUND_Y);

      // Road lines
      s.roadOffset = (s.roadOffset + s.speed) % 40;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -s.roadOffset;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + 20);
      ctx.lineTo(w, GROUND_Y + 20);
      ctx.stroke();
      ctx.setLineDash([]);

      if (s.gameState === "playing") {
        s.frame++;
        // Physics
        s.vy += GRAVITY;
        s.y += s.vy;
        if (s.y >= GROUND_Y - TRUCK_H) { s.y = GROUND_Y - TRUCK_H; s.vy = 0; }

        // Speed increase
        s.speed = BASE_SPEED + Math.floor(s.score / 5) * 0.5;

        // Spawn obstacles
        if (s.frame % Math.max(40, 80 - s.score * 2) === 0) {
          s.obstacles.push({ x: w + 20, scored: false });
        }

        // Move obstacles
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          s.obstacles[i].x -= s.speed;
          if (s.obstacles[i].x + CONE_W < 0) { s.obstacles.splice(i, 1); continue; }
          if (!s.obstacles[i].scored && s.obstacles[i].x + CONE_W < 60) {
            s.obstacles[i].scored = true;
            s.score++;
            setScore(s.score);
          }
          // Collision
          const ox = s.obstacles[i].x;
          const oy = GROUND_Y - CONE_H;
          if (60 + TRUCK_W - 20 > ox && 60 < ox + CONE_W && s.y + TRUCK_H - 5 > oy) {
            s.gameState = "over";
            setGameState("over");
            if (s.score > parseInt(localStorage.getItem("kingo_high") || "0")) {
              localStorage.setItem("kingo_high", String(s.score));
              setHighScore(s.score);
            }
          }
        }
      }

      // Draw truck
      const shake = s.gameState === "playing" && s.y >= GROUND_Y - TRUCK_H - 1 ? (Math.random() - 0.5) * 2 : 0;
      if (truckImgRef.current) {
        ctx.drawImage(truckImgRef.current, 60, s.y + shake, TRUCK_W, TRUCK_H);
      } else {
        ctx.fillStyle = "#333";
        ctx.fillRect(60, s.y + shake, TRUCK_W, TRUCK_H);
      }

      // Draw cones
      for (const ob of s.obstacles) {
        const cx = ob.x + CONE_W / 2;
        const cy = GROUND_Y;
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.moveTo(cx, cy - CONE_H);
        ctx.lineTo(cx - CONE_W / 2, cy);
        ctx.lineTo(cx + CONE_W / 2, cy);
        ctx.closePath();
        ctx.fill();
        // Stripes
        ctx.fillStyle = "#fff";
        ctx.fillRect(cx - 8, cy - CONE_H * 0.6, 16, 4);
        ctx.fillRect(cx - 6, cy - CONE_H * 0.35, 12, 3);
      }

      // Score
      ctx.fillStyle = "#333";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`Puntos: ${s.score}`, w - 10, 24);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gradient-gold mb-4">🚐 Kingo Runner</h1>

      <div className="relative w-full max-w-md" onClick={jump} onTouchStart={jump}>
        <canvas
          ref={canvasRef}
          width={400}
          height={260}
          className="w-full rounded-xl border border-border bg-card touch-none"
        />

        {gameState === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
            <p className="text-lg font-bold text-foreground animate-pulse">Toca para empezar</p>
          </div>
        )}

        {gameState === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-xl gap-3">
            <p className="text-xl font-bold text-destructive">¡Game Over!</p>
            <p className="text-foreground font-semibold">Puntos: {score}</p>
            <p className="text-sm text-muted-foreground">Récord: {highScore}</p>
            <button
              onClick={(e) => { e.stopPropagation(); jump(); }}
              className="mt-2 px-6 py-3 rounded-xl bg-gradient-gold text-white font-bold text-lg active:scale-95 transition-transform"
            >
              REINTENTAR
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-3">Toca la pantalla o presiona Espacio para saltar</p>
    </div>
  );
};

export default KingoRunner;
