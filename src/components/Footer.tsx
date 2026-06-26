import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import nameLogoCharacter from "../../NameLogoFull_Character.svg";
import { LinkedInIcon, EmailIcon, SocialIconLink, LINKEDIN_URL, CONTACT_EMAIL } from "./SocialIcons";

const NAV_LINKS = ["Work", "About", "Lab", "Resume"];

// Mirrors Header.tsx's ROUTES — "Lab" and "Resume" have no page yet, so they're left
// as inert labels for now rather than linking somewhere fake.
const ROUTES: Record<string, string> = {
  Work: "/",
  About: "/about",
};

const FooterLink: FC<{ label: string }> = ({ label }) => {
  const navigate = useNavigate();
  const path = ROUTES[label];

  return (
    <a
      href={path ?? undefined}
      onClick={(e) => {
        e.preventDefault();
        if (path) navigate(path);
      }}
      style={{
        fontFamily: tokens.font.sans,
        fontWeight: tokens.weight.regular,
        fontSize: "16px",
        color: tokens.color.white,
        textDecoration: "none",
        cursor: path ? "pointer" : "default",
        opacity: 0.85,
        transition: "opacity 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
    >
      {label}
    </a>
  );
};

const Footer: FC = () => (
  <footer
    style={{
      backgroundColor: tokens.color.ink,
      padding: "clamp(40px, 8vw, 70px) clamp(24px, 7vw, 64px)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 48,
        maxWidth: 1384,
        margin: "0 auto",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            fontSize: tokens.text.sm,
            color: tokens.color.white,
            opacity: 0.85,
            margin: "0 0 12px 0",
          }}
        >
          Designed and vibe coded with{" "}
          <em
            style={{
              fontFamily: tokens.font.serifItalic,
              fontStyle: "italic",
              color: tokens.color.accent,
            }}
          >
            passion
          </em>{" "}
          by
        </p>
        <img
          src={nameLogoCharacter}
          alt="Name logo character"
          style={{
            maxWidth: "100%",
            height: "auto",
            marginTop: "4px",
          }}
        />
      </div>

      <div>
        <p
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            fontSize: tokens.text.md,
            color: tokens.color.white,
            lineHeight: tokens.leading.normal,
            margin: 0,
          }}
        >
          Thank you for{" "}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic" }}>visiting</em>.
          <br />
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic" }}>Connect</em> with me through
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <SocialIconLink href={LINKEDIN_URL} label="LinkedIn" external>
            <LinkedInIcon />
          </SocialIconLink>
          <SocialIconLink href={`mailto:${CONTACT_EMAIL}`} label="Email">
            <EmailIcon />
          </SocialIconLink>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {NAV_LINKS.map((label) => (
          <FooterLink key={label} label={label} />
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
