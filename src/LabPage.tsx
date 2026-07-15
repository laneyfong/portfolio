import type { FC } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";
import Footer from "./components/Footer";
import LabCard from "./components/LabCard";
import DayLightCard from "./components/DayLightCard";
import InteractiveTypography from "./components/InteractiveTypography";
import PendulumAnimation from "./components/PendulumAnimation";
import BudgetSlider from "./components/BudgetSlider";

type ModuleType = "motion" | "ai" | "interaction" | "concept" | "system" | "prototype" | "generative" | "accessibility" | "daylight" | "pendulum" | "budget";

interface LabModuleProps {
  type: ModuleType;
  title: string;
  description: string;
  experimentId: string;
  date: string;
  status?: "exploring" | "paused" | "archived";
  tags?: string[];
  isLoading?: boolean;
  isSpecial?: boolean;
  specialType?: "daylight" | "ascii-ripple" | "pendulum" | "budget";
}

const LabPage: FC = () => {
  const experiments: LabModuleProps[] = [
    {
      type: "daylight",
      title: "Day/Night Light Simulation",
      description: "Interactive time scroll wheel that simulates natural light changes throughout the day. Watch the interface adapt from bright daylight to dark night mode with stars.",
      experimentId: "EXP-2024-000",
      date: "Jan 2025",
      status: "exploring",
      tags: ["interaction", "time", "light", "ambient"],
      isSpecial: true,
      specialType: "daylight",
    },
    {
      type: "interaction",
      title: "ASCII Ripple Effect",
      description: "Click to create ripples. A water droplet interaction exploring how physics-based animations can bring ASCII art to life.",
      experimentId: "EXP-2024-000A",
      date: "Jan 2025",
      status: "exploring",
      tags: ["interaction", "animation", "ASCII", "ripple"],
      isSpecial: true,
      specialType: "ascii-ripple",
    },
    {
      type: "motion",
      title: "Pendulum Loading Animation",
      description: "A physics-based pendulum swing that creates a mesmerizing loading state. Explores how simple oscillation can make waiting feel intentional.",
      experimentId: "EXP-2025-001",
      date: "Feb 2025",
      status: "exploring",
      tags: ["motion", "physics", "animation", "loading"],
      isSpecial: true,
      specialType: "pendulum",
    },
    {
      type: "budget",
      title: "Budget Explorer",
      description: "Interactive slider that visualizes budget allocation with animated cash emojis. Watch as you slide from lean to unlimited budgets.",
      experimentId: "EXP-2025-002",
      date: "Feb 2025",
      status: "exploring",
      tags: ["interaction", "animation", "economics", "slider"],
      isSpecial: true,
      specialType: "budget",
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

        .lab-module:nth-child(1) { animation-delay: 150ms; }
        .lab-module:nth-child(2) { animation-delay: 200ms; }
        .lab-module:nth-child(3) { animation-delay: 250ms; }
        .lab-module:nth-child(4) { animation-delay: 300ms; }

        @media (max-width: 1024px) {
          .lab-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .lab-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lab-module {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <TopNav />

      <main style={{ width: "100%", padding: "80px 0", boxSizing: "border-box", marginTop: "64px" }}>
        <ContentContainer>
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
            className="lab-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {experiments.map((exp, idx) => (
              <div key={idx} className="lab-module" style={{ height: "100%" }}>
                {exp.specialType === "daylight" ? (
                  <DayLightCard />
                ) : exp.specialType === "ascii-ripple" ? (
                  <InteractiveTypography />
                ) : exp.specialType === "pendulum" ? (
                  <PendulumAnimation title="Pendulum Loading Experiment" />
                ) : exp.specialType === "budget" ? (
                  <BudgetSlider />
                ) : (
                  <LabCard
                    type={exp.type as Exclude<ModuleType, "daylight" | "pendulum" | "budget">}
                    title={exp.title}
                    description={exp.description}
                    experimentId={exp.experimentId}
                    date={exp.date}
                    status={exp.status}
                    tags={exp.tags}
                    isLoading={exp.isLoading}
                  />
                )}
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
        </ContentContainer>
      </main>

      <Footer />
    </div>
  );
};

export default LabPage;
