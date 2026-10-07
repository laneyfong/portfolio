import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export const BadgeGradient = () => {
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
      <ShaderGradient
        control="props"
        color1="#FAF7F2"
        color2="#D97757"
        color3="#FAF7F2"
        color4="#D97757"
        speed={0.15}
        noiseAmount={0.25}
      />
    </ShaderGradientCanvas>
  );
};

export default BadgeGradient;
