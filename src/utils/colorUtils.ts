// Calculate luminance of a color to determine if it's light or dark
export const getLuminance = (rgb: string): number => {
  // Parse rgb/rgba string
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return 0.5;

  const [, r, g, b] = match.map((val, i) => i === 0 ? 0 : parseInt(val));

  // Calculate relative luminance using WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance;
};

export const isDarkBackground = (luminance: number): boolean => {
  return luminance < 0.5;
};

export const getBackgroundColorUnderCursor = (x: number, y: number): string => {
  const element = document.elementFromPoint(x, y) as HTMLElement;
  if (!element) return "rgba(255, 255, 255, 1)";

  const bgColor = window.getComputedStyle(element).backgroundColor;
  return bgColor || "rgba(255, 255, 255, 1)";
};
