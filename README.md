# JSQuiz_Advanced

## Contexte du projet
Après le prototype statique (JSQuizStarter), l’entreprise souhaite une version avancée et dynamique qui se rapproche d’une véritable application éducative moderne.

Cette application introduit de nouveaux concepts (modules ES6, async/await, charting, export de données) tout en consolidant les acquis du premier brief.

---

## Fonctionnalités principales
- **Chargement dynamique des données** :
  - Un fichier JSON par thématique (javascript, html, css, ...), chargé via `fetch` après le choix utilisateur.
- **Quiz dynamique** :
  - Affichage des questions et options générés en JS (aucune question codée en dur dans le HTML).
  - Gestion des questions à réponses multiples ou uniques.
  - Chronomètre par question et global.
  - Feedback visuel immédiat (bonne/mauvaise réponse).
- **Tableau de bord enrichi** :
  - Historique des parties stocké en localStorage (pseudo, score, date, thématique).
  - Statistiques calculées avec `map`, `filter`, `reduce`.
  - Nombre de parties jouées, score moyen, meilleur score, top 3 pseudos.
  - Visualisation graphique avec Chart.js (répartition, progression, etc).
- **Exports** :
  - Export de l’historique/statistiques en CSV et JSON.
- **Bonus** :
  - Reprendre une partie interrompue.

---

## Contraintes techniques
- Projet uniquement en **HTML, CSS, JS** (pas de frameworks, Chart.js autorisé).
- Utilisation obligatoire des concepts modernes JS (ES6+):
  - Modules (quiz.js, ui.js, storage.js, stats.js, charts.js...)
  - Fonctions fléchées, destructuring, template literals
  - Méthodes avancées (map, filter, reduce, some, every)
  - Async/await avec gestion d’erreurs (try/catch)
- Code clair, factorisé (DRY), bien commenté.
- Interface claire, responsive, avec indicateurs visuels (progress bar, feedback couleurs).

---

## Structure du projet
- **index.html** : Point d’entrée, structure de base.
- **assets/css/** : Styles CSS (modulaire et responsive).
- **modules/** :
  - `quiz.js` : Logique du quiz, navigation, timer, gestion des réponses.
  - `ui.js` : Affichage dynamique, gestion des modals, feedback visuel.
  - `storage.js` : Gestion du localStorage, historique, reprise de partie.
  - `stats.js` : Calculs statistiques (map, filter, reduce).
  - `charts.js` : Génération des graphiques avec Chart.js.
- **data/** : Fichiers JSON par thématique (html.json, css.json, javascript.json...)

---


## Utilisation
- Choisir une thématique (HTML, CSS, JS...)
- Répondre aux questions du quiz (avec timer)
- Visualiser les résultats et statistiques dans le dashboard
- Exporter les stats en CSV/JSON
- Reprendre une partie ou réviser les erreurs (bonus)

---

## Lien GitHub Pages
- [Lien vers l’application en ligne](https://ibrahim-lmlilas.github.io/JSQuiz_Advanced/)

---

## Critères de performance
- Quiz chargé dynamiquement depuis un JSON externe
- Navigation et affichage JS
- Gestion du temps (question + global)
- Historique persistant en localStorage
- Dashboard avec stats calculées (map, filter, reduce)
- Visualisation des stats avec Chart.js
- Export CSV/JSON
- Architecture modulaire (ES6+)
- Interface ergonomique, responsive et claire
- Application déployée sur GitHub Pages

---


