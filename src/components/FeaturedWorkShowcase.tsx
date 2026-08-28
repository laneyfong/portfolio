import type { FC, ReactNode } from "react";
import { useState, useEffect, useRef, cloneElement, isValidElement } from "react";

interface FeaturedWorkShowcaseProps {
  children: ReactNode[];
}

const FeaturedWorkShowcase: FC<FeaturedWorkShowcaseProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGridMode, setIsGridMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-driven activation and grid-to-stacked transition
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;

      // Determine if we should be in grid or stacked mode
      // Switch to stacked mode once container scrolls past top of viewport
      const shouldBeGridMode = containerRect.top > -window.innerHeight * 0.3;
      setIsGridMode(shouldBeGridMode);

      // Only calculate active index in stacked mode
      if (!shouldBeGridMode) {
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
      }
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
      {/* Grid/Stack container with smooth transition */}
      <div
        style={{
          display: isGridMode ? "grid" : "flex",
          gridTemplateColumns: isGridMode ? "repeat(2, 1fr)" : undefined,
          flexDirection: isGridMode ? undefined : "column",
          gap: isGridMode ? 16 : 4,
          width: "100%",
          transition: "display 0.6s cubic-bezier(0.4, 0, 0.2, 1), gap 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {Array.isArray(children) &&
          children.map((child, index) => {
            const isCardActive = index === activeIndex;
            const distance = index - activeIndex;

            // Grid mode: show all cards normally
            if (isGridMode) {
              const childWithProps = isValidElement(child) ? cloneElement(child, { isActive: true } as any) : child;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  onClick={() => handleCardClick(index)}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  {childWithProps}
                </div>
              );
            }

            // Stacked mode: show one active with others scaled/faded
            const zIndex = distance === 0 ? 50 : 40 - Math.abs(distance);
            const scale = isCardActive ? 1 : Math.max(0.85, 1 - Math.abs(distance) * 0.15);
            const opacity = isCardActive ? 1 : Math.max(0.35, 1 - Math.abs(distance) * 0.3);
            const offsetY = distance > 0 ? Math.min(distance * 12, 24) : Math.max(distance * -12, -24);

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
                  clipPath: distance > 0
                    ? `inset(0 0 -${100 - Math.min(distance === 1 ? 28 : 15, 28)}% 0)`
                    : distance < 0
                    ? `inset(-${100 - Math.min(Math.abs(distance) === 1 ? 28 : 15, 28)}% 0 0 0)`
                    : "none",
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
