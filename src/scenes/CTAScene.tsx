import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import type { z } from "zod";
import type { ctaSceneSchema } from "../schema";

export const CTAScene: React.FC<z.infer<typeof ctaSceneSchema>> = ({ headline, subtext, handle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 20 });
  const scale = interpolate(pop, [0, 1], [0.9, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: `0 ${theme.safeMargin}px`,
      }}
    >
      <div style={{ transform: `scale(${scale})`, opacity }}>
        <div
          style={{
            fontFamily: theme.font.display,
            fontSize: 64,
            fontWeight: 700,
            color: theme.color.text,
            lineHeight: 1.15,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily: theme.font.body,
            fontSize: 32,
            color: theme.color.textMuted,
            marginTop: 18,
          }}
        >
          {subtext}
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: 34,
            padding: "14px 30px",
            border: `2px solid ${theme.color.ember}`,
            borderRadius: 999,
            fontFamily: theme.font.body,
            fontWeight: 700,
            fontSize: 28,
            color: theme.color.ember,
            letterSpacing: 1,
          }}
        >
          {handle}
        </div>
      </div>
    </div>
  );
};
