import type { USDShortProps } from "../schema";
import { theme } from "../theme";

/**
 * Configuration "montage CapCut" :
 * - La vidéo de fond contient DÉJÀ le hook + les images + la voix off (45s).
 * - Remotion n'ajoute par-dessus que la bulle avatar et le texte LMU.
 * - Pas de mp3 séparé (le son vient de la vidéo de fond) → audioFileName vide.
 * - Les scènes de texte démarrent après le hook intégré (3 premières secondes).
 */
export const feuxDeForet2026: USDShortProps = {
  fps: 30,
  backgroundColor: theme.color.background,
  audioFileName: "",
  avatarBubbleSrc: "avatar-feux-de-foret-2026.mp4",
  globalBackgroundSrc: "pompiers-foret-intervention.mp4",
  captionsEnabled: true,
  scenes: [
    {
      type: "hook",
      durationInSeconds: 3,
      eyebrow: "",
      text: "",
    },
    {
      type: "stat",
      durationInSeconds: 6,
      value: "42 000 ha",
      label: "déjà brûlés à la mi-juillet 2026 — un record",
      source: "EFFIS / Touteleurope, 2026",
    },
    {
      type: "point",
      durationInSeconds: 8,
      index: 1,
      total: 3,
      title: "Rester Lucide",
      text: "On évacue sur ordre des autorités, jamais sur son seul instinct.",
    },
    {
      type: "point",
      durationInSeconds: 8,
      index: 2,
      total: 3,
      title: "Rester Mobile",
      text: "Un sac d'évacuation prêt à l'avance, accessible en moins de 5 minutes.",
    },
    {
      type: "point",
      durationInSeconds: 8,
      index: 3,
      total: 3,
      title: "Rester Utile",
      text: "Premiers secours et entraide, une fois en sécurité.",
    },
    {
      type: "quote",
      durationInSeconds: 7,
      text: "On maîtrise trois choses dans un feu de forêt : sa tête, ses jambes, sa capacité à agir utilement.",
      author: "OH",
      role: "Fondateur d'Urban Survival District",
    },
    {
      type: "cta",
      durationInSeconds: 5,
      headline: "Votre sac est-il prêt ?",
      subtext: "Guide complet — méthode LMU en bio",
      handle: "@UrbanSurvivalDistrict",
    },
  ],
};
