import React from 'react';
import Svg, { Path, Circle, Defs, ClipPath } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedProps,
} from 'react-native-reanimated';

interface WaveFillProps {
  progress: Animated.Animated<number>;
  radius: number;
  wavePhase: Animated.Animated<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * WaveFill - Componente SVG de onda animada para water progress
 * Renderiza uma onda dentro de um círculo que se preenche com base no progresso
 */
export const WaveFill: React.FC<WaveFillProps> = ({ progress, radius, wavePhase }) => {
  const centerX = radius;
  const centerY = radius;

  // Gera o caminho da onda baseado na fase
  const generateWavePath = (phase: number, fillHeight: number): string => {
    const amplitude = 3;
    const frequency = 2;
    const points: string[] = [];

    // Começa na esquerda na altura do preenchimento
    points.push(`M 0 ${fillHeight}`);

    // Desenha a onda
    for (let x = 0; x <= radius * 2; x += 2) {
      const angle = (x / radius) * Math.PI * frequency + phase;
      const y = fillHeight - amplitude * Math.sin(angle);
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
    }

    // Fecha o caminho
    points.push(`L ${radius * 2} ${radius * 2}`);
    points.push(`L 0 ${radius * 2}`);
    points.push('Z');

    return points.join(' ');
  };

  // Calcula a altura do preenchimento baseado no progresso
  const fillHeight = interpolate(
    progress.value,
    [0, 1],
    [radius * 2, 0],
    Extrapolate.CLAMP
  );

  const wavePathData = generateWavePath(wavePhase.value, fillHeight);

  return (
    <Svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      style={{ position: 'absolute' }}
    >
      <Defs>
        <ClipPath id="circle-clip">
          <Circle cx={centerX} cy={centerY} r={radius - 2} />
        </ClipPath>
      </Defs>

      {/* Background circle */}
      <Circle
        cx={centerX}
        cy={centerY}
        r={radius - 2}
        fill="rgba(100, 200, 255, 0.1)"
      />

      {/* Wave path clipped dentro do círculo */}
      <AnimatedPath
        d={wavePathData}
        fill="rgba(100, 200, 255, 0.8)"
        clipPath="url(#circle-clip)"
      />
    </Svg>
  );
};

