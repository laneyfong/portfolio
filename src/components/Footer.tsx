import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import nameLogoCharacter from "../../NameLogoFull_Character.svg";
import { LinkedInIcon, EmailIcon, SocialIconLink, LINKEDIN_URL, CONTACT_EMAIL, RESUME_URL } from "./SocialIcons";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

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
      borderTop: "1px solid rgba(190, 190, 190, 0.1)",
      position: "relative",
      overflow: "hidden",
      background: "white",
    }}
  >
    <ShaderGradientCanvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ShaderGradient
        control="query"
        urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&bgColor3=%23ffffff&cAmbientLight=0.4&cDirectionalLight=0.8&cameraPositionX=-0.5&cameraPositionY=0&cameraPositionZ=2&color1=%23ffffff&color2=%234060c8&color3=%23ffffff&envPreset=city&fov=45&gizmoHelper=hide&grain=0.7&lightRotationX=45&lightRotationY=45&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=130&rangeEnd=40&rangeStart=0&rotationX=45&rotationY=45&rotationZ=35&scale=100&type=sphere&uAmplitude=0.3&uDensity=0.8&uFrequency=5.5&uSpeed=0.3&uStrength=0.2&upvector=%2B Y"
      />
    </ShaderGradientCanvas>

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
