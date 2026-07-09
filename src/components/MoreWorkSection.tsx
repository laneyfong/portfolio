import type { FC } from "react";
import { tokens } from "../tokens";

const MoreWorkSection: FC = () => {

  return (
    <div
      style={{
        marginTop: 100,
        paddingTop: 80,
        paddingBottom: 80,
        borderTop: `1px solid ${tokens.color.cardBorder}`,
        textAlign: "center",
      }}
    >
      <style>{`
        .more-work-button {
          display: inline-flex;
          align-items: "center";
          gap: 8px;
          padding: 12px 28px;
          border: 1px solid ${tokens.color.cardBorder};
          border-radius: 999px;
          background-color: ${tokens.color.white};
          color: ${tokens.color.ink};
          font-family: ${tokens.font.sans};
          font-weight: ${tokens.weight.regular};
          font-size: 14px;
          text-decoration: none;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .more-work-button:hover {
          background-color: ${tokens.color.offWhite};
        }

        .more-work-arrow {
          display: inline-flex;
          align-items: center;
          transition: transform 200ms ease;
        }

        .more-work-button:hover .more-work-arrow {
          transform: translateX(4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .more-work-button,
          .more-work-arrow {
            transition: none !important;
          }
        }
      `}</style>

      <h2
        style={{
          margin: "0 0 12px 0",
          fontFamily: tokens.font.sans,
          fontSize: "28px",
          fontWeight: tokens.weight.medium,
          color: tokens.color.ink,
          lineHeight: 1.3,
        }}
      >
        View All Projects
      </h2>

      <p
        style={{
          margin: "0 0 32px 0",
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
          fontFamily: tokens.font.sans,
          fontSize: "15px",
          fontWeight: tokens.weight.regular,
          color: tokens.color.body,
          lineHeight: 1.6,
          opacity: 0.8,
        }}
      >
        Explore additional product design, UX, AI, visual design, and interaction work.
      </p>

      <a
        href="/work"
        className="more-work-button"
      >
        <span>View All Projects</span>
        <span className="more-work-arrow">
          <svg width="8" height="9" viewBox="0 0 8.271 8.974" fill="currentColor">
            <path
              d="M 8.271 4.838 L 4.135 8.974 L 0 4.838 L 0.396 4.443 L 3.854 7.901 L 3.854 0 L 4.417 0 L 4.417 7.901 L 7.875 4.443 L 8.271 4.838 Z"
              fillRule="nonzero"
            />
          </svg>
        </span>
      </a>
    </div>
  );
};

export default MoreWorkSection;
