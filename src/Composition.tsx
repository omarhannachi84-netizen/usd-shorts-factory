import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import type { z } from "zod";
import type { usdShortSchema, Scene } from "./schema";
import { theme } from "./theme";
import { HookScene } from "./scenes/HookScene";
import { StatScene } from "./scenes/StatScene";
import { PointScene } from "./scenes/PointScene";
import { QuoteScene } from "./scenes/QuoteScene";
import { CTAScene } from "./scenes/CTAScene";
import { Caption } from "./components/Caption";

const sceneToCaption = (scene: Scene): string | null => {
  switch (scene.type) {
    case "hook":
      return scene.text;
    case "stat":
      return `${scene.value} — ${scene.label}`;
    case "point":
      return `${scene.title}. ${scene.text}`;
    case "quote":
      return `« ${scene.text} » — ${scene.author}`;
    case "cta":
      return null; // déjà lisible en gros dans la scène elle-même
  }
};

const SceneRenderer: React.FC<{ scene: Scene }> = ({ scene }) => {
  switch (scene.type) {
    case "hook":
      return <HookScene {...scene} />;
    case "stat":
      return <StatScene {...scene} />;
    case "point":
      return <PointScene {...scene} />;
    case "quote":
      return <QuoteScene {...scene} />;
    case "cta":
      return <CTAScene {...scene} />;
  }
};

export const USDShort: React.FC<z.infer<typeof usdShortSchema>> = ({
  fps,
  backgroundColor,
  audioFileName,
  captionsEnabled,
  scenes,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {audioFileName ? <Audio src={staticFile(`audio/${audioFileName}`)} /> : null}

      <Series>
        {scenes.map((scene, i) => (
          <Series.Sequence
            key={i}
            durationInFrames={Math.round(scene.durationInSeconds * fps)}
            layout="none"
          >
            <AbsoluteFill style={{ backgroundColor: theme.color.background }}>
              <SceneRenderer scene={scene} />
              {captionsEnabled && sceneToCaption(scene) ? (
                <Caption text={sceneToCaption(scene) as string} />
              ) : null}
            </AbsoluteFill>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
