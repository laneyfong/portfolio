import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import nameLogoCharacter from "../../NameLogoFull_Character.svg";
import { LinkedInIcon, EmailIcon, SocialIconLink, LINKEDIN_URL, CONTACT_EMAIL, RESUME_URL } from "./SocialIcons";

const NAV_LINKS = ["Work", "About", "Lab", "Resume"];

// Mirrors Header.tsx's ROUTES
const ROUTES: Record<string, string> = {
  Work: "/",
  About: "/about",
  Lab: "/lab",
  Resume: RESUME_URL,
};

const FooterLink: FC<{ label: string }> = ({ label }) => {
  const navigate = useNavigate();
  const path = ROUTES[label];
  const isExternal = label === "Resume";

  return (
    <a
      href={path ?? undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        e.preventDefault();
        if (path) {
          if (isExternal) {
            window.open(path, "_blank");
          } else {
            navigate(path);
          }
        }
      }}
      style={{
        fontFamily: tokens.font.sans,
        fontWeight: 400,
        fontSize: "14px",
        color: "#ABADAF",
        textDecoration: "none",
        cursor: path ? "pointer" : "default",
        letterSpacing: "-0.05em",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#4060c8")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#ABADAF")}
    >
      {label}
    </a>
  );
};

const Footer: FC = () => (
  <footer
    style={{
      width: "100%",
      boxSizing: "border-box",
      background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(64,96,200,0.08) 100%)",
      borderTop: "1px solid rgba(190, 190, 190, 0.1)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <style>{`
      @keyframes ambientGlow {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .footer-glow {
        position: absolute;
        top: -200px;
        right: -200px;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(64, 96, 200, 0.1) 0%, transparent 70%);
        animation: ambientGlow 8s ease-in-out infinite;
        pointer-events: none;
      }
    `}</style>

    <div className="footer-glow"></div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 48,
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "60px",
        paddingBottom: "60px",
        paddingLeft: "52px",
        paddingRight: "52px",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div>
        <p
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: 400,
            fontSize: "14px",
            color: "#BEBEBE",
            letterSpacing: "-0.05em",
            margin: "0 0 16px 0",
          }}
        >
          Designed with intention
        </p>
        <img
          src={nameLogoCharacter}
          alt="Name logo character"
          style={{
            maxWidth: "120px",
            height: "auto",
          }}
        />
      </div>

      <div>
        <p
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: 500,
            fontSize: "14px",
            color: "#111111",
            letterSpacing: "-0.05em",
            lineHeight: "21px",
            margin: "0 0 16px 0",
          }}
        >
          Let's collaborate.
        </p>

        <div style={{ display: "flex", gap: 16 }}>
          <SocialIconLink href={LINKEDIN_URL} label="LinkedIn" external>
            <LinkedInIcon />
          </SocialIconLink>
          <SocialIconLink href={`mailto:${CONTACT_EMAIL}`} label="Email">
            <EmailIcon />
          </SocialIconLink>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {NAV_LINKS.map((label) => (
          <FooterLink key={label} label={label} />
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
