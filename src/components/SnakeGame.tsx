import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 120;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setFood(generateFood());
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-black border-2 border-glitch-cyan pixel-border relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-glitch-cyan/20 animate-pulse" />
      
      <div className="flex justify-between w-full items-center px-2 font-pixel text-[8px]">
        <div className="flex items-center gap-2 text-glitch-cyan">
          <Terminal size={12} />
          <span>DATA_FRAGS: {score.toString().padStart(4, '0')}</span>
        </div>
        <div className="text-glitch-magenta animate-pulse">
          {isPaused ? 'SYSTEM_HALTED' : 'PROCESS_RUNNING'}
        </div>
      </div>

      <div 
        className="relative bg-[#050505] border border-glitch-magenta/30"
        style={{ 
          width: GRID_SIZE * 16, 
          height: GRID_SIZE * 16,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute ${i === 0 ? 'bg-glitch-cyan cyan-glow' : 'bg-glitch-cyan/40'}`}
            style={{
              width: '14px',
              height: '14px',
              left: `${segment.x * 16 + 1}px`,
              top: `${segment.y * 16 + 1}px`,
              zIndex: 10
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-glitch-magenta magenta-glow animate-pulse"
          style={{
            width: '10px',
            height: '10px',
            left: `${food.x * 16 + 3}px`,
            top: `${food.y * 16 + 3}px`,
            zIndex: 5
          }}
        />

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20">
            <h2 className="text-xl font-pixel text-glitch-magenta mb-6 glitch-text" data-text="FATAL_ERROR">FATAL_ERROR</h2>
            <button 
              onClick={resetGame}
              className="px-4 py-2 bg-glitch-cyan text-black font-pixel text-[10px] hover:bg-glitch-magenta transition-colors"
            >
              REBOOT_SYS
            </button>
          </div>
        )}

        {/* Start Overlay */}
        {isPaused && !isGameOver && snake.length === 1 && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20">
            <button 
              onClick={() => setIsPaused(false)}
              className="px-6 py-3 border-2 border-glitch-cyan text-glitch-cyan font-pixel text-[10px] hover:bg-glitch-cyan hover:text-black transition-all"
            >
              INITIALIZE_CORE
            </button>
            <p className="mt-4 text-[6px] text-white/30 font-pixel">INPUT_REQUIRED: ARROW_KEYS</p>
          </div>
        )}
      </div>
      
      <div className="w-full h-2 bg-glitch-magenta/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-glitch-magenta/40 animate-[noise_2s_infinite]" style={{ width: '30%' }} />
      </div>
    </div>
  );
};
