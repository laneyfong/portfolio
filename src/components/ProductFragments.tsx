import type { FC } from "react";
import { useState, useEffect, useRef } from "react";

interface Fragment {
  id: string;
  x: number;
  y: number;
  angle: number;
}

interface ProductFragmentsProps {
  width: number;
  height: number;
  isHovered?: boolean;
}

const ProductFragments: FC<ProductFragmentsProps> = ({ width, height, isHovered = false }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredFragmentId, setHoveredFragmentId] = useState<string | null>(null);
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const enabledRef = useRef({ cursor: true });

  // Initialize fragments positioned around badge center
  useEffect(() => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 280; // Increased radius to position further away

    setFragments([
      {
        id: "myshake",
        x: centerX + Math.cos(0) * radius,
        y: centerY + Math.sin(0) * radius - 60, // Offset upward
        angle: 0,
      },
      {
        id: "nvidia",
        x: centerX + Math.cos((Math.PI * 2) / 3) * radius,
        y: centerY + Math.sin((Math.PI * 2) / 3) * radius,
        angle: 120,
      },
      {
        id: "verisupply",
        x: centerX + Math.cos((Math.PI * 4) / 3) * radius,
        y: centerY + Math.sin((Math.PI * 4) / 3) * radius,
        angle: 240,
      },
    ]);
  }, [width, height]);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    enabledRef.current.cursor = !reduceMotionQuery.matches;
    reduceMotionQuery.addEventListener("change", () => {
      enabledRef.current.cursor = !reduceMotionQuery.matches;
    });
    return () => reduceMotionQuery.removeEventListener("change", () => {});
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!enabledRef.current.cursor) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fragment visual components
  const FragmentContent: FC<{ id: string; isHovered: boolean }> = ({ id, isHovered }) => {
    switch (id) {
      case "myshake":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#000", opacity: isHovered ? 1 : 0.6 }}>
              MYSHAKE
            </div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#000" }}>4.8</div>
            <div style={{ fontSize: "9px", color: "#666", opacity: isHovered ? 1 : 0.5 }}>
              Earthquake detected
            </div>
            <div style={{ fontSize: "9px", fontWeight: 600, color: "#2ecc71", opacity: isHovered ? 1 : 0.6 }}>
              +45% engagement
            </div>
          </div>
        );
      case "nvidia":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", alignItems: "center" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#000", opacity: isHovered ? 1 : 0.6 }}>
              AI TESTING
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", opacity: isHovered ? 1 : 0.6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#000" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#666" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ccc" }} />
            </div>
            <div style={{ fontSize: "9px", color: "#666", opacity: isHovered ? 1 : 0.5 }}>
              Usability testing
            </div>
          </div>
        );
      case "verisupply":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#000", opacity: isHovered ? 1 : 0.6 }}>
              SUPPLY CHAIN
            </div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#000" }}>86%</div>
            <div style={{ fontSize: "9px", color: "#666", opacity: isHovered ? 1 : 0.5 }}>
              Error reduction
            </div>
            <div style={{ height: 12, background: "linear-gradient(to right, #ddd, #2ecc71)", borderRadius: 2 }} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 11 }}>
      {fragments.map((fragment) => {
        const centerX = width / 2;
        const centerY = height / 2;
        const dx = mousePos.x - centerX;
        const dy = mousePos.y - centerY;
        const distance = Math.hypot(dx, dy);
        const hoverDistance = 150;
        const isNearCursor = distance < hoverDistance;
        const isFragmentHovered = hoveredFragmentId === fragment.id;

        return (
          <div
            key={fragment.id}
            onMouseEnter={() => setHoveredFragmentId(fragment.id)}
            onMouseLeave={() => setHoveredFragmentId(null)}
            style={{
              position: "absolute",
              left: fragment.x,
              top: fragment.y,
              transform: `translate(-50%, -50%) scale(${isFragmentHovered ? 1.06 : 1}) translateX(${
                enabledRef.current.cursor && isNearCursor ? dx * 0.03 : 0
              }px) translateY(${enabledRef.current.cursor && isNearCursor ? dy * 0.03 : 0}px)`,
              opacity: isFragmentHovered || isHovered ? 1 : 0.35,
              pointerEvents: "auto",
              cursor: "pointer",
              transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div
              style={{
                background: "white",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                borderRadius: "12px",
                padding: "12px 14px",
                boxShadow: isFragmentHovered ? "0 8px 24px rgba(0, 0, 0, 0.12)" : "0 2px 8px rgba(0, 0, 0, 0.06)",
                backdropFilter: "blur(10px)",
                width: "120px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                transition: "box-shadow 0.4s ease",
              }}
            >
              <FragmentContent id={fragment.id} isHovered={isFragmentHovered} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductFragments;
