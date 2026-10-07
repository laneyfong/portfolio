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
        uColors1={[0.941, 0.969, 0.949]}
        uColors2={[0.855, 0.467, 0.341]}
        uColors3={[0.941, 0.969, 0.949]}
        uColors4={[0.855, 0.467, 0.341]}
        uSpeed={0.15}
        uNoiseAmount={0.25}
      />
    </ShaderGradientCanvas>
  );
};

export default BadgeGradient;
