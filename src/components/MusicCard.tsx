import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { tokens } from "../tokens";

interface MusicCardProps {
  title: string;
  artist: string;
  albumArt: string;
  previewUrl: string;
  mood?: "energetic" | "melancholic" | "calm" | "uplifting";
}

const MusicCard: FC<MusicCardProps> = ({
  title,
  artist,
  albumArt,
  previewUrl,
  mood = "uplifting",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [auraScale, setAuraScale] = useState(1);
  const [auraOpacity, setAuraOpacity] = useState(0.3);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const moodColors = {
    energetic: ["#FF6B35", "#FF8C42", "#FFA500", "#FFB347"],
    melancholic: ["#6B8DB3", "#5B7A99", "#4B6A87", "#8B9FC9"],
    calm: ["#7FB3D4", "#8BC3D4", "#9FDCE3", "#B0E0E6"],
    uplifting: ["#D9757D", "#E8A876", "#D4C266", "#B8D9A8"],
  };

  const colors = moodColors[mood];

  // Initialize audio analyzer
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;

    try {
      if (!audioContextRef.current) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = (audioContext as any).createMediaElementAudioSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount) as any;
      }

      const analyzeAudio = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
        const dataArray = dataArrayRef.current;

        // Calculate energy across frequency ranges
        const bass = dataArray.slice(0, Math.floor(dataArray.length * 0.1)).reduce((a, b) => a + b, 0) / Math.floor(dataArray.length * 0.1);
        const mid = dataArray.slice(Math.floor(dataArray.length * 0.3), Math.floor(dataArray.length * 0.6)).reduce((a, b) => a + b, 0) / Math.floor(dataArray.length * 0.3);
        const treble = dataArray.slice(Math.floor(dataArray.length * 0.7), dataArray.length).reduce((a, b) => a + b, 0) / Math.floor(dataArray.length * 0.3);

        // Normalized energy (0-1)
        const avgEnergy = (bass + mid + treble) / (3 * 255);
        const normalizedEnergy = Math.min(avgEnergy * 2, 1);

        setAuraScale(1 + normalizedEnergy * 0.3);
        setAuraOpacity(0.2 + normalizedEnergy * 0.6);

        animationIdRef.current = requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
    } catch (e) {
      console.error("Audio context error:", e);
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.error("Audio element not found");
      return;
    }

    console.log("Audio element initialized:", { src: audio.src });

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      console.log("Audio metadata loaded:", audio.duration);
      setDuration(audio.duration);
    };

    const handleCanPlay = () => {
      console.log("Audio can play");
      setAudioLoaded(true);
      setAudioError(null);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      const errorMsg = audio.error?.message || "Unknown error";
      console.error("Audio load error:", errorMsg);
      setAudioError(`Error loading audio: ${errorMsg}`);
      setAudioLoaded(false);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log("Music paused");
      } else {
        console.log("Attempting to play:", audioRef.current.src);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Music playing successfully");
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Play error:", error);
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(true);
        }
      }
    } else {
      console.error("Audio ref not available");
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <style>{`
        .music-card-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
          border-radius: ${tokens.radius.md};
          background: ${tokens.color.offWhite};
          border: 1px solid ${tokens.color.cardBorder};
          overflow: hidden;
        }

        .aura {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.3;
          pointer-events: none;
        }

        .aura-1 {
          width: 280px;
          height: 280px;
          top: -40px;
          left: -40px;
        }

        .aura-2 {
          width: 320px;
          height: 320px;
          bottom: -60px;
          right: -60px;
        }

        .aura-3 {
          width: 260px;
          height: 260px;
          top: 50%;
          right: -50px;
        }

        .aura-4 {
          width: 300px;
          height: 300px;
          bottom: -40px;
          left: -50px;
        }

        /* Animations only apply when not playing */
        .music-card-container:not(:has(audio[playing])) .aura-1 {
          animation: float-aura-1 6s ease-in-out infinite;
        }

        .music-card-container:not(:has(audio[playing])) .aura-2 {
          animation: float-aura-2 7s ease-in-out infinite 1s;
        }

        .music-card-container:not(:has(audio[playing])) .aura-3 {
          animation: float-aura-3 8s ease-in-out infinite 2s;
        }

        .music-card-container:not(:has(audio[playing])) .aura-4 {
          animation: float-aura-4 9s ease-in-out infinite 0.5s;
        }

        @keyframes float-aura-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }

        @keyframes float-aura-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 25px) scale(1.05); }
        }

        @keyframes float-aura-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 15px) scale(1.08); }
        }

        @keyframes float-aura-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.06); }
        }

        .music-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .album-art {
          width: 180px;
          height: 180px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .album-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .album-art:hover {
          transform: scale(1.05);
        }

        .song-info {
          text-align: center;
        }

        .song-title {
          font-family: ${tokens.font.sans};
          font-size: 18px;
          font-weight: ${tokens.weight.medium};
          color: ${tokens.color.ink};
          margin: 0;
          line-height: ${tokens.leading.snug};
        }

        .song-artist {
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          color: ${tokens.color.muted};
          margin: 4px 0 0 0;
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .play-button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${tokens.color.ink};
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: white;
          font-size: 20px;
        }

        .play-button:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .play-button:active {
          transform: scale(0.95);
        }

        .progress-container {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .progress-bar {
          flex: 1;
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
        }

        .progress-fill {
          height: 100%;
          background: ${tokens.color.ink};
          transition: width 0.1s linear;
        }

        .time-label {
          font-family: ${tokens.font.sans};
          font-size: 12px;
          color: ${tokens.color.muted};
          white-space: nowrap;
          min-width: 40px;
          text-align: right;
        }

        @media (prefers-reduced-motion: reduce) {
          .aura-1, .aura-2, .aura-3, .aura-4 {
            animation: none !important;
          }
          .album-art:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="music-card-container">
        {/* Aura lights */}
        <div
          className="aura aura-1"
          style={{
            background: colors[0],
            opacity: auraOpacity,
            transform: `scale(${auraScale})`,
            transition: isPlaying ? "none" : "all 0.2s ease",
          }}
        />
        <div
          className="aura aura-2"
          style={{
            background: colors[1],
            opacity: auraOpacity,
            transform: `scale(${auraScale * 0.95})`,
            transition: isPlaying ? "none" : "all 0.2s ease",
          }}
        />
        <div
          className="aura aura-3"
          style={{
            background: colors[2],
            opacity: auraOpacity,
            transform: `scale(${auraScale * 1.05})`,
            transition: isPlaying ? "none" : "all 0.2s ease",
          }}
        />
        <div
          className="aura aura-4"
          style={{
            background: colors[3],
            opacity: auraOpacity,
            transform: `scale(${auraScale})`,
            transition: isPlaying ? "none" : "all 0.2s ease",
          }}
        />

        {/* Content */}
        <div className="music-content">
          <div className="album-art">
            <img src={albumArt} alt={title} />
          </div>

          <div className="song-info">
            <h3 className="song-title">{title}</h3>
            <p className="song-artist">{artist}</p>
          </div>

          <div className="controls">
            <button className="play-button" onClick={togglePlay} disabled={!audioLoaded && !audioError}>
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>

          {audioError && (
            <div
              style={{
                fontSize: "12px",
                color: "#d32f2f",
                textAlign: "center",
                maxWidth: "200px",
                marginTop: "8px",
              }}
            >
              {audioError}
            </div>
          )}

          {!audioLoaded && !audioError && (
            <div
              style={{
                fontSize: "12px",
                color: tokens.color.muted,
                textAlign: "center",
              }}
            >
              Loading...
            </div>
          )}

          <div className="progress-container">
            <span className="time-label">{formatTime(progress)}</span>
            <div
              className="progress-bar"
              onClick={(e) => {
                if (audioRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime = percent * duration;
                }
              }}
            >
              <div
                className="progress-fill"
                style={{ width: `${(progress / duration) * 100 || 0}%` }}
              />
            </div>
            <span className="time-label">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={previewUrl}
        crossOrigin="anonymous"
        preload="auto"
      />
    </>
  );
};

export default MusicCard;
