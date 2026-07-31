import type { USDShortProps } from "../schema";
import { theme } from "../theme";

/**
 * Gabarit de données pour un short. Pour un nouvel article :
 * 1. Dupliquez ce fichier (ex: src/data/mon-nouvel-article.ts).
 * 2. Adaptez le texte des scènes à l'article.
 * 3. Réglez `durationInSeconds` de chaque scène à l'oreille sur votre export ElevenLabs.
 * 4. Déposez le mp3 ElevenLabs dans public/audio/ et mettez à jour `audioFileName`.
 * 5. Enregistrez la nouvelle composition dans src/Root.tsx (voir commentaire là-bas).
 */
export const feuxDeForet2026: USDShortProps = {
  fps: 30,
  backgroundColor: theme.color.background,
  audioFileName: "feux-de-foret-2026.mp3", // à déposer dans public/audio/
  captionsEnabled: true,
  scenes: [
    {
      type: "hook",
      durationInSeconds: 3,
      eyebrow: "Été 2026",
      text: "Les feux de forêt battent des records en France.",
    },
    {
      type: "stat",
      durationInSeconds: 4,
      value: "42 000 ha",
      label: "déjà brûlés à la mi-juillet 2026 — un record",
      source: "EFFIS / Touteleurope, 2026",
    },
    {
      type: "point",
      durationInSeconds: 5,
      index: 1,
      total: 3,
      title: "Rester Lucide",
      text: "On évacue sur ordre des autorités, jamais sur son seul instinct.",
    },
    {
      type: "point",
      durationInSeconds: 5,
      index: 2,
      total: 3,
      title: "Rester Mobile",
      text: "Un sac d'évacuation prêt à l'avance, accessible en moins de 5 minutes.",
    },
    {
      type: "point",
      durationInSeconds: 5,
      index: 3,
      total: 3,
      title: "Rester Utile",
      text: "Premiers secours et entraide, une fois en sécurité.",
    },
    {
      type: "quote",
      durationInSeconds: 6,
      text: "On maîtrise trois choses dans un feu de forêt : sa tête, ses jambes, sa capacité à agir utilement.",
      author: "OH",
      role: "Fondateur d'Urban Survival District",
    },
    {
      type: "cta",
      durationInSeconds: 4,
      headline: "Votre sac est-il prêt ?",
      subtext: "Guide complet — méthode LMU en bio",
      handle: "@UrbanSurvivalDistrict",
    },
  ],
};
