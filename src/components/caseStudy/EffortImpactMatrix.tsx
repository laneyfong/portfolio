import type { FC } from "react";
import { tokens } from "../../tokens";

interface MatrixItem {
  label: string;
  shortLabel: string;
  color: string;
  icon: string;
  x: number; // 0-100, effort
  y: number; // 0-100, impact
}

const EffortImpactMatrix: FC = () => {
  const items: MatrixItem[] = [
    { label: "Gamified safety instructions", shortLabel: "Gamified safety", color: "#22C55E", icon: "✓", x: 12, y: 88 },
    { label: "Better EEW vs CEN differentiation", shortLabel: "Alert clarity", color: "#22C55E", icon: "✓", x: 22, y: 78 },
    { label: "Map shown first", shortLabel: "Map-first layout", color: "#22C55E", icon: "✓", x: 12, y: 68 },
    { label: "News section", shortLabel: "News section", color: "#3B82F6", icon: "◆", x: 72, y: 75 },
    { label: "User-submitted photos", shortLabel: "Photo feed", color: "#3B82F6", icon: "◆", x: 82, y: 62 },
    { label: "Sharing location", shortLabel: "Location sharing", color: "#3B82F6", icon: "◆", x: 62, y: 65 },
    { label: "Remove 'MyLog'", shortLabel: "Remove MyLog", color: "#FBBF24", icon: "◇", x: 18, y: 42 },
    { label: "Logo & icons", shortLabel: "Rebrand", color: "#FBBF24", icon: "◇", x: 32, y: 38 },
    { label: "Dark mode", shortLabel: "Dark mode", color: "#FBBF24", icon: "◇", x: 24, y: 25 },
    { label: "3D earthquake map", shortLabel: "3D map", color: "#F87171", icon: "○", x: 82, y: 38 },
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
        >
          {/* Quadrant backgrounds */}
          <rect
            x={padding}
            y={padding}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#22C55E"
            opacity="0.08"
          />
          <rect
            x={padding + innerWidth / 2}
            y={padding}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#3B82F6"
            opacity="0.08"
          />
          <rect
            x={padding}
            y={padding + innerHeight / 2}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#FBBF24"
            opacity="0.08"
          />
          <rect
            x={padding + innerWidth / 2}
            y={padding + innerHeight / 2}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#F87171"
            opacity="0.08"
          />

          {/* Quadrant labels */}
          <text
            x={padding + innerWidth / 4}
            y={padding + 24}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#22C55E"
            textAnchor="middle"
            opacity="0.6"
          >
            Do First
          </text>
          <text
            x={padding + (innerWidth * 3) / 4}
            y={padding + 24}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#3B82F6"
            textAnchor="middle"
            opacity="0.6"
          >
            Plan Ahead
          </text>
          <text
            x={padding + innerWidth / 4}
            y={padding + innerHeight + 32}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#FBBF24"
            textAnchor="middle"
            opacity="0.6"
          >
            Fill In
          </text>
          <text
            x={padding + (innerWidth * 3) / 4}
            y={padding + innerHeight + 32}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill="#F87171"
            textAnchor="middle"
            opacity="0.6"
          >
            Avoid
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
            stroke={tokens.color.ink}
            strokeWidth="2.5"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + innerHeight}
            stroke={tokens.color.ink}
            strokeWidth="2.5"
          />

          {/* Axis arrows */}
          <polygon
            points={`${padding + innerWidth},${padding + innerHeight} ${padding + innerWidth - 8},${padding + innerHeight - 4} ${padding + innerWidth - 8},${padding + innerHeight + 4}`}
            fill={tokens.color.ink}
          />
          <polygon
            points={`${padding},${padding} ${padding - 4},${padding + 8} ${padding + 4},${padding + 8}`}
            fill={tokens.color.ink}
          />

          {/* Axis labels */}
          <text
            x={padding + innerWidth + 16}
            y={padding + innerHeight + 8}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill={tokens.color.ink}
          >
            Effort →
          </text>
          <text
            x={padding - 20}
            y={padding - 12}
            fontFamily={tokens.font.sans}
            fontSize="13"
            fontWeight={tokens.weight.medium}
            fill={tokens.color.ink}
            textAnchor="end"
          >
            ↑ Impact
          </text>

          {/* Data points with labels */}
          {items.map((item, idx) => {
            const px = padding + (item.x / 100) * innerWidth;
            const py = padding + innerHeight - (item.y / 100) * innerHeight;
            return (
              <g key={idx}>
                {/* Dot */}
                <circle
                  cx={px}
                  cy={py}
                  r="16"
                  fill={item.color}
                  opacity="0.9"
                  style={{ cursor: "pointer" }}
                />
                {/* Icon */}
                <text
                  x={px}
                  y={py - 1}
                  fontFamily={tokens.font.sans}
                  fontSize="18"
                  fontWeight="bold"
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                >
                  {item.icon}
                </text>
                {/* Label background box */}
                <rect
                  x={px - 45}
                  y={py + 20}
                  width="90"
                  height="28"
                  fill={tokens.color.white}
                  rx="4"
                  pointerEvents="none"
                  stroke={item.color}
                  strokeWidth="1"
                  opacity="0.95"
                />
                {/* Label text */}
                <text
                  x={px}
                  y={py + 37}
                  fontFamily={tokens.font.sans}
                  fontSize="12"
                  fontWeight={tokens.weight.medium}
                  fill={item.color}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                >
                  {item.shortLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend with full descriptions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {/* High Impact / Low Effort */}
        <div
          style={{
            padding: 20,
            borderRadius: tokens.radius.sm,
            border: `1px solid #22C55E40`,
            backgroundColor: "#22C55E08",
          }}
        >
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "12px",
              fontWeight: tokens.weight.medium,
              color: "#22C55E",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 12,
            }}
          >
            Quick Wins
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {items
              .filter((item) => item.color === "#22C55E")
              .map((item) => (
                <div
                  key={item.label}
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    color: tokens.color.ink,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ marginRight: 6 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
          </div>
        </div>

        {/* High Impact / High Effort */}
        <div
          style={{
            padding: 20,
            borderRadius: tokens.radius.sm,
            border: `1px solid #3B82F6` + "40",
            backgroundColor: "#3B82F6" + "08",
          }}
        >
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "12px",
              fontWeight: tokens.weight.medium,
              color: "#3B82F6",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 12,
            }}
          >
            Strategic Bets
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {items
              .filter((item) => item.color === "#3B82F6")
              .map((item) => (
                <div
                  key={item.label}
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    color: tokens.color.ink,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ marginRight: 6 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
          </div>
        </div>

        {/* Low Impact / Low Effort */}
        <div
          style={{
            padding: 20,
            borderRadius: tokens.radius.sm,
            border: `1px solid #FBBF24` + "40",
            backgroundColor: "#FBBF24" + "08",
          }}
        >
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "12px",
              fontWeight: tokens.weight.medium,
              color: "#FBBF24",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 12,
            }}
          >
            Nice to Have
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {items
              .filter((item) => item.color === "#FBBF24")
              .map((item) => (
                <div
                  key={item.label}
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    color: tokens.color.ink,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ marginRight: 6 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
          </div>
        </div>

        {/* Low Impact / High Effort */}
        <div
          style={{
            padding: 20,
            borderRadius: tokens.radius.sm,
            border: `1px solid #F87171` + "40",
            backgroundColor: "#F87171" + "08",
          }}
        >
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "12px",
              fontWeight: tokens.weight.medium,
              color: "#F87171",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 12,
            }}
          >
            Pass
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {items
              .filter((item) => item.color === "#F87171")
              .map((item) => (
                <div
                  key={item.label}
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    color: tokens.color.ink,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ marginRight: 6 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortImpactMatrix;
