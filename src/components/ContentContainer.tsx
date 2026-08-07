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
        maxWidth: "clamp(320px, 90vw, 1200px)",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(16px, 2%, 24px)",
        paddingRight: "clamp(16px, 2%, 24px)",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
