import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Cpu, Database, ShieldAlert, Wifi } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-glitch-bg text-white font-machine selection:bg-glitch-magenta selection:text-black overflow-hidden relative crt-flicker">
      {/* Scanline Overlay */}
      <div className="scanline-overlay" />
      
      {/* Background Noise Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* Header */}
      <header className="relative z-10 border-b-2 border-glitch-cyan bg-black/80 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-glitch-magenta flex items-center justify-center animate-pulse">
            <Cpu size={20} className="text-glitch-magenta" />
          </div>
          <h1 className="text-lg font-pixel tracking-tighter glitch-text text-glitch-cyan" data-text="GLITCH_SNAKE.SYS">
            GLITCH_SNAKE.SYS
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-[8px] font-pixel text-glitch-cyan/60">
          <span className="hover:text-glitch-magenta cursor-pointer transition-colors">[ MEMORY_DUMP ]</span>
          <span className="hover:text-glitch-magenta cursor-pointer transition-colors">[ SECTOR_SCAN ]</span>
          <span className="hover:text-glitch-magenta cursor-pointer transition-colors">[ ROOT_ACCESS ]</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-glitch-cyan animate-pulse" />
            <span className="text-[8px] font-pixel text-glitch-cyan">UPLINK_STABLE</span>
          </div>
          <div className="h-6 w-[2px] bg-glitch-magenta/30" />
          <div className="text-[8px] font-pixel text-glitch-magenta">USER: {Math.random().toString(36).substring(7).toUpperCase()}</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: System Status */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-2 border-glitch-cyan bg-black/40 relative"
          >
            <div className="absolute -top-3 -left-2 bg-glitch-cyan text-black px-2 text-[8px] font-pixel">STATUS_LOG</div>
            <div className="space-y-2 text-[8px] font-pixel text-glitch-cyan/80 leading-relaxed">
              <p className="text-glitch-magenta">&gt; INITIALIZING_NEURAL_LINK...</p>
              <p>&gt; LOADING_SNAKE_CORE_V2.4</p>
              <p>&gt; BUFFERING_AUDIO_FRAGMENTS</p>
              <p className="animate-pulse">&gt; WAITING_FOR_INPUT_SIGNAL_</p>
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="p-4 border border-glitch-magenta/40 bg-black/20">
              <div className="flex items-center gap-2 mb-2">
                <Database size={12} className="text-glitch-magenta" />
                <span className="text-[8px] font-pixel text-glitch-magenta uppercase">Data Integrity</span>
              </div>
              <div className="h-1 w-full bg-white/5">
                <div className="h-full bg-glitch-magenta animate-[noise_3s_infinite]" style={{ width: '88%' }} />
              </div>
            </div>

            <div className="p-4 border border-glitch-cyan/40 bg-black/20">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert size={12} className="text-glitch-cyan" />
                <span className="text-[8px] font-pixel text-glitch-cyan uppercase">Firewall Status</span>
              </div>
              <div className="text-[10px] font-pixel text-glitch-cyan">ACTIVE_BYPASS_DETECTED</div>
            </div>
          </div>
        </div>

        {/* Center Column: Core Interface */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="mb-4 text-[8px] font-pixel text-glitch-magenta animate-pulse tracking-[0.5em]">
            -- CORE_INTERFACE_01 --
          </div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <SnakeGame />
          </motion.div>
          
          <div className="mt-6 w-full max-w-md grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-1 bg-glitch-cyan/20" />
            ))}
          </div>
        </div>

        {/* Right Column: Audio Processor */}
        <div className="lg:col-span-3 space-y-6">
          <div className="text-right text-[8px] font-pixel text-glitch-cyan mb-2">
            AUDIO_DECODER_V6
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <MusicPlayer />
          </motion.div>

          <div className="p-4 border-2 border-glitch-magenta bg-black/40 relative">
            <div className="absolute -top-3 -right-2 bg-glitch-magenta text-black px-2 text-[8px] font-pixel">WAVE_FORM</div>
            <div className="flex items-end gap-1 h-16 justify-between">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [10, 40, 20, 60, 10] }}
                  transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "linear" }}
                  className="w-2 bg-glitch-cyan/40"
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full py-2 px-6 border-t border-glitch-cyan/20 bg-black/90 flex justify-between items-center z-50">
        <div className="text-[6px] font-pixel text-white/30 uppercase tracking-widest">
          SYSTEM_TIME: {new Date().toISOString()} // SECTOR: 7G
        </div>
        <div className="flex gap-4">
          <div className="w-2 h-2 bg-glitch-cyan animate-pulse" />
          <div className="w-2 h-2 bg-glitch-magenta animate-pulse" />
        </div>
      </footer>
    </div>
  );
}
