import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

/**
 * Élément de mouvement de fond, rendu UNE SEULE FOIS en dehors de la TransitionSeries
 * (donc sur la frame absolue de toute la vidéo, jamais réinitialisée par scène).
 * C'est ce qui évite l'effet "diaporama" : même sur un écran de texte statique,
 * quelque chose bouge en permanence à l'écran, doucement, sans distraire.
 */
export const EmberBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Dérive lente sur toute la durée de la vidéo (un seul grand mouvement, pas de boucle saccadée)
  const progress = frame / Math.max(durationInFrames, 1);

  const x = interpolate(progress, [0, 1], [18, 82]); // en % de la largeur
  const y = interpolate(progress, [0, 1], [12, 46]); // en % de la hauteur

  // Pulsation douce, lente, jamais synchronisée avec les transitions de scène
  const pulse = 0.5 + 0.5 * Math.sin(frame / 55);
  const opacity = interpolate(pulse, [0, 1], [0.14, 0.24]);
  const size = interpolate(pulse, [0, 1], [900, 1100]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          opacity,
          background: `radial-gradient(circle, ${theme.color.ember} 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />
    </div>
  );
};
