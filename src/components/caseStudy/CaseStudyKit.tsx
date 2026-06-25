import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { tokens } from "../../tokens";
import { useInView, prefersReducedMotion } from "./useInView";

// Shared building blocks for every case-study page on the site — first extracted from
// the MyShake case study so the NVIDIA one (and whatever comes after it) inherits the
// same visual language instead of re-implementing it.

// Fades + rises slightly the first time it scrolls into view. Used on the page's visual
// blocks (cards, charts, diagrams) — not on body text, which should stay still and easy
// to read while you scroll past it. Deliberately a single, calm motion (no blur, no
// scale) — `dramatic` just means "a bit further to travel," for section openers, not a
// different kind of effect. Several of these can be in flight near each other while
// scrolling, so each one stays simple on purpose.
export const Reveal: FC<{ children: ReactNode; delay?: number; dramatic?: boolean }> = ({
  children,
  delay = 0,
  dramatic,
}) => {
  const [ref, inView] = useInView<HTMLDivElement>(dramatic ? 0.25 : 0.15);
  const distance = dramatic ? 34 : 20;
  const duration = dramatic ? 1.1 : 0.9;
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity ${duration}s ${easing} ${delay}ms, transform ${duration}s ${easing} ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

// ---------- Typography primitives ----------

export const Italic: FC<{ children: ReactNode }> = ({ children }) => (
  <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>{children}</em>
);

export const TagPill: FC<{ children: string }> = ({ children }) => (
  <span
    style={{
      display: "inline-flex",
      padding: "6px 14px",
      borderRadius: tokens.radius.full,
      border: `1px solid ${tokens.color.cardBorder}`,
      fontFamily: tokens.font.sans,
      fontSize: tokens.text.sm,
      color: tokens.color.body,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

export const SectionHeading: FC<{ children: ReactNode }> = ({ children }) => (
  <h2
    style={{
      fontFamily: tokens.font.sans,
      fontWeight: tokens.weight.medium,
      fontSize: tokens.text["2xl"],
      color: tokens.color.ink,
      margin: "0 0 28px",
    }}
  >
    {children}
  </h2>
);

export const Callout: FC<{ children: ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: tokens.font.sans,
      fontWeight: tokens.weight.medium,
      fontSize: tokens.text.lg,
      color: tokens.color.ink,
      lineHeight: tokens.leading.snug,
      margin: "0 0 16px",
    }}
  >
    {children}
  </p>
);

export const Paragraph: FC<{ children: ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: tokens.font.sans,
      fontSize: tokens.text.base,
      lineHeight: tokens.leading.normal,
      color: tokens.color.body,
      margin: "0 0 20px",
      maxWidth: 720,
    }}
  >
    {children}
  </p>
);

export const Kicker: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: tokens.font.sans,
      fontSize: tokens.text.sm,
      fontWeight: tokens.weight.medium,
      color: tokens.color.muted,
      marginBottom: 12,
    }}
  >
    {children}
  </div>
);

export const SkillRow: FC<{ items: string[] }> = ({ items }) => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
    {items.map((item) => (
      <TagPill key={item}>{item}</TagPill>
    ))}
  </div>
);

// A glanceable Role/Team/Timeline/Impact strip at the very top of the page — the one
// block a recruiter skimming for ten seconds should still come away having seen.
export const SnapshotBar: FC<{ items: { label: string; value: ReactNode }[] }> = ({ items }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "0 0 48px" }}>
    {items.map((item, i) => (
      <div
        key={i}
        style={{
          flex: "1 1 150px",
          padding: "16px 20px",
          borderRadius: tokens.radius.md,
          border: `1px solid ${tokens.color.cardBorder}`,
          background: tokens.color.offWhite,
        }}
      >
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: tokens.color.muted,
            marginBottom: 6,
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: tokens.text.base,
            color: tokens.color.ink,
            lineHeight: 1.3,
          }}
        >
          {item.value}
        </div>
      </div>
    ))}
  </div>
);

// ---------- Cards ----------

// Static on purpose — this card shows everything it has, there's nothing behind it to
// reveal, so it doesn't get a hover state that would suggest otherwise.
export const FeatureCard: FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <div
      style={{
        background: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        borderRadius: tokens.radius.md,
        padding: 24,
      }}
    >
      <div
        style={{
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          fontSize: tokens.text.base,
          color: tokens.color.ink,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.base,
          color: tokens.color.body,
          lineHeight: tokens.leading.normal,
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
};

export const IconCard: FC<{ icon: ReactNode; title: string; items: string[] }> = ({ icon, title, items }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: tokens.color.offWhite,
        border: `1px solid ${hovered ? tokens.color.ink : tokens.color.cardBorder}`,
        borderRadius: tokens.radius.md,
        padding: 24,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? tokens.shadow.subtle : "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: hovered ? tokens.color.accent : tokens.color.white,
          border: `1px solid ${tokens.color.cardBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hovered ? tokens.color.white : tokens.color.ink,
          marginBottom: 16,
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          fontSize: tokens.text.base,
          color: tokens.color.ink,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item) => (
          <li key={item} style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Method on the left, finding on the right — mirrors how research tends to actually get
// presented (one row per study), so the page reads as evidence rather than narration.
// Static — there's no drill-down behind a finding, so no hover state implying one.
export const FindingRow: FC<{ method: string; children: ReactNode }> = ({ method, children }) => {
  return (
    <div
      className="case-grid-2"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: 24,
        alignItems: "start",
        padding: "24px 0",
        borderTop: `1px solid ${tokens.color.cardBorder}`,
      }}
    >
      <div
        style={{
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          fontSize: tokens.text.base,
          color: tokens.color.ink,
          paddingTop: 2,
        }}
      >
        {method}
      </div>
      <div
        style={{
          background: tokens.color.offWhite,
          border: `1px solid ${tokens.color.cardBorder}`,
          borderRadius: tokens.radius.md,
          padding: "20px 22px",
        }}
      >
        {typeof children === "string" ? (
          <p
            style={{
              margin: 0,
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              color: tokens.color.body,
              lineHeight: tokens.leading.normal,
            }}
          >
            {children}
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

// ---------- Quotes & charts ----------

// The conflict/turning-point moment gets the dark variant so it visually interrupts the
// page — it's meant to be the only dark block in the main content, the beat where the
// story pivots rather than routine supporting detail.
export const PullQuote: FC<{ children: ReactNode; attribution?: string; dark?: boolean }> = ({
  children,
  attribution,
  dark,
}) => (
  <div
    style={{
      background: dark ? tokens.color.ink : "transparent",
      borderLeft: dark ? "none" : `3px solid ${tokens.color.accent}`,
      borderRadius: dark ? tokens.radius.md : 0,
      padding: dark ? "32px 36px" : "2px 0 2px 24px",
      margin: "32px 0",
    }}
  >
    <p
      style={{
        fontFamily: tokens.font.serifItalic,
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: tokens.text.lg,
        lineHeight: tokens.leading.snug,
        color: dark ? tokens.color.white : tokens.color.ink,
        margin: 0,
      }}
    >
      “{children}”
    </p>
    {attribution && (
      <div
        style={{
          marginTop: 12,
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.sm,
          color: dark ? "rgba(255, 255, 255, 0.65)" : tokens.color.muted,
        }}
      >
        — {attribution}
      </div>
    )}
  </div>
);

export const BarCompare: FC<{ title: string; bars: { label: string; value: number; display: string }[] }> = ({
  title,
  bars,
}) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <div
      ref={ref}
      style={{
        background: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        borderRadius: tokens.radius.md,
        padding: 28,
        margin: "32px 0",
      }}
    >
      <div
        style={{
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          fontSize: tokens.text.base,
          color: tokens.color.ink,
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {bars.map((bar, i) => (
          <div key={bar.label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.sm,
                color: tokens.color.body,
              }}
            >
              <span>{bar.label}</span>
              <span style={{ fontWeight: tokens.weight.medium, color: tokens.color.ink }}>{bar.display}</span>
            </div>
            <div
              style={{
                height: 10,
                borderRadius: tokens.radius.full,
                background: tokens.color.cardBorder,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: inView ? `${(bar.value / max) * 100}%` : "0%",
                  borderRadius: tokens.radius.full,
                  background: tokens.color.ink,
                  transition: `width 0.8s ease ${i * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Bar widths here are an illustrative rank emphasis (1st/2nd/3rd), not measured
// proportions — for source data that's a ranked list, not percentages.
const RANK_WIDTHS = [100, 72, 50];

export const RankedBars: FC<{ title: string; items: string[] }> = ({ title, items }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          fontSize: tokens.text.base,
          color: tokens.color.ink,
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 16, fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, flexShrink: 0 }}>
              {i + 1}
            </span>
            <div
              style={{
                flex: 1,
                height: 30,
                borderRadius: tokens.radius.sm,
                background: tokens.color.offWhite,
                border: `1px solid ${tokens.color.cardBorder}`,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: inView ? `${RANK_WIDTHS[i] ?? 40}%` : "0%",
                  borderRadius: tokens.radius.sm,
                  background: i === 0 ? tokens.color.ink : "transparent",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                  boxSizing: "border-box",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  transition: `width 0.7s ease ${i * 120}ms`,
                }}
              >
                <span
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.sm,
                    color: i === 0 ? tokens.color.white : tokens.color.body,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// A horizontal node-and-line diagram for before/after process comparisons — the visual
// contrast between a "before" and "after" pair is meant to carry the story payoff.
export const StepFlow: FC<{ steps: number; variant: "before" | "after"; label: string }> = ({
  steps,
  variant,
  label,
}) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const isAfter = variant === "after";
  const nodeSize = isAfter ? 16 : 9;
  const color = isAfter ? tokens.color.ink : tokens.color.cardBorder;
  return (
    <div ref={ref} style={{ margin: "28px 0" }}>
      <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, marginBottom: 14 }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", maxWidth: isAfter ? 320 : 560 }}>
        {Array.from({ length: steps }).map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps - 1 ? 1 : "0 0 auto" }}>
            <div
              style={{
                width: nodeSize,
                height: nodeSize,
                borderRadius: "50%",
                background: isAfter ? tokens.color.ink : tokens.color.white,
                border: `2px solid ${color}`,
                flexShrink: 0,
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0.3)",
                transition: `opacity 0.35s ease ${i * 90}ms, transform 0.35s ease ${i * 90}ms`,
              }}
            />
            {i < steps - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: color,
                  transformOrigin: "left",
                  transform: inView ? "scaleX(1)" : "scaleX(0)",
                  transition: `transform 0.3s ease ${i * 90 + 60}ms`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const RadialStat: FC<{ percent: number; label: string }> = ({ percent, label }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const reduced = prefersReducedMotion();
  const [animatedShown, setAnimatedShown] = useState(0);
  const r = 54;
  const circumference = 2 * Math.PI * r;

  useEffect(() => {
    if (!inView || reduced) return;
    const duration = 900;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedShown(Math.round(eased * percent));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, percent, reduced]);

  const shown = reduced ? (inView ? percent : 0) : animatedShown;
  const offset = circumference * (1 - shown / 100);

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", margin: "32px 0" }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke={tokens.color.cardBorder} strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={tokens.color.ink}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        <text
          x="70"
          y="78"
          textAnchor="middle"
          fontSize="28"
          fontFamily={tokens.font.sans}
          fontWeight={tokens.weight.medium}
          fill={tokens.color.ink}
        >
          {shown}%
        </text>
      </svg>
      <div style={{ maxWidth: 300 }}>
        <Callout>{label}</Callout>
      </div>
    </div>
  );
};

const TYPE_OPTIONS_DEFAULT = [
  { name: "Helvetica Neue", family: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { name: "Plus Jakarta Sans — final", family: tokens.font.sans },
];

export const TypeCompare: FC<{ options?: { name: string; family: string }[] }> = ({
  options = TYPE_OPTIONS_DEFAULT,
}) => (
  <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "20px 0 32px" }}>
    {options.map((opt) => (
      <div
        key={opt.name}
        style={{
          background: tokens.color.offWhite,
          border: `1px solid ${tokens.color.cardBorder}`,
          borderRadius: tokens.radius.md,
          padding: 24,
        }}
      >
        <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, marginBottom: 12 }}>
          {opt.name}
        </div>
        <div style={{ fontFamily: opt.family, fontSize: 30, color: tokens.color.ink, lineHeight: 1.2 }}>Aa Bb 12:45</div>
      </div>
    ))}
  </div>
);

export const Bullets: FC<{ items: ReactNode[] }> = ({ items }) => (
  <ul style={{ margin: "0 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
    {items.map((item, i) => (
      <li
        key={i}
        style={{
          position: "relative",
          paddingLeft: 20,
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.base,
          color: tokens.color.body,
          lineHeight: tokens.leading.normal,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 9,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: tokens.color.ink,
          }}
        />
        {item}
      </li>
    ))}
  </ul>
);

// ---------- Icons ----------

export const SearchIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const BellIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 01-3.4 0" />
  </svg>
);

export const ThumbsDownIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 14V2" />
    <path d="M9 18.5l.4 1.8a2 2 0 002 1.7.9.9 0 00.9-1.1L11.5 17H18a2 2 0 002-2.3l-1.1-8A2 2 0 0017 5H9a2 2 0 00-2 2v9a2 2 0 002 1.5z" />
  </svg>
);

export const CheckIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const ChatIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 20l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
);

export const FlaskIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2v6.5L4.5 17a2 2 0 001.8 3h11.4a2 2 0 001.8-3L15 8.5V2" />
    <path d="M9 2h6" />
    <path d="M8 14h8" />
  </svg>
);

export const ClockIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const BackArrowIcon: FC = () => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 7H1M1 7L7 1M1 7L7 13" />
  </svg>
);

export const ChevronIcon: FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}
  >
    <path d="M1.5 3.5L5 7l3.5-3.5" />
  </svg>
);

// ---------- Chrome ----------

export const ReadingProgressBar: FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, zIndex: 20, background: "transparent" }}>
      {/* Brand blue, not ink — ink would be invisible against the equally-dark sidebar it
          crosses over for the first 220px. */}
      <div style={{ height: "100%", width: `${progress}%`, background: tokens.color.accent }} />
    </div>
  );
};
