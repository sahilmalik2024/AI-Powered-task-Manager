import React from "react";
import Particles from "react-particles";
import { loadLinksPreset } from "tsparticles-preset-links";
import { Engine } from "tsparticles-engine";

const AnimatedBackground = () => {
  const particlesInit = async (engine: Engine) => {
    await loadLinksPreset(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "links",
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: {
            value: "#0f2027"
          }
        }
      }}
    />
  );
};

export default AnimatedBackground;
