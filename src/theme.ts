/**
 * Système de design "Braise" — identité visuelle des Shorts Urban Survival District.
 *
 * Logique du choix (à ne pas casser sans raison en éditant les scènes) :
 * - Fond sombre "Nuit Urbaine" : sérieux, lisible en plein soleil sur mobile, jamais criard.
 * - Accent "Braise" (orange-brique) : rappelle le feu sans tomber dans le rouge alarme.
 *   Utilisé pour LE signature element (la barre verticale animée), jamais en aplat plein écran.
 * - "Alerte" (ambre) réservé aux chiffres-clés : rare, donc percutant.
 * - "Végétal" (sauge désaturée) : nature/forêt SANS lecture "treillis militaire" —
 *   volontairement désaturé pour rester cohérent avec la ligne éditoriale
 *   (non-militarisation, non-sensationnalisme).
 */

import { displayFontFamily, bodyFontFamily } from "./fonts";

export const theme = {
  color: {
    background: "#14181C", // Nuit Urbaine
    surface: "#1E242A", // panneaux/cards légèrement plus clairs que le fond
    line: "#2A3038", // séparateurs discrets
    text: "#F5F1E8", // Lumière — blanc chaud, jamais blanc pur
    textMuted: "#A7ADB4",
    ember: "#E8590C", // Braise — accent signature
    alert: "#F2B705", // Alerte — chiffres-clés uniquement
    sage: "#4A5D4E", // Végétal — accents secondaires, rare
  },
  font: {
    display: displayFontFamily, // titres, hooks, chiffres — géométrique, technique
    body: bodyFontFamily, // légendes, citations — institutionnel, très lisible
  },
  radius: 12,
  safeMargin: 72, // marge de sécurité horizontale (zones UI TikTok/YouTube)
} as const;

export type Theme = typeof theme;
