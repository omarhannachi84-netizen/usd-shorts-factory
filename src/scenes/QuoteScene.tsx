import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { AccentBar } from "../components/AccentBar";
import type { z } from "zod";
import type { quoteSceneSchema } from "../schema";

export const QuoteScene: React.FC<z.infer<typeof quoteSceneSchema>> = ({ text, author, role }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });
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
        <div style={{ height: 300 }}>
          <AccentBar color={theme.color.text} heightRatio={0.9} />
        </div>
        <div style={{ opacity }}>
          <div
            style={{
              fontFamily: theme.font.display,
              fontSize: 52,
              fontWeight: 500,
              fontStyle: "italic",
              color: theme.color.text,
              lineHeight: 1.25,
              maxWidth: 800,
            }}
          >
            « {text} »
          </div>
          <div
            style={{
              fontFamily: theme.font.body,
              fontSize: 30,
              fontWeight: 700,
              color: theme.color.ember,
              marginTop: 26,
            }}
          >
            {author}
          </div>
          <div
            style={{
              fontFamily: theme.font.body,
              fontSize: 24,
              fontWeight: 400,
              color: theme.color.textMuted,
              marginTop: 4,
            }}
          >
            {role}
          </div>
        </div>
      </div>
    </div>
  );
};
