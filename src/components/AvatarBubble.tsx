import React from "react";
import { OffthreadVideo, staticFile } from "remotion";
import { theme } from "../theme";

/**
 * Bulle avatar façon webcam — positionnée en bas à gauche par défaut. Rendue en
 * dehors de la TransitionSeries dans Composition.tsx (via <Sequence from={...}>
 * démarrant à la fin du hook vidéo) pour rester visible en continu par-dessus
 * n'importe quel fond de scène.
 */
export const AvatarBubble: React.FC<{ src: string; size?: number }> = ({ src, size = 260 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        bottom: 300, // au-dessus de la zone de légende (voir Caption.tsx, bottom: 260)
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: `4px solid ${theme.color.ember}`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
      }}
    >
      <OffthreadVideo
        src={staticFile(`video/${src}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          // Recadrage : suppose un plan buste centré ; ajuster si le clip source est cadré différemment.
          objectPosition: "center 20%",
        }}
      />
    </div>
  );
};
