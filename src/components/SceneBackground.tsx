import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { theme } from "../theme";

/**
 * Fond réel plein cadre. Le voile dégradé en bas garantit la lisibilité des
 * légendes par-dessus, quel que soit le contenu de l'image.
 *
 * `muted` : par défaut la vidéo de fond est muette (cas d'un B-roll d'archives
 * accompagné d'une voix off .mp3 séparée). Passer `muted={false}` quand le fond
 * est un montage qui porte DÉJÀ la voix off (cas du montage CapCut).
 */
export const SceneBackground: React.FC<{
  type: "image" | "video";
  src: string;
  muted?: boolean;
}> = ({ type, src, muted = true }) => {
  const path = staticFile(`${type === "image" ? "images" : "video"}/${src}`);

  return (
    <AbsoluteFill>
      {type === "image" ? (
        <Img src={path} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <OffthreadVideo
          src={path}
          muted={muted}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {/* Voile sombre — assombrit légèrement + dégradé renforcé en bas pour les légendes */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${theme.color.background}66 0%, ${theme.color.background}33 40%, ${theme.color.background}CC 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
