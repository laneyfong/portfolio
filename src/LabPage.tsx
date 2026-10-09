import type { FC } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";
import Footer from "./components/Footer";
import LabCard from "./components/LabCard";
import DayLightCard from "./components/DayLightCard";
import InteractiveTypography from "./components/InteractiveTypography";
import screenRecording20251023 from "./assets/screen-recording-2025-10-23.mp4";
import carVideo from "./assets/car.mov";
import labVideo1 from "./assets/lab-2026-01-12at3.05.27 PM.mov";
import labVideo2 from "./assets/lab-2026-03-26at3.14.13 PM.mov";
import labVideo3 from "./assets/lab-2026-03-26at3.15.38 PM.mov";

type ModuleType = "motion" | "ai" | "interaction" | "concept" | "system" | "prototype" | "generative" | "accessibility" | "daylight";

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
  specialType?: "daylight" | "ascii-ripple";
}

const VideoCard: FC<{ src: string; title: string; date: string }> = ({ src, title, date }) => (
  <div
    style={{
      borderRadius: tokens.radius.md,
      overflow: "hidden",
      background: tokens.color.offWhite,
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <video
      src={src}
      controls
      style={{
        width: "100%",
        height: "300px",
        objectFit: "cover",
        display: "block",
      }}
    />
    <div style={{ padding: 20 }}>
      <h3
        style={{
          margin: "0 0 8px",
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.base,
          fontWeight: tokens.weight.medium,
          color: tokens.color.ink,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.sm,
          color: tokens.color.muted,
        }}
      >
        {date}
      </p>
    </div>
  </div>
);

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
  ];

  const videoExperiments = [
    {
      src: labVideo1,
      title: "Interaction Exploration",
      date: "Jan 2026",
    },
    {
      src: labVideo2,
      title: "Motion Experiment",
      date: "Mar 2026",
    },
    {
      src: labVideo3,
      title: "Animation Study",
      date: "Mar 2026",
    },
    {
      src: screenRecording20251023,
      title: "Design Iteration: Product Flow",
      date: "Oct 2025",
    },
    {
      src: carVideo,
      title: "Motion Study: Car Animation",
      date: "Oct 2025",
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
          flex-shrink: 0;
        }

        .lab-module:nth-child(1) { animation-delay: 150ms; }
        .lab-module:nth-child(2) { animation-delay: 200ms; }
        .lab-module:nth-child(3) { animation-delay: 250ms; }
        .lab-module:nth-child(4) { animation-delay: 300ms; }
        .lab-module:nth-child(5) { animation-delay: 350ms; }

        @media (prefers-reduced-motion: reduce) {
          .lab-module {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <TopNav />

      <main style={{ width: "100%", padding: "80px 52px", boxSizing: "border-box", marginTop: "64px" }}>
        {/* Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "14px",
            marginBottom: "14px",
            maxWidth: "285px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: tokens.font.sans,
              fontSize: "18px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.ink,
              lineHeight: "25px",
              letterSpacing: "-0.05em",
            }}
          >
            Lab experiments in motion, interaction, accessibility, AI, and more.
          </p>
        </div>

        {/* Horizontal Cards Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            overflowX: "auto",
            paddingBottom: "16px",
          }}
        >
          {experiments.map((exp, idx) => (
            <div
              key={idx}
              className="lab-module"
              style={{
                width: "339px",
                height: "299px",
                background: "#F0F0F0",
                borderRadius: "14px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {exp.specialType === "daylight" ? (
                <DayLightCard />
              ) : exp.specialType === "ascii-ripple" ? (
                <InteractiveTypography />
              ) : (
                <LabCard
                  type={exp.type as Exclude<ModuleType, "daylight">}
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

          {/* Video Experiments */}
          {videoExperiments.map((video, idx) => (
            <div
              key={`video-${idx}`}
              className="lab-module"
              style={{
                width: "339px",
                height: "299px",
                background: "#F0F0F0",
                borderRadius: "14px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <video
                src={video.src}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
                muted
                autoPlay
                loop
              />
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
            maxWidth: "600px",
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
