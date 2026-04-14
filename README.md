# HiPay - Test Technique Automatisation API

Ce projet contient l'automatisation des tests pour l'API **Cloud API for Nepting (HiPay)**. Il utilise **CodeceptJS** avec le helper **REST** et suit le modèle **Page Object (POM)** pour une meilleure maintenance.

## 🚀 Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé, puis clonez le dépôt et installez les dépendances :

```bash
npm install
```

## 🧪 Stratégie de Test

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

