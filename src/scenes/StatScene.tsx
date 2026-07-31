import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { AccentBar } from "../components/AccentBar";
import type { z } from "zod";
import type { statSceneSchema } from "../schema";

export const StatScene: React.FC<z.infer<typeof statSceneSchema>> = ({ value, label, source }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 12, stiffness: 140, mass: 0.6 }, durationInFrames: 22 });
  const scale = interpolate(pop, [0, 1], [0.85, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

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
        <div style={{ height: 260 }}>
          <AccentBar color={theme.color.alert} />
        </div>
        <div style={{ transform: `scale(${scale})`, opacity, transformOrigin: "left center" }}>
          <div
            style={{
              fontFamily: theme.font.display,
              fontSize: 118,
              fontWeight: 700,
              color: theme.color.alert,
              lineHeight: 1,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontFamily: theme.font.body,
              fontSize: 38,
              fontWeight: 500,
              color: theme.color.text,
              marginTop: 16,
              maxWidth: 760,
            }}
          >
            {label}
          </div>
          {source ? (
            <div
              style={{
                fontFamily: theme.font.body,
                fontSize: 24,
                fontWeight: 400,
                color: theme.color.textMuted,
                marginTop: 14,
              }}
            >
              {source}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
