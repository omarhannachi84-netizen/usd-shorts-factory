import React from "react";
import { OffthreadVideo, staticFile } from "remotion";
import { theme } from "../theme";

/**
 * Bulle avatar façon webcam — positionnée en bas à gauche.
 *
 * ⚠️ `muted` : le clip vient d'ElevenLabs Synchronisation labiale, donc il PORTE
 * déjà la voix off. On le coupe systématiquement, sinon la voix est jouée deux
 * fois (une fois par le fond/le mp3, une fois par la bulle).
 */
export const AvatarBubble: React.FC<{ src: string; size?: number }> = ({ src, size = 260 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        bottom: 300,
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
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 20%",
        }}
      />
    </div>
  );
};
