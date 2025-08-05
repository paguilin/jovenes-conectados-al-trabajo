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
        background: {
          color: { value: '#0f1117' },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            resize: true,
          },
          modes: {
            repulse: { distance: 50, duration: 0.4 },
          },
        },
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: ['#ffffff', '#00ffff', '#00ff99'] },
          shape: { type: 'circle' },
          opacity: {
            value: 0.3,
            random: true,
            animation: { enable: true, speed: 0.5, minimumValue: 0.1, sync: false },
          },
          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 2, minimumValue: 1, sync: false },
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: 'none',
            outModes: { default: 'bounce' },
          },
          links: {
            enable: true,
            color: '#ffffff',
            distance: 120,
            opacity: 0.15,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;