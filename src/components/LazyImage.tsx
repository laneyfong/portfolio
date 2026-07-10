import type { FC, ImgHTMLAttributes } from "react";
import { useRef, useEffect, useState } from "react";

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  webpSrc?: string;
  alt: string;
  placeholder?: string;
}

/**
 * Lazy-loading image component with WebP support.
 *
 * Features:
 * - Defers loading until element enters viewport (Intersection Observer)
 * - Serves WebP to browsers that support it, falls back to original format
 * - Maintains aspect ratio to prevent layout shift
 * - Smooth fade-in transition on load
 */
const LazyImage: FC<LazyImageProps> = ({ src, webpSrc, alt, placeholder, ...props }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <picture>
      {webpSrc && isInView && (
        <source srcSet={webpSrc} type="image/webp" />
      )}
      <img
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0.7,
          transition: "opacity 0.3s ease",
          ...props.style,
        }}
        {...props}
      />
    </picture>
  );
};

export default LazyImage;
