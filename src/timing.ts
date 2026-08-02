import type { USDShortProps } from "./schema";

/**
 * Durée du fondu entre deux scènes. Avec TransitionSeries, chaque transition
 * "mange" ce nombre de frames sur le total (les deux scènes voisines se
 * chevauchent pendant le fondu) — d'où le calcul dédié ci-dessous, à utiliser
 * PARTOUT où on a besoin de la durée totale réelle (Root.tsx ET Composition.tsx),
 * pour ne jamais désynchroniser la durée déclarée de la durée réellement rendue.
 */
export const TRANSITION_DURATION_IN_FRAMES = 12; // ~0.4s à 30fps

export const sceneDurationsInFrames = (props: USDShortProps): number[] =>
  props.scenes.map((s) => Math.round(s.durationInSeconds * props.fps));

export const totalDurationInFrames = (props: USDShortProps): number => {
  const durations = sceneDurationsInFrames(props);
  const sumOfScenes = durations.reduce((a, b) => a + b, 0);
  const numTransitions = Math.max(0, durations.length - 1);
  return sumOfScenes - numTransitions * TRANSITION_DURATION_IN_FRAMES;
};
