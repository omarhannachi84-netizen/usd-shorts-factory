import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { theme } from "../theme";

/**
 * Fond réel plein cadre — remplace le fond uni quand une scène fournit une vraie
 * image/vidéo (ex: intervention pompiers en forêt). Le voile dégradé en bas garantit
 * la lisibilité des légendes par-dessus, quel que soit le contenu de l'image.
 */
export const SceneBackground: React.FC<{
  type: "image" | "video";
  src: string;
}> = ({ type, src }) => {
  const path = staticFile(`${type === "image" ? "images" : "video"}/${src}`);

  return (
    <AbsoluteFill>
      {type === "image" ? (
        <Img src={path} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <OffthreadVideo
          src={path}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {/* Voile sombre — assombrit légèrement l'ensemble + dégradé renforcé en bas pour les légendes */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${theme.color.background}66 0%, ${theme.color.background}33 40%, ${theme.color.background}CC 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
