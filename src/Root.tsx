import React from "react";
import { Composition, type CalculateMetadataFunction } from "remotion";
import { USDShort } from "./Composition";
import { usdShortSchema, type USDShortProps } from "./schema";
import { totalDurationInFrames } from "./timing";
import { feuxDeForet2026 } from "./data/feux-de-foret-2026";

const calculateMetadata: CalculateMetadataFunction<USDShortProps> = async ({ props }) => ({
  durationInFrames: totalDurationInFrames(props),
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/*
        Une "Composition" = un article = un short.
        Pour un nouvel article : dupliquez ce bloc, changez `id` et `defaultProps`
        (importez vos nouvelles données depuis src/data/).
      */}
      <Composition
        id="USDShort"
        component={USDShort}
        durationInFrames={totalDurationInFrames(feuxDeForet2026)}
        fps={feuxDeForet2026.fps}
        width={1080}
        height={1920}
        schema={usdShortSchema}
        defaultProps={feuxDeForet2026}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
};
