import type { FC, ReactNode } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

// TODO: replace with Laney's real LinkedIn profile URL.
export const LINKEDIN_URL = "https://www.linkedin.com/in/TODO-laney-fong";
// TODO: replace with Laney's real contact email address.
export const CONTACT_EMAIL = "todo@example.com";

export const LinkedInIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56z" />
  </svg>
);

export const EmailIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

interface SocialIconLinkProps {
  href: string;
  label: string;
  external?: boolean;
  variant?: "dark" | "light";
  children: ReactNode;
}

// "dark" = sits on a dark surface (footer); "light" = sits on the page's white background.
export const SocialIconLink: FC<SocialIconLinkProps> = ({ href, label, external, variant = "dark", children }) => {
  const [hovered, setHovered] = useState(false);
  const isDark = variant === "dark";
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: isDark
          ? `1px solid rgba(255, 255, 255, ${hovered ? 0.55 : 0.22})`
          : `1px solid ${hovered ? tokens.color.navActive : tokens.color.cardBorder}`,
        color: isDark ? tokens.color.white : tokens.color.body,
        opacity: isDark ? (hovered ? 1 : 0.78) : 1,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
      }}
    >
      {children}
    </a>
  );
};
