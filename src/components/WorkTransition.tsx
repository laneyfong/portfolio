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

        .work-transition-arrow {
          transition: transform 0.2s ease;
          display: inline-block;
        }

        .work-transition-cta:hover .work-transition-arrow {
          transform: translateX(3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .work-transition-arrow {
            transition: none !important;
          }
        }
      `}</style>

      <div className="work-transition">
        <div className="work-transition-content">
          <button
            className="work-transition-cta"
            onClick={() => navigate("/archive")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              border: "none",
              borderRadius: 6,
              background: "transparent",
              fontFamily: tokens.font.sans,
              fontSize: 13,
              fontWeight: tokens.weight.regular,
              letterSpacing: tokens.tracking.tight,
              color: tokens.color.muted,
              cursor: "pointer",
              transition: "all 0.2s ease",
              textDecoration: "none",
              whiteSpace: "nowrap",
              opacity: 0.7,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.color = tokens.color.body;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
              (e.currentTarget as HTMLButtonElement).style.color = tokens.color.muted;
            }}
          >
            View more work
            <span className="work-transition-arrow">→</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkTransition;
