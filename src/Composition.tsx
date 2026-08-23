import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type { z } from "zod";
import type { usdShortSchema, Scene } from "./schema";
import { theme } from "./theme";
import { TRANSITION_DURATION_IN_FRAMES } from "./timing";
import { HookScene } from "./scenes/HookScene";
import { HookVideoScene } from "./scenes/HookVideoScene";
import { StatScene } from "./scenes/StatScene";
import { PointScene } from "./scenes/PointScene";
import { QuoteScene } from "./scenes/QuoteScene";
import { CTAScene } from "./scenes/CTAScene";
import { Caption } from "./components/Caption";
import { EmberBackground } from "./components/EmberBackground";
import { SceneBackground } from "./components/SceneBackground";
import { AvatarBubble } from "./components/AvatarBubble";

const sceneToCaption = (scene: Scene): string | null => {
  switch (scene.type) {
    case "hook":
      return scene.text;
    case "hookVideo":
      return null;
    case "stat":
      return `${scene.value} — ${scene.label}`;
    case "point":
      return `${scene.title}. ${scene.text}`;
    case "quote":
      return `« ${scene.text} » — ${scene.author}`;
    case "cta":
      return null;
  }
};

const SceneRenderer: React.FC<{ scene: Scene }> = ({ scene }) => {
  switch (scene.type) {
    case "hook":
      return <HookScene {...scene} />;
    case "hookVideo":
      return <HookVideoScene {...scene} />;
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
  avatarBubbleSrc,
  globalBackgroundSrc,
  captionsEnabled,
  scenes,
}) => {
  const firstScene = scenes[0];
  const hookVideoDurationInFrames =
    firstScene?.type === "hookVideo" ? Math.round(firstScene.durationInSeconds * fps) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {audioFileName ? <Audio src={staticFile(`audio/${audioFileName}`)} /> : null}

      {globalBackgroundSrc ? (
        <Sequence from={hookVideoDurationInFrames} layout="none">
          <SceneBackground type="video" src={globalBackgroundSrc} />
        </Sequence>
      ) : (
        <EmberBackground />
      )}

      <TransitionSeries>
        {scenes.map((scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence
              durationInFrames={Math.round(scene.durationInSeconds * fps)}
            >
              <AbsoluteFill>
                {!globalBackgroundSrc && scene.type !== "hookVideo" && scene.background ? (
                  <SceneBackground type={scene.background.type} src={scene.background.src} />
                ) : null}
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

      {avatarBubbleSrc ? (
        <Sequence from={hookVideoDurationInFrames} layout="none">
          <AvatarBubble src={avatarBubbleSrc} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
