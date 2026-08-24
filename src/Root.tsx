import React from "react";
import { Composition, Still, type CalculateMetadataFunction } from "remotion";
import { USDShort } from "./Composition";
import { usdShortSchema, type USDShortProps } from "./schema";
import { totalDurationInFrames } from "./timing";
import { feuxDeForet2026 } from "./data/feux-de-foret-2026";

// --- Épingles Pinterest ---
import { PinRenderer } from "./pins/PinTemplates";
import { PIN_WIDTH, PIN_HEIGHT } from "./pins/schema";
import { feuxDeForet2026Pins } from "./data/pins/feux-de-foret-2026";

const calculateMetadata: CalculateMetadataFunction<USDShortProps> = async ({ props }) => ({
  durationInFrames: totalDurationInFrames(props),
});

/**
 * Chaque nouveau lot d'épingles s'ajoute ici (une ligne).
 * Compositions générées : pin-<slug>-<archetype>
 */
const ALL_PIN_SETS = [feuxDeForet2026Pins];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/*
        VIDÉOS — une "Composition" = un article = un short.
        Pour un nouvel article : dupliquez ce bloc, changez `id` et `defaultProps`.
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

      {/*
        ÉPINGLES PINTEREST — images fixes 1000×1500 (2:3).
        Rien à modifier ici : importer le nouveau lot et l'ajouter à ALL_PIN_SETS.
      */}
      {ALL_PIN_SETS.flatMap((set) =>
        set.pins.map((pin) => (
          <Still
            key={`pin-${set.slug}-${pin.type}`}
            id={`pin-${set.slug}-${pin.type}`}
            component={PinRenderer as never}
            width={PIN_WIDTH}
            height={PIN_HEIGHT}
            defaultProps={pin as never}
          />
        ))
      )}
    </>
  );
};
