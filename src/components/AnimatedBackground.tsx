import type { FC } from "react";

const AnimatedBackground: FC = () => {
  return (
    <>
      <style>{`
        @keyframes wave1 {
          0%, 100% { d: path('M 0,100 Q 250,50 500,100 T 1000,100 L 1000,0 L 0,0 Z'); }
          50% { d: path('M 0,80 Q 250,30 500,80 T 1000,80 L 1000,0 L 0,0 Z'); }
        }

        @keyframes wave2 {
          0%, 100% { d: path('M 0,140 Q 250,110 500,140 T 1000,140 L 1000,120 Q 500,80 0,120 Z'); }
          50% { d: path('M 0,160 Q 250,130 500,160 T 1000,160 L 1000,120 Q 500,80 0,120 Z'); }
        }

        @keyframes wave3 {
          0%, 100% { d: path('M 0,180 Q 250,160 500,180 T 1000,180 L 1000,160 Q 500,140 0,160 Z'); }
          50% { d: path('M 0,200 Q 250,180 500,200 T 1000,200 L 1000,160 Q 500,140 0,160 Z'); }
        }

        @keyframes colorShift {
          0%, 100% {
            stop-color: #4B63B5;
          }
          50% {
            stop-color: #6B7FCF;
          }
        }

        @keyframes colorShift2 {
          0%, 100% {
            stop-color: #E8A876;
          }
          50% {
            stop-color: #D9A5A5;
          }
        }

        .wave1 {
          animation: wave1 8s ease-in-out infinite;
        }

        .wave2 {
          animation: wave2 10s ease-in-out infinite;
          animation-delay: -1s;
        }

        .wave3 {
          animation: wave3 12s ease-in-out infinite;
          animation-delay: -2s;
        }

        .gradient-stop-1 {
          animation: colorShift 6s ease-in-out infinite;
        }

        .gradient-stop-2 {
          animation: colorShift2 7s ease-in-out infinite;
          animation-delay: -0.5s;
        }

        .animated-bg-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .animated-bg-container svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>

      <div className="animated-bg-container">
        <svg
          viewBox="0 0 1000 300"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="gradient-stop-1" />
              <stop offset="100%" className="gradient-stop-2" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect width="1000" height="300" fill="url(#waveGradient)" opacity="0.1" />

          {/* Waves */}
          <path
            className="wave1"
            fill="url(#waveGradient)"
            opacity="0.3"
            d="M 0,100 Q 250,50 500,100 T 1000,100 L 1000,0 L 0,0 Z"
          />

          <path
            className="wave2"
            fill="url(#waveGradient)"
            opacity="0.2"
            d="M 0,140 Q 250,110 500,140 T 1000,140 L 1000,120 Q 500,80 0,120 Z"
          />

          <path
            className="wave3"
            fill="url(#waveGradient)"
            opacity="0.15"
            d="M 0,180 Q 250,160 500,180 T 1000,180 L 1000,160 Q 500,140 0,160 Z"
          />
        </svg>
      </div>
    </>
  );
};

export default AnimatedBackground;
