import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useRef, useEffect } from 'react';

export const BadgeGradient = () => {
  const gradientRef = useRef<any>(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    // Configure subtle, slow-moving gradient
    gradientRef.current.setProps({
      // Brand colors: cream and warm orange
      uColors1: [0.941, 0.969, 0.949], // cream #FAF7F2
      uColors2: [0.855, 0.467, 0.341], // warm orange #D97757

      // Smooth, slow animation
      uTime: 0,
      uSpeed: 0.15, // Slow, subtle motion

      // Noise for grain texture
      uNoiseAmount: 0.25, // Light grain

      // Gradient type for organic feel
      uGradientType: 0,
    });
  }, []);

  return (
    <ShaderGradientCanvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <ShaderGradient ref={gradientRef} />
    </ShaderGradientCanvas>
  );
};

export default BadgeGradient;
