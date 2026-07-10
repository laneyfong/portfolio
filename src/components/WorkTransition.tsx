import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";

const WorkTransition: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .work-transition {
          margin-top: clamp(80px, 12vw, 120px);
          margin-bottom: clamp(80px, 12vw, 120px);
          padding-top: clamp(80px, 12vw, 120px);
          border-top: 1px solid ${tokens.color.cardBorder};
        }

        .work-transition-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .work-transition-overline {
          font-family: ${tokens.font.sans};
          font-size: 12px;
          font-weight: ${tokens.weight.medium};
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${tokens.color.muted};
          margin-bottom: 20px;
          line-height: ${tokens.leading.none};
        }

        .work-transition-heading {
          font-family: ${tokens.font.sans};
          font-size: clamp(28px, 5vw, 44px);
          font-weight: ${tokens.weight.regular};
          color: ${tokens.color.ink};
          margin: 0 0 16px 0;
          line-height: ${tokens.leading.snug};
        }

        .work-transition-copy {
          font-family: ${tokens.font.sans};
          font-size: 16px;
          font-weight: ${tokens.weight.regular};
          color: ${tokens.color.body};
          line-height: ${tokens.leading.normal};
          margin: 0 0 40px 0;
          max-width: 520px;
        }

        .work-transition-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border: 1px solid ${tokens.color.cardBorder};
          border-radius: 999px;
          background: white;
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.body};
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .work-transition-cta:hover {
          border-color: ${tokens.color.ink};
          background: ${tokens.color.offWhite};
          color: ${tokens.color.ink};
        }

        .work-transition-arrow {
          transition: transform 0.2s ease;
          display: inline-block;
        }

        .work-transition-cta:hover .work-transition-arrow {
          transform: translateX(4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .work-transition-cta,
          .work-transition-arrow {
            transition: none !important;
          }
        }
      `}</style>

      <div className="work-transition">
        <div className="work-transition-content">
          <div className="work-transition-overline">Featured Work</div>

          <h2 className="work-transition-heading">
            Interested in seeing more?
          </h2>

          <p className="work-transition-copy">
            Browse the complete archive of product design, UX, AI,
            accessibility, and visual design projects.
          </p>

          <button
            className="work-transition-cta"
            onClick={() => navigate("/archive")}
          >
            Browse Project Archive
            <span className="work-transition-arrow">→</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkTransition;
