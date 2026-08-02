import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import type { z } from "zod";
import type { hookVideoSceneSchema } from "../schema";

export const HookVideoScene: React.FC<z.infer<typeof hookVideoSceneSchema>> = ({ src }) => {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(`video/${src}`)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};
