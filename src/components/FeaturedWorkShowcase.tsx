import type { FC, ReactNode } from "react";
import { cloneElement, isValidElement, useState } from "react";

interface FeaturedWorkShowcaseProps {
  children: ReactNode[];
  onActiveIndexChange?: (index: number) => void;
  className?: string;
}

const FeaturedWorkShowcase: FC<FeaturedWorkShowcaseProps> = ({ children, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .featured-work-showcase {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          width: 100%;
          height: fit-content;
          gap: clamp(12px, 2vw, 20px);
        }

        /* Mobile: single column */
        @media (max-width: 768px) {
          .featured-work-showcase {
            grid-template-columns: 1fr !important;
            gap: clamp(12px, 3vw, 16px);
          }
        }
      `}</style>
      <div
        className={`featured-work-showcase ${className}`}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          width: "100%",
          height: "fit-content",
        }}
      >
      {Array.isArray(children) &&
        children.map((child, index) => {
          const childWithProps = isValidElement(child) ? cloneElement(child, { isActive: true, hoveredIndex, currentIndex: index, onMouseEnter: () => setHoveredIndex(index), onMouseLeave: () => setHoveredIndex(null) } as any) : child;
          return <div key={index} style={{ minWidth: 0 }}>{childWithProps}</div>;
        })}
      </div>
    </>
  );
};

export default FeaturedWorkShowcase;
