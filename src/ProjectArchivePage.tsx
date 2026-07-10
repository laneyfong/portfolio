import type { FC } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import DashDesignathonCarousel from "./components/DashDesignathonCarousel";

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
      title: "Job App Tracker",
      description: "Designathon prototype for tracking job applications and managing the application pipeline.",
      italic: "Application management",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23F5F5F5' width='400' height='300'/%3E%3Crect x='30' y='40' width='340' height='40' fill='%234A90E2' opacity='0.3'/%3E%3Crect x='30' y='100' width='340' height='30' fill='%234A90E2' opacity='0.2'/%3E%3Crect x='30' y='145' width='340' height='30' fill='%234A90E2' opacity='0.25'/%3E%3Crect x='30' y='190' width='340' height='30' fill='%234A90E2' opacity='0.2'/%3E%3C/svg%3E",
      role: "UX/Product Design",
      metrics: [
        { value: "Designathon", label: "project" },
        { value: "MVP", label: "status" },
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
    {
      title: "Healthcare Dashboard Redesign",
      description: "Simplified patient data visualization. Reduced cognitive load by 40%.",
      italic: "40% cognitive reduction",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23E8F4F8' width='400' height='300'/%3E%3Crect x='40' y='30' width='160' height='120' fill='%2387CEEB' opacity='0.3'/%3E%3Crect x='220' y='30' width='160' height='120' fill='%2387CEEB' opacity='0.5'/%3E%3Crect x='40' y='170' width='160' height='120' fill='%2387CEEB' opacity='0.2'/%3E%3Crect x='220' y='170' width='160' height='120' fill='%2387CEEB' opacity='0.4'/%3E%3C/svg%3E",
      role: "UX/UI Design",
      metrics: [
        { value: "6 months", label: "timeline" },
        { value: "3 iterations", label: "cycles" },
      ],
    },
    {
      title: "Mobile Banking App",
      description: "Accessible financial management for underbanked communities.",
      italic: "Accessibility-first",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23FFF5E6' width='400' height='300'/%3E%3Crect x='80' y='20' width='240' height='260' fill='%23FFE4B5' opacity='0.3'/%3E%3Ccircle cx='200' cy='150' r='40' fill='%23FF8C00' opacity='0.4'/%3E%3C/svg%3E",
      role: "Product Design",
      metrics: [
        { value: "50K+ users", label: "adoption" },
        { value: "4.8/5", label: "rating" },
      ],
    },
    {
      title: "Design System Components",
      description: "Reusable component library with WCAG AAA compliance.",
      italic: "WCAG AAA",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23F0E6F6' width='400' height='300'/%3E%3Crect x='30' y='40' width='80' height='80' fill='%23B19CD9' opacity='0.4'/%3E%3Crect x='140' y='40' width='80' height='80' fill='%23B19CD9' opacity='0.6'/%3E%3Crect x='250' y='40' width='80' height='80' fill='%23B19CD9' opacity='0.3'/%3E%3Crect x='30' y='160' width='80' height='80' fill='%23B19CD9' opacity='0.5'/%3E%3Crect x='140' y='160' width='80' height='80' fill='%23B19CD9' opacity='0.4'/%3E%3Crect x='250' y='160' width='80' height='80' fill='%23B19CD9' opacity='0.7'/%3E%3C/svg%3E",
      role: "Design Systems",
      metrics: [
        { value: "45 components", label: "library" },
        { value: "12 teams", label: "adopters" },
      ],
    },
    {
      title: "E-commerce Checkout Flow",
      description: "Optimized purchase funnel that reduced cart abandonment by 35%.",
      italic: "35% abandonment drop",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23E6F9E6' width='400' height='300'/%3E%3Crect x='50' y='50' width='300' height='200' fill='%2390EE90' opacity='0.2'/%3E%3Ccircle cx='100' cy='100' r='20' fill='%2332CD32' opacity='0.5'/%3E%3Ccircle cx='200' cy='100' r='20' fill='%2332CD32' opacity='0.4'/%3E%3Ccircle cx='300' cy='100' r='20' fill='%2332CD32' opacity='0.3'/%3E%3C/svg%3E",
      role: "Conversion Design",
      metrics: [
        { value: "3 weeks", label: "sprint" },
        { value: "$2.1M", label: "revenue gain" },
      ],
    },
    {
      title: "Voice UI for Smart Home",
      description: "Natural language interaction design for voice-first devices.",
      italic: "Voice interaction",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23F5E6FF' width='400' height='300'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23DA70D6' opacity='0.2'/%3E%3Cpath d='M200 100 Q180 80 200 60 Q220 80 200 100' fill='%23DA70D6' opacity='0.4'/%3E%3Cpath d='M200 110 Q170 70 200 30 Q230 70 200 110' fill='%23DA70D6' opacity='0.3'/%3E%3C/svg%3E",
      role: "Interaction Design",
      metrics: [
        { value: "87% success", label: "voice clarity" },
        { value: "15 intents", label: "supported" },
      ],
    },
    {
      title: "Mental Health App Redesign",
      description: "Empathetic interface for mental wellness tracking and support.",
      italic: "Empathy-driven",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23FFE6F0' width='400' height='300'/%3E%3Cpath d='M200 80 C190 70 180 75 180 85 C180 100 200 120 200 120 C200 120 220 100 220 85 C220 75 210 70 200 80 Z' fill='%23FF69B4' opacity='0.4'/%3E%3Ccircle cx='130' cy='180' r='35' fill='%23FFB6C1' opacity='0.3'/%3E%3Ccircle cx='270' cy='180' r='35' fill='%23FFB6C1' opacity='0.3'/%3E%3C/svg%3E",
      role: "Product & UX",
      metrics: [
        { value: "92% retention", label: "30-day" },
        { value: "500K users", label: "base" },
      ],
    },
    {
      title: "Real Estate Marketplace",
      description: "Search and discovery platform for property browsing and investment.",
      italic: "Real estate tech",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23F0E8D8' width='400' height='300'/%3E%3Cpolygon points='200,40 280,100 280,180 200,220 120,180 120,100' fill='%23CD853F' opacity='0.3'/%3E%3Crect x='150' y='120' width='30' height='30' fill='%238B7355' opacity='0.4'/%3E%3Crect x='220' y='120' width='30' height='30' fill='%238B7355' opacity='0.4'/%3E%3C/svg%3E",
      role: "Marketplace Design",
      metrics: [
        { value: "$8B GMV", label: "volume" },
        { value: "2.3M listings", label: "active" },
      ],
    },
    {
      title: "SaaS Onboarding Flow",
      description: "Progressive disclosure onboarding that reduced drop-off by 28%.",
      italic: "28% improved activation",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23E6F0FF' width='400' height='300'/%3E%3Crect x='40' y='80' width='60' height='60' fill='%234169E1' opacity='0.3'/%3E%3Crect x='130' y='60' width='60' height='80' fill='%234169E1' opacity='0.5'/%3E%3Crect x='220' y='40' width='60' height='100' fill='%234169E1' opacity='0.4'/%3E%3Crect x='310' y='100' width='60' height='40' fill='%234169E1' opacity='0.3'/%3E%3C/svg%3E",
      role: "Growth Design",
      metrics: [
        { value: "5 minutes", label: "time-to-value" },
        { value: "82% completion", label: "onboarding" },
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
        @media (max-width: 1024px) {
          .archive-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .archive-grid {
            grid-template-columns: 1fr !important;
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

          {/* Featured: DoorDash Designathon */}
          <div style={{ marginBottom: 80 }}>
            <DashDesignathonCarousel images={[dash1, dash2, dash3]} />
          </div>

          {/* Grid of archive projects */}
          <div
            className="archive-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
              alignItems: "stretch",
              minWidth: 0,
            }}
          >
            {archiveProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                screenshot={project.image}
                layout="portrait"
                height={550}
                caption={project.description}
                captionItalic={project.italic}
                roleOutcome={project.role}
                metrics={project.metrics}
              />
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
    </div>
  );
};

export default ProjectArchivePage;
