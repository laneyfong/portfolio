import type { FC, ReactNode } from "react";
import { useState, useEffect, useRef, cloneElement, isValidElement } from "react";

interface FeaturedWorkShowcaseProps {
  children: ReactNode[];
}

const FeaturedWorkShowcase: FC<FeaturedWorkShowcaseProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-driven activation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setActiveIndex(index);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        perspective: "1000px",
      }}
    >
      {/* Stack container with padding to show next card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          width: "100%",
        }}
      >
        {Array.isArray(children) &&
          children.map((child, index) => {
            const isCardActive = index === activeIndex;
            const distance = index - activeIndex;

            // Calculate z-index: active card on top, cards below decrease in z
            const zIndex = distance === 0 ? 50 : 40 - Math.abs(distance);

            // More muted scale: active = 1, only slight scaling for inactive
            const scale = isCardActive ? 1 : Math.max(0.98, 1 - Math.abs(distance) * 0.01);

            // Smoother opacity: fade-based transitions
            const opacity = isCardActive ? 1 : Math.max(0.35, 1 - Math.abs(distance) * 0.3);

            // Minimal vertical offset for more subtle stacking
            const offsetY = distance > 0 ? Math.min(distance * 12, 24) : 0;

            // Clone child element with isActive prop if it's a valid element
            const childWithProps = isValidElement(child) ? cloneElement(child, { isActive: isCardActive } as any) : child;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => handleCardClick(index)}
                style={{
                  position: "relative",
                  width: "100%",
                  cursor: distance > 0 ? "pointer" : "default",
                  transform: `scale(${scale}) translateY(${offsetY}px)`,
                  opacity,
                  transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  transformOrigin: "center top",
                  zIndex,
                  // Clip cards below to show only 20-30% peek
                  clipPath: distance > 0 ? `inset(0 0 -${100 - Math.min(distance === 1 ? 28 : 15, 28)}% 0)` : "none",
                }}
              >
                {childWithProps}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FeaturedWorkShowcase;
