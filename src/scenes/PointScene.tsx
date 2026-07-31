import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { AccentBar } from "../components/AccentBar";
import type { z } from "zod";
import type { pointSceneSchema } from "../schema";

export const PointScene: React.FC<z.infer<typeof pointSceneSchema>> = ({
  index,
  total,
  title,
  text,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 18 });
  const translateY = interpolate(rise, [0, 1], [20, 0]);
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
      <div style={{ display: "flex", gap: 28, alignItems: "stretch", width: "100%" }}>
        <div style={{ height: 240 }}>
          <AccentBar color={theme.color.sage} />
        </div>
        <div style={{ transform: `translateY(${translateY}px)`, opacity, flex: 1 }}>
          <div
            style={{
              fontFamily: theme.font.body,
              fontSize: 26,
              fontWeight: 700,
              color: theme.color.textMuted,
              marginBottom: 14,
            }}
          >
            {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: theme.font.display,
              fontSize: 58,
              fontWeight: 700,
              color: theme.color.text,
              lineHeight: 1.1,
              maxWidth: 820,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: theme.font.body,
              fontSize: 32,
              fontWeight: 400,
              color: theme.color.textMuted,
              marginTop: 20,
              maxWidth: 780,
              lineHeight: 1.4,
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};
