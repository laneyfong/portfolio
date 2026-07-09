import type { FC, ReactNode } from "react";
import { tokens } from "../../tokens";
import TopNav from "../TopNav";
import Footer from "../Footer";

interface VisualCaseStudyShellProps {
  title: string;
  subtitle: string;
  tags: string[];
  metrics?: Array<{ label: string; value: string }>;
  heroImages: Array<{ src: string; alt: string }>;
  children?: ReactNode;
}

const VisualCaseStudyShell: FC<VisualCaseStudyShellProps> = ({
  title,
  subtitle,
  tags,
  metrics,
  heroImages,
  children,
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.color.white,
        fontFamily: tokens.font.sans,
        color: tokens.color.body,
      }}
    >
      <TopNav />

      <main style={{ width: "100%", padding: "0", boxSizing: "border-box", marginTop: "64px" }}>
        {/* Hero Header Section */}
        <div
          style={{
            padding: "80px clamp(32px, 7vw, 80px) 60px",
            maxWidth: 1450,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <h1
            style={{
              margin: "0 0 12px 0",
              fontFamily: tokens.font.sans,
              fontSize: "44px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              margin: "0 0 24px 0",
              maxWidth: 700,
              fontFamily: tokens.font.sans,
              fontSize: "16px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            {subtitle}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  fontFamily: tokens.font.sans,
                  fontWeight: tokens.weight.regular,
                  color: tokens.color.body,
                  backgroundColor: tokens.color.offWhite,
                  border: `1px solid ${tokens.color.cardBorder}`,
                  padding: "6px 12px",
                  borderRadius: "6px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div
                    style={{
                      fontFamily: tokens.font.sans,
                      fontSize: "24px",
                      fontWeight: tokens.weight.medium,
                      color: tokens.color.ink,
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      fontFamily: tokens.font.sans,
                      fontSize: "13px",
                      fontWeight: tokens.weight.regular,
                      color: tokens.color.body,
                      opacity: 0.7,
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hero Images Grid */}
        {heroImages.length > 0 && (
          <div
            style={{
              padding: "0 clamp(32px, 7vw, 80px) 80px",
              maxWidth: 1450,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: heroImages.length === 1 ? "1fr" : "repeat(auto-fit, minmax(350px, 1fr))",
                gap: 24,
                marginBottom: 80,
              }}
            >
              {heroImages.map((image, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: tokens.radius.sm,
                    overflow: "hidden",
                    backgroundColor: tokens.color.offWhite,
                    border: `1px solid ${tokens.color.cardBorder}`,
                    aspectRatio: "4/3",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Content */}
        {children && (
          <div
            style={{
              padding: "0 clamp(32px, 7vw, 80px) 80px",
              maxWidth: 1450,
              margin: "0 auto",
              width: "100%",
            }}
          >
            {children}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default VisualCaseStudyShell;
