import { loadFont as loadDisplayFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadBodyFont } from "@remotion/google-fonts/IBMPlexSans";

// Space Grotesk : géométrique, un peu technique — pour les titres et chiffres.
export const { fontFamily: displayFontFamily } = loadDisplayFont("normal", {
  weights: ["500", "700"],
});

// IBM Plex Sans : institutionnel mais chaleureux — pour légendes, citations, texte courant.
export const { fontFamily: bodyFontFamily } = loadBodyFont("normal", {
  weights: ["400", "500", "600", "700"],
});
