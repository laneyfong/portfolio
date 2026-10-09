import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import nameLogoCharacter from "../../NameLogoFull_Character.svg";
import { LinkedInIcon, EmailIcon, XIcon, SocialIconLink, LINKEDIN_URL, X_URL, CONTACT_EMAIL, RESUME_URL } from "./SocialIcons";

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
        color: "var(--text-primary)",
        textDecoration: "none",
        cursor: path ? "pointer" : "default",
        letterSpacing: "-0.05em",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#4060c8")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
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
      background: "var(--bg-primary)",
      borderTop: "1px solid var(--border-color)",
      position: "relative",
      overflow: "hidden",
      transition: "background 0.3s ease, border-color 0.3s ease",
    }}
  >
    <style>{`
      @keyframes gradientShift {
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

      .footer-gradient {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          -45deg,
          rgba(255, 127, 80, 0.35) 0%,
          rgba(64, 96, 200, 0.42) 25%,
          rgba(255, 140, 0, 0.3) 50%,
          rgba(64, 96, 200, 0.38) 75%,
          rgba(255, 127, 80, 0.35) 100%
        );
        background-size: 400% 400%;
        animation: gradientShift 18s ease-in-out infinite;
        pointer-events: none;
        opacity: 1;
      }

      .footer-gradient::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image:
          url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" seed="2"/></filter><rect width="256" height="256" fill="transparent" filter="url(%23noise)"/></svg>');
        background-size: 256px 256px;
        opacity: 0.5;
        pointer-events: none;
        mix-blend-mode: multiply;
      }

      .footer-glow {
        position: absolute;
        bottom: 0;
        right: -50px;
        width: 600px;
        height: 400px;
        background: radial-gradient(ellipse at center, rgba(255, 127, 80, 0.2) 0%, rgba(64, 96, 200, 0.1) 40%, transparent 70%);
        filter: blur(60px);
        pointer-events: none;
        animation: gradientShift 22s ease-in-out infinite;
      }
    `}</style>

    <div className="footer-gradient"></div>
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
            color: "#FFFFFF",
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
            color: "#FFFFFF",
            letterSpacing: "-0.05em",
            lineHeight: "21px",
            margin: "0 0 16px 0",
          }}
        >
          Let's collaborate.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <SocialIconLink href={LINKEDIN_URL} label="LinkedIn" external variant="dark">
            <LinkedInIcon />
          </SocialIconLink>
          <SocialIconLink href={X_URL} label="X" external variant="dark">
            <XIcon />
          </SocialIconLink>
          <SocialIconLink href={`mailto:${CONTACT_EMAIL}`} label="Email" variant="dark">
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
