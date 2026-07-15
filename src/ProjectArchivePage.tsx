import type { FC } from "react";
import { useState } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import DashDesignathonCarousel from "./components/DashDesignathonCarousel";
import ImageModal from "./components/ImageModal";

import clearMind from "./assets/clearmind.gif";
import butterThumb from "./assets/butter-thumb.png";
import ahaDashThumb from "./assets/aha-dash-thumb.png";
import fff1Mind from "./assets/fff1mind.png";
import dash1 from "./assets/dash1.png";
import dash2 from "./assets/dash2.png";
import dash3 from "./assets/dash3.png";

interface ArchiveProject {
  title: string;
  description: string;
  italic: string;
  image: string;
  role: string;
  metrics?: Array<{ value: string; label: string }>;
  to?: string;
}

const ProjectArchivePage: FC = () => {
  const [expandedImage, setExpandedImage] = useState<{ image: string; alt: string; title: string } | null>(null);

  const archiveProjects: ArchiveProject[] = [
    {
      title: "ClearMind",
      description: "Designathon project focused on mental health and wellness. Interactive meditation and mood tracking experience.",
      italic: "Mental wellness app",
      image: clearMind,
      role: "Product Design & Prototyping",
      metrics: [
        { value: "Designathon", label: "competition" },
        { value: "Interactive", label: "prototype" },
      ],
    },
    {
      title: "Butter - Physical Product Design",
      description: "Tactile design exploration for a physical product experience. Focus on material and user interaction.",
      italic: "Tactile interaction",
      image: butterThumb,
      role: "Physical Product Design",
      metrics: [
        { value: "Prototype", label: "stage" },
        { value: "Material", label: "focused" },
      ],
    },
    {
      title: "AHA Dashboard",
      description: "Data visualization dashboard for real-time analytics and insights.",
      italic: "Real-time analytics",
      image: ahaDashThumb,
      role: "Data Visualization & UX",
      metrics: [
        { value: "Dashboard", label: "type" },
        { value: "Real-time", label: "data" },
      ],
    },
    {
      title: "FFF1 Mind - Physical Prototype",
      description: "Exploratory physical design project pushing boundaries of interaction design and materiality.",
      italic: "Physical exploration",
      image: fff1Mind,
      role: "Experimental Design",
      metrics: [
        { value: "Physical", label: "prototype" },
        { value: "Exploratory", label: "research" },
      ],
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
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr;
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
              Project Archive
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
              A collection of additional projects, experiments, and explorations beyond the main case studies. Each represents a unique challenge solved with intentional design and rigorous thinking.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="bento-grid">
            {/* DoorDash Designathon */}
            <div>
              <DashDesignathonCarousel images={[dash1, dash2, dash3]} />
            </div>

            {/* Project Cards */}
            {archiveProjects.map((project, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setExpandedImage({
                    image: project.image,
                    alt: project.title,
                    title: project.title,
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <ProjectCard
                  screenshot={project.image}
                  layout="portrait"
                  height={550}
                  caption={project.description}
                  captionItalic={project.italic}
                  roleOutcome={project.role}
                  metrics={project.metrics}
                />
              </div>
            ))}
          </div>

          {/* Closing section */}
          <div
            style={{
              marginTop: 120,
              paddingTop: 60,
              borderTop: `1px solid ${tokens.color.cardBorder}`,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "16px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                lineHeight: 1.6,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              These projects span product design, accessibility, systems thinking, and conversion optimization. Each taught me something valuable about solving real problems for real people.
            </p>
            <p
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "14px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.muted,
                lineHeight: 1.6,
                marginTop: 20,
              }}
            >
              Interested in discussing a specific project or exploring collaboration? <a href="mailto:laneyrfong@gmail.com" style={{ color: "inherit", textDecoration: "underline" }}>Get in touch</a>.
            </p>
          </div>
        </ContentContainer>
      </main>

      <Footer />

      {expandedImage && (
        <ImageModal
          image={expandedImage.image}
          alt={expandedImage.alt}
          title={expandedImage.title}
          onClose={() => setExpandedImage(null)}
        />
      )}
    </div>
  );
};

export default ProjectArchivePage;
