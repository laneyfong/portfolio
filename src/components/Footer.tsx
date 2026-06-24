import type { FC } from "react";
import { tokens } from "../tokens";
import signature from "../assets/signature.svg";
import { LinkedInIcon, EmailIcon, SocialIconLink, LINKEDIN_URL, CONTACT_EMAIL } from "./SocialIcons";

const NAV_LINKS = ["Work", "About", "Lab", "Resume"];

const FooterLink: FC<{ label: string }> = ({ label }) => (
  <a
    href="#"
    style={{
      fontFamily: tokens.font.sans,
      fontWeight: tokens.weight.regular,
      fontSize: tokens.text.md,
      color: tokens.color.white,
      textDecoration: "none",
      opacity: 0.85,
      transition: "opacity 0.15s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
  >
    {label}
  </a>
);

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
      <img
        src={signature}
        alt="Laney Fong — designed with passion and matcha"
        width={280}
        height={141}
        style={{ maxWidth: "100%", height: "auto" }}
      />

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

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {NAV_LINKS.map((label) => (
          <FooterLink key={label} label={label} />
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
