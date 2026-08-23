import { z } from "zod";
import { zColor } from "@remotion/zod-types";

const backgroundMediaSchema = z
  .object({
    type: z.enum(["image", "video"]),
    src: z.string().describe("Nom du fichier dans public/images/ ou public/video/"),
  })
  .optional()
  .describe(
    "Fond réel en plein cadre POUR CETTE SCÈNE UNIQUEMENT. Pour un fond continu sur tout le short, utiliser globalBackgroundSrc au niveau racine."
  );

const baseScene = z.object({
  durationInSeconds: z.number().positive(),
  background: backgroundMediaSchema,
});

export const hookSceneSchema = baseScene.extend({
  type: z.literal("hook"),
  eyebrow: z.string().describe("Petit label au-dessus du hook (ex: ÉTÉ 2026)"),
  text: z.string().describe("Phrase choc, courte, 6-10 mots max"),
});

export const hookVideoSceneSchema = z.object({
  type: z.literal("hookVideo"),
  durationInSeconds: z.number().positive(),
  src: z.string().describe("Nom du fichier vidéo dans public/video/ (le clip pattern interrupt)"),
});

export const statSceneSchema = baseScene.extend({
  type: z.literal("stat"),
  value: z.string().describe("Le chiffre, ex: '42 000 ha'"),
  label: z.string().describe("Ce que représente le chiffre"),
  source: z.string().optional().describe("Attribution courte, ex: 'EFFIS, 2026'"),
});

export const pointSceneSchema = baseScene.extend({
  type: z.literal("point"),
  index: z.number().int().describe("Numéro du point dans la séquence (1, 2, 3...)"),
  total: z.number().int().describe("Nombre total de points dans la séquence"),
  title: z.string().describe("Le geste/conseil en 3-5 mots"),
  text: z.string().describe("Explication courte, 1 phrase"),
});

export const quoteSceneSchema = baseScene.extend({
  type: z.literal("quote"),
  text: z.string().describe("La citation, courte"),
  author: z.string().describe("Ex: OH"),
  role: z.string().describe("Ex: Fondateur d'Urban Survival District"),
});

export const ctaSceneSchema = baseScene.extend({
  type: z.literal("cta"),
  headline: z.string().describe("Ex: Votre sac est-il prêt ?"),
  subtext: z.string().describe("Ex: Guide complet en bio"),
  handle: z.string().describe("Ex: @UrbanSurvivalDistrict"),
});

export const sceneSchema = z.discriminatedUnion("type", [
  hookSceneSchema,
  hookVideoSceneSchema,
  statSceneSchema,
  pointSceneSchema,
  quoteSceneSchema,
  ctaSceneSchema,
]);

export type Scene = z.infer<typeof sceneSchema>;

export const usdShortSchema = z.object({
  fps: z.number().int().positive(),
  backgroundColor: zColor(),
  audioFileName: z
    .string()
    .describe("Nom du fichier audio ElevenLabs dans public/audio/"),
  avatarBubbleSrc: z
    .string()
    .optional()
    .describe("Clip avatar continu (export ElevenLabs lip-sync) dans public/video/, en bulle."),
  globalBackgroundSrc: z
    .string()
    .optional()
    .describe("Fond vidéo GLOBAL qui défile en continu derrière toutes les scènes. Fichier dans public/video/."),
  captionsEnabled: z.boolean(),
  scenes: z.array(sceneSchema).min(1),
});

export type USDShortProps = z.infer<typeof usdShortSchema>;
