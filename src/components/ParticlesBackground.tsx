'use client';

import { useCallback } from 'react';
import Particles from 'react-particles';
import { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: '#0f1117' } },
        particles: {
          number: { value: 30 },
          color: { value: '#ffffff' },
          size: { value: 2 },
          opacity: { value: 0.2 },
          move: {
            enable: true,
            speed: 0.5,
            outModes: { default: 'bounce' },
          },
          links: {
            enable: true,
            color: '#ffffff',
            distance: 100,
            opacity: 0.1,
            width: 1,
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
