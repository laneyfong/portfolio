import type { FC } from "react";

interface CollageCell {
  size: string;
  position: string;
}

interface PhotoCollageProps {
  src: string;
  cells: CollageCell[];
  gridTemplateColumns: string;
  gridTemplateRows?: string;
  gap?: number;
  height: number | string;
}

// A single source photo, sliced into a few grid cells each cropped/zoomed
// differently — the "shattered" collage look used throughout the about page,
// built from one real photograph rather than several.
const PhotoCollage: FC<PhotoCollageProps> = ({ src, cells, gridTemplateColumns, gridTemplateRows, gap = 3, height }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns,
      gridTemplateRows,
      gap,
      height,
      width: "100%",
    }}
  >
    {cells.map((cell, i) => (
      <div
        key={i}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: cell.size,
          backgroundPosition: cell.position,
          backgroundRepeat: "no-repeat",
        }}
      />
    ))}
  </div>
);

export default PhotoCollage;
