import type { PinSet } from "../../pins/schema";

/**
 * LOT D'ÉPINGLES — Feux de forêt France 2026
 *
 * ▶ POUR UN NOUVEL ARTICLE : dupliquer ce fichier, changer le slug, l'URL et
 *   les textes. Puis ajouter le lot à ALL_PIN_SETS dans src/Root.tsx.
 *
 * ▶ Publication échelonnée : J+0 hero · J+2 checklist · J+4 contre · J+6 methode
 */
export const feuxDeForet2026Pins: PinSet = {
  slug: "feux-de-foret-2026",
  articleUrl:
    "https://www.urban-survival-district.com/blogs/guide-survie-urbaine/feux-foret-france-preparation-evacuation-methode-lmu",
  pins: [
    {
      type: "hero",
      slug: "feux-de-foret-2026",
      eyebrow: "Feux de forêt 2026",
      headline: "Le guide de préparation qui sauve des vies",
      photo: "preparation-sac-evacuation.jpg",
    },
    {
      type: "checklist",
      slug: "feux-de-foret-2026",
      eyebrow: "Sac d'évacuation",
      headline: "Les 5 catégories essentielles",
      items: [
        "Documents d'identité et assurance",
        "Eau : gourde + poche à eau",
        "Éclairage autonome",
        "Radio FM/AM à manivelle",
        "Trousse de premiers secours",
      ],
      photo: "preparation-sac-evacuation.jpg",
    },
    {
      type: "contre",
      slug: "feux-de-foret-2026",
      eyebrow: "Feux de forêt",
      punch: "On évacue sur ordre, pas sur instinct",
      support:
        "Voir de la fumée ne suffit pas. La consigne officielle est d'attendre la décision des autorités — sauf danger immédiat.",
    },
    {
      type: "methode",
      slug: "feux-de-foret-2026",
      eyebrow: "Préparation citoyenne",
      pillars: [
        {
          title: "Rester Lucide",
          text: "S'informer, résister au réflexe de panique, suivre la doctrine officielle.",
        },
        {
          title: "Rester Mobile",
          text: "Un sac prêt à l'avance, accessible en moins de cinq minutes.",
        },
        {
          title: "Rester Utile",
          text: "Premiers secours et entraide, une fois en sécurité.",
        },
      ],
    },
  ],
};
