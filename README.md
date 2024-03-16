# Kryptik 2024: Mari Angryneers / Angrynieurs Mari

Welcome! This repository contains all source code (and some documentation) for the 2023-24 Marianopolis Robotics website created for CRC Kryptik 2024, based on Rovio Entertainment's game *Angry Birds*. See [Tech stack](#tech-stack--stack-technique) for more information about the technology used.

---

Bienvenue! Vous trouverez dans ce dépôt tout le code source (et un peu de documentation) pour le site web de Robotique Marianopolis 2023-24 créé pour CRC Kryptik 2024, basé sur le jeu *Angry Birds* de *Rovio Entertainment*. Voir la section [Stack technique](#tech-stack--stack-technique) pour plus d'informations sur les technologies utilisées.

## Table of contents / Table des matières

- [Note on CSS validation / Note sur la validation CSS](#note-on-css-validation--note-sur-la-validation-css)
- [Tech stack / Stack technique](#tech-stack--stack-technique)
- [File structure / Structure des fichiers](#file-structure--structure-des-fichiers)

![Mari Angryneers logo / Logo des Angrynieurs Mari](static/favicon.svg)

## Note on CSS validation / Note sur la validation CSS

While the Jigsaw CSS validator may show warnings regarding Bootstrap's CSS variables and vendor prefixes, these are in fact standard practice for web developers to ensure cross-compatibility of a website across several browsers, especially older and buggy browsers. Bootstrap also uses "CSS browser hacks in several places to target special CSS to certain browser versions in order to work around bugs in the browsers themselves," which gives validation warnings that are insignificant in practice (partially taken from <https://getbootstrap.com/docs>). [Consult the official Bootstrap documentation for details.](https://getbootstrap.com/docs/5.3/getting-started/browsers-devices/#validators)

We also discovered that the CSS validator does not recognize perfectly valid CSS3 features, such as the [`rotate`](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate) and [`translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/translate) properties. We tried to replace these with the [`transform` property](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) and the `rotate()` and `translate()` CSS functions to achieve our desired functionality, but they did not work.

---

Malgré les avertissements de validation affichés par le validateur CSS Jigsaw concernant les variables CSS et les préfixes vendeurs utilisés par Bootstrap, ceux-ci constituent en réalité une pratique standard dans le développement web et assurent la compatibilité d'un site web avec plusieurs navigateurs, surtout les navigateurs anciens et bogués. Bootstrap implémente en plus des hacks de navigateur CSS qui ciblent du CSS spécial sur certaines versions de navigateur afin de contourner des bogues dans les navigateurs eux-mêmes, provoquant des avertissements de validation qui n'ont pas d'importance dans la pratique (extrait tiré, traduit et reformulé de <https://getbootstrap.com/docs>). [Consultez la documentation officielle de Bootstrap pour plus de détails (en anglais).](https://getbootstrap.com/docs/5.3/getting-started/browsers-devices/#validators)

Nous avons également découvert que le validateur CSS ne reconnaît pas plusieurs fonctionnalités CSS3 parfaitement valides, par exemple les propriétés [`rotate`](https://developer.mozilla.org/fr/docs/Web/CSS/rotate) et [`translate`](https://developer.mozilla.org/fr/docs/Web/CSS/translate). Nous avons tenté de les remplacer par la [propriété `transform`](https://developer.mozilla.org/fr/docs/Web/CSS/transform) et par les fonctions CSS `rotate()` et `translate()` pour obtenir les fonctionnalités désirées, mais sans succès.

## Tech stack / Stack technique

- Svelte(Kit): a JavaScript web framework
- Bootstrap: a modern, responsive, mobile-first front-end CSS framework
- Git and GitHub: version control
  - `main` branch: source code in Svelte
  - `static-build` branch: static export code

---

- Svelte(Kit): un framework web JavaScript
- Bootstrap: un framework CSS moderne pour le développement front-end adaptatif et « *mobile-first* »
- Git et GitHub: contrôle des versions
  - Branche `main`: code source écrit avec Svelte
  - Branche `static-build`: code statique exporté

### File structure / Structure des fichiers

- `src`: most of our code can be found here!
  - `src/lib/components`: reusable Svelte components
  - `src/lib/routes`: the routes/pages of our website
  - `src/lib/assets`: assets that are imported and optimized by Vite
  - Remaining `src/lib` files: JavaScript utilities for 3D elements, global stylesheet, Svelte store for user-inputted data
- `static`: assets that are used directly without Vite handling
- Other files: configurations for package manager (npm), dependencies, linting, Vite, Svelte, Git; also this README :)

Don't forget to check out the website!

---

- `src`: la majorité de notre code se trouve ici!
  - `src/lib/components`: composants Svelte réutilisables
  - `src/lib/routes`: les routes/pages de notre site web
  - `src/lib/assets`: ressources infographiques importées et optimisées par Vite
  - Fichiers restants dans `src/lib`: utilitaires JavaScript pour les éléments 3D, feuille de style globale, *store* Svelte pour les données saisies par l'utilisateur
- `static`: ressources infographiques utilisées, sans gestion par Vite
- Autres fichiers: configurations pour le gestionnaire de paquets (npm), dépendances, le linting, Vite, Svelte, Git; et bien sûr ce README :)

N'oubliez pas d'explorer le site web!

---

[Back to Table of contents / Retour à la table des matières](#table-of-contents--table-des-matières)
