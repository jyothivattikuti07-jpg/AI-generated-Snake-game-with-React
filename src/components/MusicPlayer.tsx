import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, FastForward, Rewind, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: '0x01',
    title: "NULL_POINTER",
    artist: "VOID_ENGINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "var(--color-glitch-cyan)"
  },
  {
    id: '0x02',
    title: "STACK_OVERFLOW",
    artist: "BUFFER_GHOST",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "var(--color-glitch-magenta)"
  },
  {
    id: '0x03',
    title: "KERNEL_PANIC",
    artist: "ROOT_SHELL",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "var(--color-glitch-cyan)"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-sm bg-black border-2 border-glitch-magenta pixel-border p-4 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-glitch-magenta/30 animate-noise" />
      
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      <div className="flex items-center gap-4">
        <motion.div 
          key={currentTrack.id}
          className="w-16 h-16 border border-glitch-cyan flex items-center justify-center bg-black relative overflow-hidden"
        >
          <Cpu size={24} style={{ color: currentTrack.color }} className="z-10" />
          <div className="absolute inset-0 opacity-10 bg-glitch-cyan animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-glitch-magenta/40" />
        </motion.div>

        <div className="flex-1 overflow-hidden font-pixel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h3 className="text-[10px] truncate text-glitch-cyan glitch-text" data-text={currentTrack.title}>{currentTrack.title}</h3>
              <p className="text-[8px] text-glitch-magenta/60 truncate mt-1">{currentTrack.artist}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-1">
        <div className="h-2 w-full bg-white/5 border border-white/10 relative">
          <motion.div 
            className="h-full bg-glitch-cyan"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.5)_2px,rgba(0,0,0,0.5)_4px)]" />
        </div>
        <div className="flex justify-between text-[6px] font-pixel text-white/30">
          <span>{currentTrack.id}</span>
          <div className="flex items-center gap-1">
            <Activity size={8} className="animate-pulse" />
            <span>STREAM_ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button onClick={handlePrev} className="text-glitch-cyan hover:text-glitch-magenta transition-colors">
          <Rewind size={20} />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 border-2 border-glitch-cyan flex items-center justify-center text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-all"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>

        <button onClick={handleNext} className="text-glitch-cyan hover:text-glitch-magenta transition-colors">
          <FastForward size={20} />
        </button>
      </div>

      <div className="text-[6px] font-pixel text-white/20 text-center mt-2">
        ENCRYPTION_KEY: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}
      </div>
    </div>
  );
};
