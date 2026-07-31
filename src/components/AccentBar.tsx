import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { theme } from "../theme";

/**
 * L'élément signature du template (cf. skill frontend-design : "spend your boldness
 * in one place"). Une barre verticale qui "monte" comme une jauge à l'entrée de
 * chaque scène, colorée selon le type de contenu. Tout le reste du template reste
 * sobre pour ne pas diluer cet effet.
 */
export const AccentBar: React.FC<{
  color?: string;
  heightRatio?: number; // 0 à 1, proportion de la hauteur du bloc de texte
}> = ({ color = theme.color.ember, heightRatio = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const growth = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 120 },
    durationInFrames: 18,
  });

  const scaleY = interpolate(growth, [0, 1], [0, heightRatio]);

  return (
    <div
      style={{
        width: 6,
        height: "100%",
        background: theme.color.line,
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: `${scaleY * 100}%`,
          background: color,
          borderRadius: 3,
        }}
      />
    </div>
  );
};
