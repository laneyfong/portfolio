import type { FC, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

interface FeaturedWorkShowcaseProps {
  children: ReactNode[];
  onActiveIndexChange?: (index: number) => void;
}

const FeaturedWorkShowcase: FC<FeaturedWorkShowcaseProps> = ({ children }) => {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
        width: "100%",
        height: "fit-content",
      }}
    >
      {Array.isArray(children) &&
        children.map((child, index) => {
          const childWithProps = isValidElement(child) ? cloneElement(child, { isActive: true } as any) : child;
          return <div key={index}>{childWithProps}</div>;
        })}
    </div>
  );
};

export default FeaturedWorkShowcase;
