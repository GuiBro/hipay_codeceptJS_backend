# HiPay - Test Technique Automatisation API

Ce projet contient l'automatisation des tests pour l'API **Cloud API for Nepting**. Il utilise **CodeceptJS** avec le helper **REST** et suit le modèle **Page Object** pour une meilleure maintenance.

## Installation

* S'assurer d'avoir [Node.js](https://nodejs.org/) installé
* Clonez le dépôt et installez les dépendances :

```bash
npm install
```

## Analyse et Stratégie (section de réponse)

<details>
<summary><b>1. Analyse des cas à tester (Cliquez pour dérouler)</b></summary>

1. Périmètre des tests
Pour valider le bon fonctionnement de l'API, mon approche serait de se concentrer sur la **fiabilité fonctionnel** du tunnel de paiement et la robustesse du backend en terme de **cybersécurité**, face à des sollicitations incorrectes ou malveillantes.

A. Tests fonctionnels
Validation du flux nominal : Automatisation d'une commande complète et avec seulement les informations obligatoires (order_id, amount, currency, serial_number, etc). L'objectif est de confirmer la réception d'un code 200 OK et d'un statut de paiement cohérent.

Intégrité des données : Vérification de la gestion des erreurs côté serveur lorsqu'un champ obligatoire est manquant (ex: absence de l'order_id) ou mal formé (ex: montant négatif), attendant une 400 Bad Request.

Disponibilité du service : Test du point de terminaison /healthcheck pour s'assurer que l'API est prête à traiter des requêtes.

B. Tests de Sécurité

Injections (SQL/NoSQL/Command) : Tester l'envoi de caractères spéciaux ou de requêtes structurées dans les champs de texte (ex: order_id contenant ' OR 1=1 --') pour vérifier que le backend neutralise correctement les entrées utilisateur.

Force Brute & Gestion de l'Authentification : Vérifier que l'API rejette les tentatives avec des en-têtes Authorization mal formés ou des identifiants erronés (401 Unauthorized).

Recommandation Stratégique : Intégrer la mise en place d'un mécanisme de "Rate Limiting" (limitation du nombre de requêtes) pour bloquer les tentatives répétées de découverte de mot de passe.

Exposition de données sensibles : S'assurer qu'en cas d'erreur 500, l'API ne renvoie pas de "Stack Trace" (traces de code) ou d'informations sur l'infrastructure interne dans le corps de la réponse.

2. Stratégie de test et d'automatisation

L'architecture du code doit reposer sur la création d'un framework pérenne, capable de s'intégrer dans un pipeline de livraison continue (CI/CD).

A. Choix technologiques et méthodologiques
Utilisation de Gherkin : Cette approche permet de transformer des exigences métier en tests exécutables. Elle facilite la relecture par des profils non-techniques (PO, BA, etc) tout en servant de documentation vivante.

Page Object Model (POM) : J'ai centralisé la logique technique (URLs, headers, construction des payloads) dans des classes dédiées (OrderApi.js). Cela garantit que si l'API évolue (ex: changement d'endpoint), la maintenance ne se fait qu'à un seul endroit, sans impacter les scénarios de tests.

Tests d'Intégration API : Contrairement aux tests UI, ces tests sont extrêmement rapides et stables. Ils permettent un feedback immédiat sur l'état du Backend Nepting.

B. Sélection des scénarios automatisés (POC)
Pour ce test technique, j'ai sélectionné et mis en œuvre les scénarios les plus critiques, représentatifs de la robustesse du connecteur :

Validation du succès d'authentification et de format : Envoi d'un payload complet pour valider la structure de communication (CodeceptJS -> Nepting).

Validation de la sécurité d'accès : Un scénario dédié à l'échec d'authentification (@security) pour confirmer que l'API protège ses ressources contre les accès non autorisés.

Validation de la robustesse des données : Un scénario testant l'absence d'identifiant de commande pour vérifier la pertinence des messages d'erreur du serveur.

C. Reporting et Observabilité
Allure Reporting : Mise en place d'un rapport visuel détaillé. Chaque exécution génère un historique complet incluant les requêtes JSON envoyées et les réponses reçues, facilitant le travail de debug pour les développeurs en cas de régression.

Qualité logicielle : Intégration d'un Linter (ESLint) pour assurer la propreté du code et d'un script de nettoyage automatisé du répertoire de résultats pour éviter toute pollution des rapports de test.

Les 

Les tests sont rédigés en **Gherkin (BDD)** pour assurer une communication claire entre les équipes techniques et métier.
* **Scénario de succès (@success) :** Valide l'envoi d'une commande avec les champs obligatoires.
* **Scénario d'erreur (@error) :** Vérifie que l'API rejette les requêtes sans `order_id` (400).
* **Scénario de sécurité (@security) :** Vérifie le rejet des accès non authentifiés (401).

> **Note technique :** Par défaut, les tests retournent une **401 Unauthorized** car ils utilisent des identifiants de test (`login:password`). Le framework est configuré pour supporter le **Basic Auth** dès que des clés privées valides sont fournies.

## 🛠 Lancement des tests

J'ai configuré plusieurs scripts dans le `package.json` pour simplifier l'exécution :

| Commande | Action |
| :--- | :--- |
| `npm run clean` | Purge les anciens résultats dans `allure-results`. |
| `npm run test:api` | Nettoie les résultats et lance uniquement les tests API. |
| `npm run report` | Génère et ouvre le rapport Allure. |

**Exemple d'exécution complète :**
```bash
npm run test:api
npm run report
```

## 📊 Rapports

* **HTML Report :** Un rapport statique est généré après chaque test dans le dossier `output/report.html`.
* **Allure Report :** Pour une analyse détaillée (avec les détails des requêtes/réponses JSON), utilisez `npm run report`.

## 📁 Architecture du projet

* `features/` : Fichiers Gherkin définissant les scénarios métier.
* `pages/` : Page Objects contenant la logique technique de l'API (URLs, payloads).
* `step_definitions/` : Traduction des phrases Gherkin en code JavaScript.
* `clean-results.js` : Script utilitaire pour garantir la fraîcheur des rapports.

---

### 💡 Dernier conseil pour ton envoi :
Avant de zipper ou de pousser ton code :
1.  Vérifie une dernière fois que ton dossier `node_modules` est bien dans ton `.gitignore`.
2.  Assure-toi que le script `clean-results.js` est bien présent à la racine (celui qu'on a créé ensemble).
3.  Vérifie que ton `package.json` contient bien les scripts listés dans le tableau ci-dessus.

