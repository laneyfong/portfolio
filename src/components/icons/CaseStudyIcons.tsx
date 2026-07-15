import type { FC } from "react";

interface IconProps {
  size?: number;
  color?: string;
}

export const SpeedIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const ClarityIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const CheckIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AccessibilityIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="4" r="1.5" />
    <path d="M12 8v6M9 11l-3 6M15 11l3 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TargetIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const SearchIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="10" cy="10" r="6" />
    <path d="M14.5 14.5l5 5" strokeLinecap="round" />
  </svg>
);

export const AnalyticsIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M3 20V8M3 8L7 12M7 12L11 8M11 8L15 14M15 14L19 10M19 10V20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MobileIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <line x1="12" y1="19" x2="12" y2="19.01" />
  </svg>
);

export const TrendIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M3 20L8 15L12 19L21 10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 10h-5v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LightbulbIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c0 1.93-1.57 3.5-3.5 3.5S8 12.93 8 11s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5z" />
  </svg>
);

export const AwardIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PinIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 8 10 12 10 12s10-4 10-12c0-5.52-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

export const MapIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AlertIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M12 2L2 20h20L12 2z" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12" y2="17.01" strokeLinecap="round" />
  </svg>
);

export const BrainIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const EyeIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M12 5C7 5 2.73 8.11 1 12.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 8.11 17 5 12 5zm0 12.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 8.5 12 8.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

export const LockIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M7 10V6a5 5 0 0 1 10 0v4" strokeLinecap="round" />
    <line x1="12" y1="14" x2="12" y2="18" strokeLinecap="round" />
  </svg>
);

export const ClockIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SettingsIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const QuestionIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9c.26-1.12 1.37-2 2.91-2 1.66 0 3 1.34 3 3 0 1-1 2-2 2.5M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NotesIcon: FC<IconProps> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M7 10h10M7 14h10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
