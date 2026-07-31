import { Config } from "@remotion/cli/config";

// Format vertical TikTok / YouTube Shorts natif.
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setCrf(18); // qualité élevée, fichier raisonnable pour du short-form
Config.setPixelFormat("yuv420p"); // compatibilité maximale TikTok/YouTube/Instagram
