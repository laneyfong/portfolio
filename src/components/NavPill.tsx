import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { tokens } from "../tokens";

interface NavPillProps {
  items?: string[];
  active: string;
  onSelect: (item: string) => void;
}

interface IndicatorRect {
  left: number;
  width: number;
}

const NavPill: FC<NavPillProps> = ({
  items = ["Work", "About", "Lab", "Resume"],
  active,
  onSelect,
}) => {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [hovered, setHovered] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);
  const [enableTransition, setEnableTransition] = useState(false);

  const target = hovered ?? active;

  useEffect(() => {
    const el = buttonRefs.current[target];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [target]);

  // Snap into place on first paint, then enable smooth transitions for every
  // change after — avoids an unwanted slide-in from the page edge on load.
  useEffect(() => {
    if (!indicator || enableTransition) return;
    const raf = requestAnimationFrame(() => setEnableTransition(true));
    return () => cancelAnimationFrame(raf);
  }, [indicator, enableTransition]);

  return (
    <nav
      onMouseLeave={() => setHovered(null)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "clamp(1px, 1vw, 4px)",
        borderRadius: tokens.radius.full,
        backgroundColor: tokens.color.navBg,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        padding: "clamp(5px, 1.5vw, 7px) clamp(6px, 3vw, 14px)",
        maxWidth: "100%",
      }}
    >
      <style>{`
        .nav-pill-btn:focus-visible {
          outline: 2px solid ${tokens.color.accent};
          outline-offset: 2px;
          border-radius: ${tokens.radius.full};
        }
      `}</style>

      {indicator && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            left: indicator.left,
            width: indicator.width,
            borderRadius: tokens.radius.full,
            background: "rgba(255, 255, 255, 1)",
            border: `1px solid ${hovered && hovered !== active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,1)"}`,
            opacity: hovered && hovered !== active ? 0.7 : 1,
            boxSizing: "border-box",
            pointerEvents: "none",
            transition: enableTransition
              ? "left 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease"
              : "none",
          }}
        />
      )}

      {items.map((item) => {
        const isActive = item === active;
        const isHovered = item === hovered;
        return (
          <button
            key={item}
            ref={(el) => {
              buttonRefs.current[item] = el;
            }}
            className="nav-pill-btn"
            onClick={() => onSelect(item)}
            onMouseEnter={() => setHovered(item)}
            onFocus={() => setHovered(item)}
            onBlur={() => setHovered(null)}
            aria-current={isActive ? "page" : undefined}
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.regular,
              fontSize: "clamp(13px, 3.6vw, 18px)",
              color: isActive || isHovered ? tokens.color.navActive : tokens.color.muted,
              backgroundColor: "transparent",
              border: "1px solid transparent",
              borderRadius: tokens.radius.full,
              padding: "4px clamp(6px, 3vw, 12px)",
              cursor: "pointer",
              lineHeight: 1,
              whiteSpace: "nowrap",
              transition: "color 0.2s ease",
            }}
          >
            {item}
          </button>
        );
      })}
    </nav>
  );
};

export default NavPill;
