import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type { z } from "zod";
import type { usdShortSchema, Scene } from "./schema";
import { theme } from "./theme";
import { TRANSITION_DURATION_IN_FRAMES } from "./timing";
import { HookScene } from "./scenes/HookScene";
import { StatScene } from "./scenes/StatScene";
import { PointScene } from "./scenes/PointScene";
import { QuoteScene } from "./scenes/QuoteScene";
import { CTAScene } from "./scenes/CTAScene";
import { Caption } from "./components/Caption";
import { EmberBackground } from "./components/EmberBackground";

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

      {/*
        Rendu en dehors de la TransitionSeries : cet élément tourne sur la frame
        absolue de toute la vidéo, jamais réinitialisé par un changement de scène.
        C'est ce qui évite l'effet "diaporama" — quelque chose bouge en continu,
        même sur un écran de texte statique.
      */}
      <EmberBackground />

      <TransitionSeries>
        {scenes.map((scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence
              durationInFrames={Math.round(scene.durationInSeconds * fps)}
            >
              <AbsoluteFill>
                <SceneRenderer scene={scene} />
                {captionsEnabled && sceneToCaption(scene) ? (
                  <Caption text={sceneToCaption(scene) as string} />
                ) : null}
              </AbsoluteFill>
            </TransitionSeries.Sequence>

            {i < scenes.length - 1 ? (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_DURATION_IN_FRAMES })}
              />
            ) : null}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
