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
  // Try multiple positions to avoid getting the tooltip itself
  const offsets = [
    { x: 0, y: 0 },
    { x: -30, y: -30 },
    { x: 30, y: 30 },
    { x: -50, y: 0 },
    { x: 50, y: 0 }
  ];

  for (const offset of offsets) {
    const element = document.elementFromPoint(x + offset.x, y + offset.y) as HTMLElement;
    if (!element || element.closest('[role="button"]')?.querySelector('.badge-container')) continue;

    const bgColor = window.getComputedStyle(element).backgroundColor;
    if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") {
      return bgColor;
    }
  }

  return "rgba(255, 255, 255, 1)";
};
