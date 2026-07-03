import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  MonitorPlay, 
  Layout, 
  RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function VideoPlayer({ src, poster, onTheaterModeToggle }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // Player Controls State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls timer
  useEffect(() => {
    let timeout;
    if (isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  // Sync state from HTML5 video events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  // Action Controllers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleTimelineChange = (e) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  const toggleTheater = () => {
    const nextTheater = !isTheater;
    setIsTheater(nextTheater);
    if (onTheaterModeToggle) {
      onTheaterModeToggle(nextTheater);
    }
  };

  const handlePictureInPicture = () => {
    if (!videoRef.current) return;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {});
    } else {
      videoRef.current.requestPictureInPicture().catch(() => {
        toast.error('Picture-in-Picture not supported by your browser');
      });
    }
  };

  // Time Formatter
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Keyboard navigation helpers
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only execute keyboard hotkeys if page cursor is focused on the document body
      if (document.activeElement !== document.body) return;

      switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 't':
          e.preventDefault();
          toggleTheater();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, isTheater]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-brand-border select-none group/player"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        className="w-full h-full object-contain cursor-pointer"
        playsInline
      />

      {/* Centered Large Play/Pause Toggle Indicator */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer transition-opacity"
        >
          <div className="bg-brand-accent/95 p-5 rounded-full text-white shadow-xl hover:scale-105 transition-transform">
            <Play size={24} fill="currentColor" className="ml-0.5" />
          </div>
        </div>
      )}

      {/* Control Tray Overlay - Visible when hovered or paused */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Slider Bar */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleTimelineChange}
            className="w-full h-1 bg-zinc-700 accent-brand-accent rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all"
          />
        </div>

        {/* Lower Tray Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button onClick={togglePlay} className="hover:text-brand-accent transition-colors">
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>

            {/* Volume Control Box */}
            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="hover:text-brand-accent transition-colors">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 overflow-hidden group-hover/volume:w-16 h-1 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer transition-all duration-200"
              />
            </div>

            {/* Time Stamp text */}
            <div className="text-xs text-zinc-300 font-medium tabular-nums select-none">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 text-zinc-500">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Picture in Picture */}
            <button 
              onClick={handlePictureInPicture} 
              className="hover:text-brand-accent transition-colors"
              title="Picture in Picture"
            >
              <MonitorPlay size={18} />
            </button>

            {/* Theater Mode Toggle */}
            <button 
              onClick={toggleTheater} 
              className={`hover:text-brand-accent transition-colors ${isTheater ? 'text-brand-accent' : ''}`}
              title="Theater Mode (T)"
            >
              <Layout size={18} />
            </button>

            {/* Fullscreen Toggle */}
            <button 
              onClick={toggleFullscreen} 
              className="hover:text-brand-accent transition-colors"
              title="Fullscreen (F)"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
