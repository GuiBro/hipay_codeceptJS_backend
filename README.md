# HiPay - Test Technique Automatisation API

Ce projet contient l'automatisation des tests pour l'API **Cloud API for Nepting**. Il utilise **CodeceptJS** avec le helper **REST** et suit le modèle **Page Object** pour une meilleure maintenance.  
Ce README est constitué d'une partie **Analyse et Stratégie** (la section de réponse aux questions), puis d'une procédure d'**Installation et de lancement des tests**.
  
## Analyse et Stratégie  

### 1. Périmètre des tests  
Pour valider le bon fonctionnement de l'API, je propose une approche visant à se concentrer sur la **fiabilité fonctionnel** du tunnel de paiement et sa robustesse en terme de **cybersécurité**, face à des sollicitations incorrectes ou malveillantes.

### A. Tests fonctionnels  
Validation du flux nominal : Automatisation d'une commande complète et d'une commande avec informations obligatoires uniquement. L'objectif est de confirmer la réception d'un code 200 OK et de la réponse attendue.

Intégrité des données : Vérification de la gestion des erreurs côté serveur lorsqu'un champ obligatoire est manquant (ex: absence de l'order_id) ou mal formé (ex: montant négatif), attendant une 400 Bad Request.

Disponibilité du service : Test du point de terminaison /healthcheck pour s'assurer que l'API est prête, ou non, à traiter des requêtes.

Cas aux limites : Tester des flux nominaux constitués de certaines valeurs avec un nombre maximal de caractères autorisé, et d'autres avec des caractères numériques et spéciaux.

### B. Tests de sécurité  

Injections (SQL/NoSQL/Command) : Tester l'envoi de caractères spéciaux ou de requêtes structurées dans les champs de texte (ex: order_id contenant ' OR 1=1 --') pour vérifier que le backend neutralise correctement les entrées utilisateur.

Authentification : Vérifier que l'API rejette les tentatives avec des en-têtes Authorization mal formés ou des identifiants erronés (401 Unauthorized).

Rate Limiting : Intégrer la mise en place d'un mécanisme de limitation du nombre de requêtes pour bloquer les tentatives répétées de découverte de mot de passe.

Blacklisting : Créer un persona qui soit interdit d'utiliser l'API (ex: via l'order_id), afin de tester l'efficacité du filtrage (403 forbidden).

Stack trace : S'assurer qu'en cas d'erreur 500, l'API ne renvoie pas de données sensibles sur l'infrastructure interne dans le corps de la réponse.

Test du timeout : Vérifier que l'API renvoie bien une erreur serveur au bout de 10 secondes entre l'appel et la réponse (504 Gateway Timeout). Difficile à automatiser, car nécessité de préparer une API custom.

### 2. Stratégie de test et d'automatisation  

L'architecture du code doit reposer sur la création d'un framework pérenne, capable de s'intégrer dans un pipeline de livraison continue (CI/CD).

### A. Choix technologiques et méthodologiques  
Utilisation de Gherkin : Cette approche permet de transformer des exigences métier en tests exécutables. Elle facilite la relecture par des profils non-techniques (PO, BA, etc) tout en servant de documentation.

Variabilisation des jeux de données : l'approche "Scenario Outline" dans Gherkin permet de faire varier les JDD tout en restant très lisible

Page Object Model (POM) : J'ai centralisé la logique technique (URL, headers, construction des payloads) dans une classe dédiée (OrderApi.js). Le modèle Objet garantit que si l'API évolue (ex: changement d'endpoint), la maintenance ne se fait qu'à un seul endroit, sans impacter les scénarios de tests.

Utilisation de tags : permet de nommer et cibler certains scénario pour tester indépendemment. Tags à ajouter au dessus de chacun d'eux (@success, @error, etc)

### B. Sélection des scénarios automatisés  
Pour ce test technique, j'ai sélectionné quatres scénarios représentatifs des tests API :

* **Scénarios de succès (@success) :** Valide l'envoi d'une commande nominale. J'y ai constitué deux cas de test pour faire varier certaines valeurs
* **Scénario d'erreur de format (@error_badrequest) :** Vérifie que l'API rejette les requêtes sans `order_id` (400).
* **Scénario de sécurité (@security_notauthenticated) :** Vérifie le rejet des accès non authentifiés (401).

> **Note technique :** Par défaut, les tests retournent une **401 Unauthorized** car ils utilisent des identifiants de test (`login:password`) à encoder en base64. Tous les scénarios terminent donc en FAIL, sauf le dernier qui attend une erreur 401.

### C. Reporting  

Allure Reporting : Mise en place d'un rapport visuel détaillé. Chaque exécution génère un historique complet incluant les requêtes JSON envoyées et les réponses reçues.

Qualité logicielle : Intégration d'un Linter (ESLint V9) pour assurer la propreté du code.


### Architecture du projet

* `features/` : Fichiers Gherkin définissant les scénarios métier.
* `pages/` : Page Objects contenant la logique technique de l'API (URLs, payloads).
* `step_definitions/` : Traduction des phrases Gherkin en code JavaScript.
  
## Procédure technique

### Installation

* S'assurer d'avoir [Node.js](https://nodejs.org/) installé
* Clonez le dépôt et installez les dépendances :

```bash
npm install
```

### Lancement des tests

J'ai configuré un script dans le `package.json` pour supprimer les anciens fichiers Allure (rimraf) et lancer les tests :

```bash
npm run test
```

### Rapports

* **HTML Report :** Un rapport statique est généré après chaque test dans le dossier `output/report.html`.
* **Allure Report :** Pour une analyse détaillée (avec les détails des requêtes/réponses JSON), utilisez
```bash
allure serve allure-results
```
