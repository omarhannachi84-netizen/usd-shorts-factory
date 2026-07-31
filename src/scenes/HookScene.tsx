import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { AccentBar } from "../components/AccentBar";
import type { z } from "zod";
import type { hookSceneSchema } from "../schema";

export const HookScene: React.FC<z.infer<typeof hookSceneSchema>> = ({ eyebrow, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });
  const translateY = interpolate(rise, [0, 1], [24, 0]);
  const opacity = interpolate(rise, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        padding: `0 ${theme.safeMargin}px`,
      }}
    >
      <div style={{ display: "flex", gap: 28, alignItems: "stretch" }}>
        <div style={{ height: 220 }}>
          <AccentBar color={theme.color.ember} />
        </div>
        <div style={{ transform: `translateY(${translateY}px)`, opacity }}>
          <div
            style={{
              fontFamily: theme.font.body,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: theme.color.ember,
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: theme.font.display,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
              color: theme.color.text,
              maxWidth: 880,
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};
