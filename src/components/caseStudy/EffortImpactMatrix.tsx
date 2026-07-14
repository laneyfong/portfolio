import type { FC } from "react";
import { tokens } from "../../tokens";

interface MatrixItem {
  label: string;
  color: string;
  icon: string;
  x: number; // 0-100, effort
  y: number; // 0-100, impact
}

const EffortImpactMatrix: FC = () => {
  const items: MatrixItem[] = [
    { label: "Gamified safety instructions", color: "#22C55E", icon: "✓", x: 20, y: 85 },
    { label: "Better EEW vs CEN differentiation", color: "#22C55E", icon: "✓", x: 25, y: 80 },
    { label: "Map shown first", color: "#22C55E", icon: "✓", x: 15, y: 75 },
    { label: "News section", color: "#3B82F6", icon: "◆", x: 65, y: 70 },
    { label: "User-submitted photo feed", color: "#3B82F6", icon: "◆", x: 70, y: 65 },
    { label: "Sharing location feature", color: "#3B82F6", icon: "◆", x: 60, y: 75 },
    { label: "Remove 'MyLog' page", color: "#FBBF24", icon: "◇", x: 30, y: 35 },
    { label: "Updated logo & iconography", color: "#FBBF24", icon: "◇", x: 40, y: 40 },
    { label: "Dark mode", color: "#FBBF24", icon: "◇", x: 35, y: 30 },
    { label: "Interactive 3D earthquake map", color: "#F87171", icon: "○", x: 80, y: 45 },
  ];

  const matrixSize = 500;
  const padding = 60;
  const innerWidth = matrixSize - padding * 2;
  const innerHeight = matrixSize - padding * 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
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
          }}
        >
          {/* Quadrant backgrounds */}
          <rect
            x={padding}
            y={padding}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#22C55E"
            opacity="0.06"
          />
          <rect
            x={padding + innerWidth / 2}
            y={padding}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#3B82F6"
            opacity="0.06"
          />
          <rect
            x={padding}
            y={padding + innerHeight / 2}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#FBBF24"
            opacity="0.06"
          />
          <rect
            x={padding + innerWidth / 2}
            y={padding + innerHeight / 2}
            width={innerWidth / 2}
            height={innerHeight / 2}
            fill="#F87171"
            opacity="0.06"
          />

          {/* Grid lines */}
          <line
            x1={padding}
            y1={padding + innerHeight / 2}
            x2={padding + innerWidth}
            y2={padding + innerHeight / 2}
            stroke={tokens.color.cardBorder}
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1={padding + innerWidth / 2}
            y1={padding}
            x2={padding + innerWidth / 2}
            y2={padding + innerHeight}
            stroke={tokens.color.cardBorder}
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Axes */}
          <line
            x1={padding}
            y1={padding + innerHeight}
            x2={padding + innerWidth}
            y2={padding + innerHeight}
            stroke={tokens.color.ink}
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + innerHeight}
            stroke={tokens.color.ink}
            strokeWidth="2"
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
            x={padding + innerWidth + 12}
            y={padding + innerHeight + 6}
            fontFamily={tokens.font.sans}
            fontSize="12"
            fontWeight={tokens.weight.medium}
            fill={tokens.color.ink}
          >
            Effort
          </text>
          <text
            x={padding - 38}
            y={padding - 8}
            fontFamily={tokens.font.sans}
            fontSize="12"
            fontWeight={tokens.weight.medium}
            fill={tokens.color.ink}
            textAnchor="end"
          >
            Impact
          </text>

          {/* Data points */}
          {items.map((item, idx) => {
            const px = padding + (item.x / 100) * innerWidth;
            const py = padding + innerHeight - (item.y / 100) * innerHeight;
            return (
              <g key={idx}>
                {/* Dot */}
                <circle
                  cx={px}
                  cy={py}
                  r="14"
                  fill={item.color}
                  opacity="0.85"
                  style={{ cursor: "pointer" }}
                />
                {/* Icon */}
                <text
                  x={px}
                  y={py}
                  fontFamily={tokens.font.sans}
                  fontSize="16"
                  fontWeight="bold"
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                >
                  {item.icon}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* High Impact / Low Effort */}
          <div>
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "12px",
                fontWeight: tokens.weight.medium,
                color: "#22C55E",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Do First
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
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
                      lineHeight: 1.4,
                    }}
                  >
                    {item.icon} {item.label}
                  </div>
                ))}
            </div>
          </div>

          {/* High Impact / High Effort */}
          <div>
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "12px",
                fontWeight: tokens.weight.medium,
                color: "#3B82F6",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Plan Ahead
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
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
                      lineHeight: 1.4,
                    }}
                  >
                    {item.icon} {item.label}
                  </div>
                ))}
            </div>
          </div>

          {/* Low Impact / Low Effort */}
          <div>
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "12px",
                fontWeight: tokens.weight.medium,
                color: "#FBBF24",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Fill In
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
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
                      lineHeight: 1.4,
                    }}
                  >
                    {item.icon} {item.label}
                  </div>
                ))}
            </div>
          </div>

          {/* Low Impact / High Effort */}
          <div>
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "12px",
                fontWeight: tokens.weight.medium,
                color: "#F87171",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Avoid
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
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
                      lineHeight: 1.4,
                    }}
                  >
                    {item.icon} {item.label}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortImpactMatrix;
