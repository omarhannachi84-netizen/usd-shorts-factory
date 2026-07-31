# 🎬 USD Shorts Factory

Gabarit Remotion réutilisable pour produire les Shorts TikTok / YouTube Shorts d'Urban Survival District à partir de chaque nouvel article pilier — format vertical 1080×1920, identité visuelle "Braise" cohérente d'une vidéo à l'autre.

## Ce que c'est (et ce que ce n'est pas)

Remotion génère la vidéo **par code**, pas par montage manuel. Ce projet ne génère PAS la voix off : vous produisez l'audio séparément avec ElevenLabs, vous le déposez dans `public/audio/`, et ce gabarit l'habille avec le texte, les animations et les légendes.

Licence Remotion : gratuite pour un individu ou une entreprise de 3 salariés ou moins, y compris en usage commercial. Au-delà, licence payante (voir remotion.pro). Vérifiez votre situation avant un usage commercial à plus grande échelle.

## Installation

```bash
npm install
npm start        # ouvre Remotion Studio (aperçu interactif, live reload)
```

Un audio placeholder silencieux (32s) est déjà présent dans `public/audio/feux-de-foret-2026.mp3` pour que la démo tourne dès l'installation. Remplacez-le par votre vrai export ElevenLabs avant le rendu final.

## Workflow pour un nouvel article (la "chaîne de production")

1. **Écrivez le script** (comme le script TikTok déjà rédigé dans l'article) : hook, 1 chiffre-clé, 2-4 points, 1 citation OH, 1 CTA.
2. **Générez la voix off sur ElevenLabs**, exportez le mp3, déposez-le dans `public/audio/nom-de-larticle.mp3`.
3. **Dupliquez `src/data/feux-de-foret-2026.ts`** → `src/data/nom-de-larticle.ts`. Remplissez chaque scène avec le texte de votre article.
4. **Calez les `durationInSeconds`** de chaque scène à l'oreille en écoutant votre export ElevenLabs (ex : le hook dure 3s dans l'audio → mettez `durationInSeconds: 3`).
5. **Enregistrez une nouvelle composition dans `src/Root.tsx`** : dupliquez le bloc `<Composition id="USDShort" ... />`, changez `id` (ex: `"USDShort_MonArticle"`) et `defaultProps` (importez vos nouvelles données).
6. **Prévisualisez** : `npm start`, sélectionnez votre composition dans Remotion Studio.
7. **Rendez** :
   ```bash
   npx remotion render MonNouvelId out/mon-article.mp4
   ```

## Les 5 types de scènes disponibles

| Type    | Usage                                             | Accent couleur |
|---------|----------------------------------------------------|----------------|
| `hook`  | Phrase choc d'ouverture                            | Braise (orange)|
| `stat`  | Un chiffre-clé sourcé                              | Alerte (ambre) |
| `point` | Un conseil/geste numéroté (ex : les 3 piliers LMU) | Végétal (sauge)|
| `quote` | Citation OH (fondateur / expert LMU)               | Blanc chaud    |
| `cta`   | Écran de fin, appel à l'action                     | Braise (orange)|

Le schéma complet (champs obligatoires par type de scène) est dans `src/schema.ts` — Remotion Studio affiche automatiquement un formulaire pour éditer les props sans toucher au code.

## 🔗 Automatisation (n8n → GitHub Actions)

Le rendu peut être déclenché à distance depuis n8n, sans passer par votre machine.

**Pièces fournies :**
- `.github/workflows/render.yml` — rendu déclenché par `repository_dispatch` (event `render-short`) ou manuellement via l'onglet Actions.
- `n8n/usd-render-trigger.workflow.json` — workflow n8n prêt à importer (Webhook → appel API GitHub → réponse).

**Mise en place (une fois) :**

1. Poussez ce projet sur un repo GitHub (le rendu se fait sur les runners GitHub, pas dans votre sandbox — leur accès réseau n'est pas restreint comme celui-ci).
2. Créez un **Personal Access Token** GitHub avec le scope `repo` + `workflow` (fine-grained : permissions *Contents* et *Actions* en écriture sur ce repo).
3. Dans n8n : **Settings → Credentials → New → Header Auth**, nom `Authorization`, valeur `Bearer <votre_token>`.
4. Importez `n8n/usd-render-trigger.workflow.json` (Settings → Import from File), rattachez la credential créée au nœud HTTP Request, remplacez `VOTRE_ORG/usd-shorts-factory` par votre repo réel.
5. Activez le workflow n8n. L'URL de production sera `https://<votre-n8n>/webhook/usd-render-short`.

**Tester le déclenchement (sans n8n, pour valider la chaîne) :**

```bash
curl -X POST https://api.github.com/repos/VOTRE_ORG/usd-shorts-factory/dispatches \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d '{
    "event_type": "render-short",
    "client_payload": {
      "audioUrl": "https://url-publique-vers-votre-mp3-elevenlabs.mp3",
      "audioFileName": "mon-article.mp3",
      "compositionId": "USDShort",
      "props": { "fps": 30, "backgroundColor": "#14181C", "audioFileName": "mon-article.mp3", "captionsEnabled": true, "scenes": [ ... ] }
    }
  }'
```

Le MP4 rendu apparaît en artifact téléchargeable dans l'onglet **Actions** du repo, 2-5 minutes après.

⚠️ **Ce que je n'ai pas fait à ta place** : créer le repo GitHub, générer le token, connecter le compte n8n — ce sont des accès à toi, je ne peux pas les configurer depuis cette conversation. Je t'ai livré la mécanique, pas les identifiants.

## Rendu

```bash
npm run render     # rend la composition "USDShort" par défaut → out/video.mp4
npm run still       # capture une image fixe (miniature) → out/thumbnail.png
```

⚠️ **Le rendu vidéo nécessite Chromium headless**, téléchargé automatiquement par Remotion à la première utilisation. Si vous êtes sur un environnement réseau restreint (proxy d'entreprise, sandbox), cette étape peut échouer — dans ce cas, testez sur votre machine personnelle ou un runner CI standard (GitHub Actions, Remotion Lambda).

## Identité visuelle ("système Braise")

Tokens couleur/typo centralisés dans `src/theme.ts` — ne pas dupliquer les valeurs ailleurs, toujours importer `theme`. Logique du choix expliquée en commentaire dans ce fichier (fond sombre non-criard, accent braise plutôt que rouge alarme, vert désaturé pour éviter toute lecture "treillis militaire" — cohérent avec la ligne éditoriale USD).

## Pistes d'évolution (v2, pas construites ici)

- **Légendes mot-par-mot ("karaoké")** : nécessite les timestamps mot-par-mot d'ElevenLabs (disponibles via leur API) ou un alignement forcé (Whisper). Le gabarit actuel affiche des légendes par scène, pas par mot — suffisant pour la lisibilité, moins spectaculaire qu'un karaoké.
- **Calcul automatique des durées de scène** à partir de la longueur réelle du fichier audio (`@remotion/media-utils`), au lieu de les régler à l'oreille.
- **Rendu automatisé** : brancher ce projet à votre stack n8n existante (article publié → génération des données de scène → rendu Remotion Lambda → publication auto sur TikTok/YouTube).
- **Déclinaison YouTube longue** (16:9) : le gabarit est actuellement 100% vertical ; un second jeu de compositions 1920×1080 serait nécessaire pour du contenu horizontal.
