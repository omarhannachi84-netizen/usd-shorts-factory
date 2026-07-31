import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/**
 * Légende basse, dans la zone "safe" au-dessus des UI natives TikTok/YouTube
 * (boutons like/share, pseudo, etc. occupent généralement les ~220px du bas).
 */
export const Caption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: theme.safeMargin,
        right: theme.safeMargin,
        bottom: 260,
        opacity,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: theme.font.body,
          fontSize: 34,
          fontWeight: 600,
          color: theme.color.text,
          background: "rgba(20, 24, 28, 0.72)",
          padding: "10px 20px",
          borderRadius: theme.radius,
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};
