import type { FC, ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
}

/**
 * Unified layout container for all pages.
 *
 * Provides consistent:
 * - Responsive max-width (1440px to 1600px+ on ultra-wide displays)
 * - Responsive horizontal padding (48px desktop, 32px tablet, 20px mobile)
 * - Full viewport width with equal left/right spacing
 */
const ContentContainer: FC<ContentContainerProps> = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "clamp(1440px, 95vw, 2000px)",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(20px, 3.5%, 48px)",
        paddingRight: "clamp(20px, 3.5%, 48px)",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
