import type { FC } from "react";
import { tokens } from "../../tokens";

interface MatrixItem {
  label: string;
  shortLabel: string;
  color: string;
  darkColor: string;
  icon: string;
  x: number; // 0-100, effort
  y: number; // 0-100, impact
  quadrant: string;
}

const EffortImpactMatrix: FC = () => {
  const items: MatrixItem[] = [
    { label: "Gamified safety instructions", shortLabel: "Gamified safety", color: "#22C55E", darkColor: "#16A34A", icon: "✓", x: 12, y: 88, quadrant: "Do First" },
    { label: "Better EEW vs CEN differentiation", shortLabel: "Alert clarity", color: "#22C55E", darkColor: "#16A34A", icon: "✓", x: 22, y: 78, quadrant: "Do First" },
    { label: "Map shown first", shortLabel: "Map-first layout", color: "#22C55E", darkColor: "#16A34A", icon: "✓", x: 12, y: 68, quadrant: "Do First" },
    { label: "News section", shortLabel: "News section", color: "#3B82F6", darkColor: "#1D4ED8", icon: "◆", x: 72, y: 75, quadrant: "Plan Ahead" },
    { label: "User-submitted photos", shortLabel: "Photo feed", color: "#3B82F6", darkColor: "#1D4ED8", icon: "◆", x: 82, y: 62, quadrant: "Plan Ahead" },
    { label: "Sharing location", shortLabel: "Location sharing", color: "#3B82F6", darkColor: "#1D4ED8", icon: "◆", x: 62, y: 65, quadrant: "Plan Ahead" },
    { label: "Remove 'MyLog'", shortLabel: "Remove MyLog", color: "#F59E0B", darkColor: "#D97706", icon: "◇", x: 18, y: 42, quadrant: "Nice to Have" },
    { label: "Logo & icons", shortLabel: "Rebrand", color: "#F59E0B", darkColor: "#D97706", icon: "◇", x: 32, y: 38, quadrant: "Nice to Have" },
    { label: "Dark mode", shortLabel: "Dark mode", color: "#F59E0B", darkColor: "#D97706", icon: "◇", x: 24, y: 25, quadrant: "Nice to Have" },
    { label: "3D earthquake map", shortLabel: "3D map", color: "#DC2626", darkColor: "#B91C1C", icon: "○", x: 82, y: 38, quadrant: "Pass" },
  ];

  const matrixSize = 640;
  const padding = 80;
  const innerWidth = matrixSize - padding * 2;
  const innerHeight = matrixSize - padding * 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        marginBottom: 32,
      }}
    >
      {/* Matrix SVG */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <svg
          width={matrixSize}
          height={matrixSize}
          style={{
            maxWidth: "100%",
            height: "auto",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.06))",
          }}
          role="img"
          aria-label="Impact-Effort Matrix showing feature prioritization by quadrant"
        >
          {/* Quadrant backgrounds */}
          <rect
            x={padding}
            y={padding}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#16A34A"
            opacity="0.08"
          />
          <rect
            x={padding + innerWidth / 2}
            y={padding}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#1D4ED8"
            opacity="0.08"
          />
          <rect
            x={padding}
            y={padding + innerHeight / 2}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#D97706"
            opacity="0.08"
          />
          <rect
            x={padding + innerWidth / 2}
            y={padding + innerHeight / 2}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#B91C1C"
            opacity="0.08"
          />

          {/* Quadrant labels */}
          <text
            x={padding + innerWidth / 4}
            y={padding + 24}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#16A34A"
            textAnchor="middle"
            opacity="0.75"
          >
            Do First
          </text>
          <text
            x={padding + (innerWidth * 3) / 4}
            y={padding + 24}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#1D4ED8"
            textAnchor="middle"
            opacity="0.75"
          >
            Plan Ahead
          </text>
          <text
            x={padding + innerWidth / 4}
            y={padding + innerHeight + 32}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#D97706"
            textAnchor="middle"
            opacity="0.75"
          >
            Fill In
          </text>
          <text
            x={padding + (innerWidth * 3) / 4}
            y={padding + innerHeight + 32}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#B91C1C"
            textAnchor="middle"
            opacity="0.75"
          >
            Pass
          </text>

          {/* Grid lines */}
          <line
            x1={padding}
            y1={padding + innerHeight / 2}
            x2={padding + innerWidth}
            y2={padding + innerHeight / 2}
            stroke={tokens.color.cardBorder}
            strokeWidth="1"
            opacity="0.4"
          />
          <line
            x1={padding + innerWidth / 2}
            y1={padding}
            x2={padding + innerWidth / 2}
            y2={padding + innerHeight}
            stroke={tokens.color.cardBorder}
            strokeWidth="1"
            opacity="0.4"
          />

          {/* Axes */}
          <line
            x1={padding}
            y1={padding + innerHeight}
            x2={padding + innerWidth}
            y2={padding + innerHeight}
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + innerHeight}
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />

          {/* Axis arrows */}
          <polygon
            points={`${padding + innerWidth},${padding + innerHeight} ${padding + innerWidth - 8},${padding + innerHeight - 4} ${padding + innerWidth - 8},${padding + innerHeight + 4}`}
            fill="#9CA3AF"
          />
          <polygon
            points={`${padding},${padding} ${padding - 4},${padding + 8} ${padding + 4},${padding + 8}`}
            fill="#9CA3AF"
          />

          {/* Axis labels */}
          <text
            x={padding + innerWidth + 16}
            y={padding + innerHeight + 8}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#9CA3AF"
          >
            Effort →
          </text>
          <text
            x={padding - 20}
            y={padding - 12}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#9CA3AF"
            textAnchor="end"
          >
            ↑ Impact
          </text>

          {/* Data points with labels */}
          {items.map((item, idx) => {
            const px = padding + (item.x / 100) * innerWidth;
            const py = padding + innerHeight - (item.y / 100) * innerHeight;

            // Determine label position based on quadrant to avoid overlaps
            const isTopHalf = item.y > 50;

            return (
              <g key={idx} role="img" aria-label={`${item.label}: ${item.quadrant}`}>
                {/* Dot */}
                <circle
                  cx={px}
                  cy={py}
                  r="16"
                  fill={item.darkColor}
                  opacity="0.85"
                  style={{ cursor: "pointer" }}
                />
                {/* Icon - centered in dot */}
                <text
                  x={px}
                  y={py}
                  fontFamily={tokens.font.sans}
                  fontSize="18"
                  fontWeight="bold"
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                  aria-hidden="true"
                >
                  {item.icon}
                </text>
                {/* Label background box with shadow */}
                <defs>
                  <filter id={`shadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
                  </filter>
                </defs>
                <rect
                  x={px - 55}
                  y={isTopHalf ? py + 18 : py - 46}
                  width="110"
                  height="32"
                  fill={tokens.color.white}
                  rx="5"
                  pointerEvents="none"
                  stroke={item.darkColor}
                  strokeWidth="1.5"
                  opacity="1"
                  filter={`url(#shadow-${idx})`}
                />
                {/* Label text */}
                <text
                  x={px}
                  y={isTopHalf ? py + 39 : py - 30}
                  fontFamily={tokens.font.sans}
                  fontSize="12"
                  fontWeight={tokens.weight.medium}
                  fill={item.darkColor}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                  aria-hidden="true"
                >
                  {item.shortLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default EffortImpactMatrix;
