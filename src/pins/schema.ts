import { z } from "zod";

export const PIN_WIDTH = 1000;
export const PIN_HEIGHT = 1500;
export const BOTTOM_RESERVED = 100;

const baseSchema = z.object({
  slug: z.string(),
  eyebrow: z.string(),
});

export const heroPinSchema = baseSchema.extend({
  type: z.literal("hero"),
  headline: z.string(),
  photo: z.string(),
});

export const contrePinSchema = baseSchema.extend({
  type: z.literal("contre"),
  punch: z.string(),
  support: z.string(),
});

export const checklistPinSchema = baseSchema.extend({
  type: z.literal("checklist"),
  headline: z.string(),
  items: z.array(z.string()).min(3).max(6),
  photo: z.string().optional(),
});

export const methodePinSchema = baseSchema.extend({
  type: z.literal("methode"),
  pillars: z.array(z.object({ title: z.string(), text: z.string() })).length(3),
});

export const pinSchema = z.discriminatedUnion("type", [
  heroPinSchema,
  contrePinSchema,
  checklistPinSchema,
  methodePinSchema,
]);

export type Pin = z.infer<typeof pinSchema>;

export const pinSetSchema = z.object({
  slug: z.string(),
  articleUrl: z.string().url(),
  pins: z.array(pinSchema).min(1),
});

export type PinSet = z.infer<typeof pinSetSchema>;
