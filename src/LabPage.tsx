import type { FC } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";

type ModuleType = "motion" | "ai" | "interaction" | "concept" | "system" | "prototype" | "generative" | "accessibility";

interface LabModuleProps {
  type: ModuleType;
  title: string;
  description: string;
  experimentId: string;
  date: string;
  status?: "exploring" | "paused" | "archived";
  tags?: string[];
}

const LabModule: FC<LabModuleProps> = ({ type, title, description, experimentId, date, status, tags }) => {
  const typeLabels: Record<ModuleType, string> = {
    motion: "Motion Study",
    ai: "AI Prototype",
    interaction: "Interaction Experiment",
    concept: "Concept Exploration",
    system: "Visual System",
    prototype: "Rapid Prototype",
    generative: "Generative Design",
    accessibility: "Accessibility Exploration",
  };


  return (
    <div
      style={{
        position: "relative",
        background: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        borderRadius: tokens.radius.sm,
        padding: "32px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: "translateY(0) rotateZ(0deg)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px) rotateZ(0.5deg)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = tokens.shadow.subtle;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) rotateZ(0deg)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Experiment ID - Top Right */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          fontSize: "11px",
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.light,
          color: tokens.color.muted,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        {experimentId}
      </div>

      {/* Type Badge */}
      <div
        style={{
          display: "inline-block",
          fontSize: "10px",
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          color: tokens.color.body,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: 16,
          paddingBottom: 8,
          borderBottom: `1px solid ${tokens.color.cardBorder}`,
          paddingRight: 8,
        }}
      >
        {typeLabels[type]}
      </div>

      {/* Status Indicator */}
      {status && (
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 32,
            fontSize: "9px",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            color: status === "exploring" ? tokens.color.accent : tokens.color.muted,
            textTransform: "capitalize",
            opacity: 0.7,
          }}
        >
          • {status}
        </div>
      )}

      {/* Title */}
      <h3
        style={{
          margin: "0 0 12px 0",
          fontFamily: tokens.font.sans,
          fontSize: "20px",
          fontWeight: tokens.weight.medium,
          color: tokens.color.ink,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: "0 0 16px 0",
          fontFamily: tokens.font.sans,
          fontSize: "14px",
          fontWeight: tokens.weight.regular,
          color: tokens.color.body,
          lineHeight: 1.5,
          opacity: 0.8,
        }}
      >
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                backgroundColor: tokens.color.white,
                border: `1px solid ${tokens.color.cardBorder}`,
                padding: "4px 8px",
                borderRadius: "4px",
                opacity: 0.7,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Date - Bottom */}
      <div
        style={{
          fontSize: "12px",
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.light,
          color: tokens.color.muted,
          marginTop: "auto",
          paddingTop: 12,
          borderTop: `1px solid ${tokens.color.cardBorder}`,
        }}
      >
        {date}
      </div>
    </div>
  );
};

const LabPage: FC = () => {
  const experiments: LabModuleProps[] = [
    {
      type: "motion",
      title: "Micro-interactions & Micro-delays",
      description: "Exploring how tiny 40-120ms animations change perceived responsiveness and delight.",
      experimentId: "EXP-2024-001",
      date: "Dec 2024",
      status: "exploring",
      tags: ["animation", "timing", "UX"],
    },
    {
      type: "ai",
      title: "AI-Powered Design Critique",
      description: "Building a system that analyzes designs and provides structured feedback based on design principles.",
      experimentId: "EXP-2024-002",
      date: "Nov 2024",
      status: "paused",
      tags: ["AI", "design-systems", "automation"],
    },
    {
      type: "interaction",
      title: "Gesture-Based Navigation",
      description: "Testing swipe, long-press, and multi-touch patterns for context-aware app navigation.",
      experimentId: "EXP-2024-003",
      date: "Oct 2024",
      tags: ["interaction", "mobile", "gestures"],
    },
    {
      type: "concept",
      title: "Invisible Design in Crisis UI",
      description: "How to design interfaces that disappear during moments of acute stress or urgency.",
      experimentId: "EXP-2024-004",
      date: "Sep 2024",
      tags: ["psychology", "crisis-design", "minimalism"],
    },
    {
      type: "system",
      title: "Dynamic Spacing System v3",
      description: "Experimenting with fluid typography and spacing based on viewport and content.",
      experimentId: "EXP-2024-005",
      date: "Aug 2024",
      status: "archived",
      tags: ["design-systems", "css", "typography"],
    },
    {
      type: "prototype",
      title: "Accessibility-First Component Library",
      description: "Building reusable components with WCAG AAA compliance from the ground up.",
      experimentId: "EXP-2024-006",
      date: "Jul 2024",
      tags: ["accessibility", "components", "WCAG"],
    },
    {
      type: "generative",
      title: "Generative Color Palettes",
      description: "Algorithm-driven color palette generation that respects contrast and cultural context.",
      experimentId: "EXP-2024-007",
      date: "Jun 2024",
      status: "exploring",
      tags: ["generative", "color", "AI"],
    },
    {
      type: "accessibility",
      title: "Haptic Feedback in Web Experiences",
      description: "Exploring how haptic patterns can enhance navigation and confirmation for sighted and blind users.",
      experimentId: "EXP-2024-008",
      date: "May 2024",
      tags: ["accessibility", "haptics", "inclusion"],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.color.white,
        fontFamily: tokens.font.sans,
        color: tokens.color.body,
      }}
    >
      <style>{`
        @keyframes fadeInStagger {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .lab-module {
          animation: fadeInStagger 0.5s ease-out forwards;
        }

        .lab-module:nth-child(1) { animation-delay: 200ms; }
        .lab-module:nth-child(2) { animation-delay: 250ms; }
        .lab-module:nth-child(3) { animation-delay: 300ms; }
        .lab-module:nth-child(4) { animation-delay: 350ms; }
        .lab-module:nth-child(5) { animation-delay: 400ms; }
        .lab-module:nth-child(6) { animation-delay: 450ms; }
        .lab-module:nth-child(7) { animation-delay: 500ms; }
        .lab-module:nth-child(8) { animation-delay: 550ms; }

        @media (prefers-reduced-motion: reduce) {
          .lab-module {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <TopNav />

      <main style={{ width: "100%", padding: "80px clamp(32px, 7vw, 80px)", boxSizing: "border-box", marginTop: "64px" }}>
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <h1
            style={{
              margin: "0 0 16px 0",
              fontFamily: tokens.font.sans,
              fontSize: "44px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.2,
            }}
          >
            Lab
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 600,
              fontFamily: tokens.font.sans,
              fontSize: "16px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.6,
              opacity: 0.8,
            }}
          >
            Experiments in motion, interaction, accessibility, and AI. A glimpse into how I think, explore, and push boundaries beyond finished work.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            maxWidth: 1450,
          }}
        >
          {experiments.map((exp, idx) => (
            <div key={idx} className="lab-module">
              <LabModule {...exp} />
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div
          style={{
            marginTop: 80,
            paddingTop: 40,
            borderTop: `1px solid ${tokens.color.cardBorder}`,
            fontSize: "13px",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            color: tokens.color.muted,
            opacity: 0.6,
            lineHeight: 1.6,
          }}
        >
          <p>
            This Lab is ever-evolving. Experiments get paused, refined, or combined into larger explorations. Some become production features. Others teach me what <em>not</em> to do.
          </p>
          <p>
            Curious about a specific experiment? Ideas for collaboration? <a href="mailto:laneyrfong@gmail.com" style={{ color: "inherit", textDecoration: "underline" }}>Let's talk</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LabPage;
