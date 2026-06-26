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

export const ResumeIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9" y1="14" x2="15" y2="14" />
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
        width: isDark ? 36 : 40,
        height: isDark ? 36 : 40,
        borderRadius: "50%",
        border: isDark ? `1px solid rgba(255, 255, 255, ${hovered ? 0.55 : 0.22})` : "none",
        background: isDark ? "transparent" : hovered ? tokens.color.dark : tokens.color.ink,
        boxShadow: isDark ? "none" : tokens.shadow.subtle,
        color: isDark ? tokens.color.white : tokens.color.white,
        opacity: isDark ? (hovered ? 1 : 0.78) : 1,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
      }}
    >
      {children}
    </a>
  );
};
