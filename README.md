# Villers Expresse

Application de livraison locale pour Villers-Cotterêts, connectée à Supabase.

## Installation locale

```bash
npm install
npm run dev
```

## Déploiement sur Vercel

1. Pousser ce dossier sur GitHub (dans le repo `mohr0289/Livraison-Villers-cotteret-`)
2. Sur vercel.com → "New Project" → importer le repo
3. Vercel détecte automatiquement Vite. Cliquer sur "Deploy"

## Base de données

Connecté au projet Supabase "Livraison Villers Cotteret" (voir `src/supabaseClient.js`).

Tables utilisées : `commerces`, `produits`, `commandes`, `commande_produits`.

⚠️ Vérifie que la table `produits` a bien une colonne `commerce_id` (clé étrangère vers `commerces.identifiant`). Si le nom est différent, ajuste-le dans `src/components/ShopList.jsx` ligne avec `.eq('commerce_id', ...)`.
