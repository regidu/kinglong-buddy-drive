import { useState, useEffect, useRef, useCallback } from "react";

const LANE_COUNT = 3;
const LANE_WIDTH = 80;
const GAME_W = LANE_COUNT * LANE_WIDTH;
const GAME_H = 500;
const TRUCK_SIZE = 50;
const OBS_SIZE = 40;
const BASE_SPEED = 3;
const SPAWN_INTERVAL_BASE = 60;

type ObstacleType = "cone" | "car_red" | "car_blue" | "barrel" | "lantern";
interface Obstacle {
  lane: number;
  y: number;
  type: ObstacleType;
  scored: boolean;
}

const obstacleTypes: ObstacleType[] = ["cone", "car_red", "car_blue", "barrel", "lantern"];

const KingoRunner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem("kingo_high") || "0"));

  const stateRef = useRef({
    lane: 1,
    targetLane: 1,
    truckX: LANE_WIDTH + (LANE_WIDTH - TRUCK_SIZE) / 2,
    obstacles: [] as Obstacle[],
    score: 0,
    speed: BASE_SPEED,
    frame: 0,
    roadOffset: 0,
    gameState: "idle" as string,
    buildingOffset: 0,
  });

  const rafRef = useRef<number>(0);
  const touchStartRef = useRef<number | null>(null);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState === "over") {
      s.gameState = "idle";
      setGameState("idle");
      return;
    }
    if (s.gameState === "idle") {
      s.gameState = "playing";
      s.lane = 1;
      s.targetLane = 1;
      s.truckX = LANE_WIDTH + (LANE_WIDTH - TRUCK_SIZE) / 2;
      s.obstacles = [];
      s.score = 0;
      s.speed = BASE_SPEED;
      s.frame = 0;
      setGameState("playing");
      setScore(0);
    }
  }, []);

  const moveLane = useCallback((dir: -1 | 1) => {
    const s = stateRef.current;
    if (s.gameState !== "playing") return;
    const newLane = s.targetLane + dir;
    if (newLane >= 0 && newLane < LANE_COUNT) {
      s.targetLane = newLane;
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") { e.preventDefault(); moveLane(-1); }
      if (e.code === "ArrowRight" || e.code === "KeyD") { e.preventDefault(); moveLane(1); }
      if (e.code === "Space") { e.preventDefault(); startGame(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [moveLane, startGame]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    if (stateRef.current.gameState !== "playing") startGame();
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(dx) > 30) moveLane(dx > 0 ? 1 : -1);
    touchStartRef.current = null;
  };

  const drawTruck = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = "#f5f5f5";
    ctx.beginPath();
    ctx.roundRect(x + 5, y + 5, TRUCK_SIZE - 10, TRUCK_SIZE - 10, 6);
    ctx.fill();
    ctx.strokeStyle = "#c8a961";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#87CEEB";
    ctx.beginPath();
    ctx.roundRect(x + 12, y + 8, TRUCK_SIZE - 24, 14, 3);
    ctx.fill();
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(x + 8, y + 8, 4, 4);
    ctx.fillRect(x + TRUCK_SIZE - 12, y + 8, 4, 4);
    ctx.strokeStyle = "#c8a961";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 25); ctx.lineTo(x + 8, y + 40);
    ctx.moveTo(x + TRUCK_SIZE - 8, y + 25); ctx.lineTo(x + TRUCK_SIZE - 8, y + 40);
    ctx.stroke();
    ctx.fillStyle = "#333";
    ctx.fillRect(x + 3, y + 12, 5, 10);
    ctx.fillRect(x + TRUCK_SIZE - 8, y + 12, 5, 10);
    ctx.fillRect(x + 3, y + 32, 5, 10);
    ctx.fillRect(x + TRUCK_SIZE - 8, y + 32, 5, 10);
  };

  const drawObstacle = (ctx: CanvasRenderingContext2D, x: number, y: number, type: ObstacleType) => {
    const cx = x + OBS_SIZE / 2;
    switch (type) {
      case "cone":
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.moveTo(cx, y); ctx.lineTo(x + 5, y + OBS_SIZE); ctx.lineTo(x + OBS_SIZE - 5, y + OBS_SIZE);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillRect(cx - 6, y + OBS_SIZE * 0.35, 12, 4);
        ctx.fillRect(cx - 4, y + OBS_SIZE * 0.6, 8, 3);
        break;
      case "car_red":
        ctx.fillStyle = "#dc2626";
        ctx.beginPath(); ctx.roundRect(x + 4, y + 4, OBS_SIZE - 8, OBS_SIZE - 8, 5); ctx.fill();
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(x + 2, y + 10, 4, 8); ctx.fillRect(x + OBS_SIZE - 6, y + 10, 4, 8);
        ctx.fillRect(x + 2, y + 28, 4, 8); ctx.fillRect(x + OBS_SIZE - 6, y + 28, 4, 8);
        ctx.fillStyle = "#87CEEB";
        ctx.beginPath(); ctx.roundRect(x + 10, y + 6, OBS_SIZE - 20, 10, 2); ctx.fill();
        break;
      case "car_blue":
        ctx.fillStyle = "#2563eb";
        ctx.beginPath(); ctx.roundRect(x + 4, y + 4, OBS_SIZE - 8, OBS_SIZE - 8, 5); ctx.fill();
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(x + 2, y + 10, 4, 8); ctx.fillRect(x + OBS_SIZE - 6, y + 10, 4, 8);
        ctx.fillRect(x + 2, y + 28, 4, 8); ctx.fillRect(x + OBS_SIZE - 6, y + 28, 4, 8);
        ctx.fillStyle = "#87CEEB";
        ctx.beginPath(); ctx.roundRect(x + 10, y + 6, OBS_SIZE - 20, 10, 2); ctx.fill();
        break;
      case "barrel":
        ctx.fillStyle = "#78716c";
        ctx.beginPath(); ctx.arc(cx, y + OBS_SIZE / 2, OBS_SIZE / 2 - 4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#a8a29e"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, y + OBS_SIZE / 2, OBS_SIZE / 2 - 4, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = "#fbbf24";
        ctx.fillRect(cx - 4, y + OBS_SIZE / 2 - 6, 8, 12);
        break;
      case "lantern":
        // Chinese lantern
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.ellipse(cx, y + OBS_SIZE / 2, OBS_SIZE / 2 - 6, OBS_SIZE / 2 - 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fbbf24"; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - 8, y + OBS_SIZE * 0.3); ctx.lineTo(cx + 8, y + OBS_SIZE * 0.3);
        ctx.moveTo(cx - 10, y + OBS_SIZE * 0.5); ctx.lineTo(cx + 10, y + OBS_SIZE * 0.5);
        ctx.moveTo(cx - 8, y + OBS_SIZE * 0.7); ctx.lineTo(cx + 8, y + OBS_SIZE * 0.7);
        ctx.stroke();
        // Top knob
        ctx.fillStyle = "#fbbf24";
        ctx.fillRect(cx - 3, y, 6, 6);
        // Tassel
        ctx.strokeStyle = "#fbbf24"; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 2, y + OBS_SIZE - 2); ctx.lineTo(cx - 4, y + OBS_SIZE + 4);
        ctx.moveTo(cx, y + OBS_SIZE - 2); ctx.lineTo(cx, y + OBS_SIZE + 5);
        ctx.moveTo(cx + 2, y + OBS_SIZE - 2); ctx.lineTo(cx + 4, y + OBS_SIZE + 4);
        ctx.stroke();
        break;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, GAME_W, GAME_H);

      ctx.fillStyle = "#d4c5a9";
      ctx.fillRect(0, 0, 15, GAME_H);
      ctx.fillRect(GAME_W - 15, 0, 15, GAME_H);

      ctx.fillStyle = "#3a3a3a";
      ctx.fillRect(15, 0, GAME_W - 30, GAME_H);

      s.roadOffset = (s.roadOffset + s.speed) % 30;
      ctx.strokeStyle = "#ffffff55";
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 12]);
      for (let i = 1; i < LANE_COUNT; i++) {
        const lx = 15 + ((GAME_W - 30) / LANE_COUNT) * i;
        ctx.lineDashOffset = -s.roadOffset;
        ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx, GAME_H); ctx.stroke();
      }
      ctx.setLineDash([]);

      s.buildingOffset = (s.buildingOffset + s.speed * 0.5) % 120;
      const colors = ["#e74c3c", "#f39c12", "#e91e63", "#9b59b6", "#3498db", "#1abc9c"];
      for (let yy = -s.buildingOffset; yy < GAME_H + 120; yy += 60) {
        const ci = Math.abs(Math.floor(yy / 60)) % colors.length;
        ctx.fillStyle = colors[ci] + "88";
        ctx.fillRect(1, yy, 12, 8);
        ctx.fillStyle = colors[(ci + 3) % colors.length] + "88";
        ctx.fillRect(GAME_W - 13, yy + 25, 12, 8);
        ctx.fillStyle = "#fbbf2488";
        ctx.fillRect(3, yy + 15, 3, 3);
        ctx.fillRect(GAME_W - 8, yy + 40, 3, 3);
      }

      if (s.gameState === "playing") {
        s.frame++;
        s.speed = BASE_SPEED + Math.floor(s.score / 5) * 0.5;

        const targetX = 15 + ((GAME_W - 30) / LANE_COUNT) * s.targetLane + ((GAME_W - 30) / LANE_COUNT - TRUCK_SIZE) / 2;
        s.truckX += (targetX - s.truckX) * 0.3;

        const spawnRate = Math.max(25, SPAWN_INTERVAL_BASE - s.score * 1.5);
        if (s.frame % Math.floor(spawnRate) === 0) {
          const lane = Math.floor(Math.random() * LANE_COUNT);
          const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
          s.obstacles.push({ lane, y: -OBS_SIZE, type, scored: false });
        }

        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const ob = s.obstacles[i];
          ob.y += s.speed;
          if (ob.y > GAME_H + 20) { s.obstacles.splice(i, 1); continue; }
          if (!ob.scored && ob.y > GAME_H - TRUCK_SIZE) {
            ob.scored = true;
            s.score++;
            setScore(s.score);
          }
          const obX = 15 + ((GAME_W - 30) / LANE_COUNT) * ob.lane + ((GAME_W - 30) / LANE_COUNT - OBS_SIZE) / 2;
          const truckTop = GAME_H - TRUCK_SIZE - 20;
          if (
            ob.y + OBS_SIZE > truckTop + 8 &&
            ob.y < truckTop + TRUCK_SIZE - 8 &&
            Math.abs(obX + OBS_SIZE / 2 - (s.truckX + TRUCK_SIZE / 2)) < (TRUCK_SIZE / 2 + OBS_SIZE / 2 - 12)
          ) {
            s.gameState = "over";
            setGameState("over");
            if (s.score > parseInt(localStorage.getItem("kingo_high") || "0")) {
              localStorage.setItem("kingo_high", String(s.score));
              setHighScore(s.score);
            }
          }
        }
      }

      for (const ob of s.obstacles) {
        const obX = 15 + ((GAME_W - 30) / LANE_COUNT) * ob.lane + ((GAME_W - 30) / LANE_COUNT - OBS_SIZE) / 2;
        drawObstacle(ctx, obX, ob.y, ob.type);
      }

      drawTruck(ctx, s.truckX, GAME_H - TRUCK_SIZE - 20);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`⭐ ${s.score}`, GAME_W - 20, 24);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gradient-gold mb-1">🚐 Kingo Runner</h1>
      <p className="text-xs text-muted-foreground mb-3">Récord: {highScore} ⭐</p>

      <div
        className="relative w-full max-w-[240px]"
        onClick={startGame}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <canvas ref={canvasRef} width={GAME_W} height={GAME_H} className="w-full rounded-xl border border-border bg-card touch-none" />

        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 rounded-xl gap-2">
            <p className="text-lg font-bold text-foreground animate-pulse">Toca para empezar</p>
            <p className="text-xs text-muted-foreground">Desliza ← → para esquivar</p>
          </div>
        )}

        {gameState === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-xl gap-3">
            <p className="text-xl font-bold text-destructive">¡Game Over!</p>
            <p className="text-foreground font-semibold">Puntos: {score}</p>
            <p className="text-sm text-muted-foreground">Récord: {highScore}</p>
            <button
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="mt-2 px-6 py-3 rounded-xl bg-gradient-gold text-white font-bold text-lg active:scale-95 transition-transform"
            >
              REINTENTAR
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">Desliza para moverte • Esquiva conos, autos, barriles y linternas 🏮</p>
    </div>
  );
};

export default KingoRunner;
