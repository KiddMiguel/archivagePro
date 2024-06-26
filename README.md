# ArchivaPro

**ArchivaPro** est une application innovante et sécurisée de gestion de fichiers destinée aux cabinets d'architectes. Conçue pour faciliter la collaboration et la gestion de documents, ArchivaPro offre une interface utilisateur réactive et intuitive, construite avec ReactJS, garantissant une expérience utilisateur fluide et moderne.

## Fonctionnalités principales

1. **Gestion des Utilisateurs :**
   - Inscription et connexion sécurisées avec authentification JWT.
   - Gestion des profils utilisateurs avec la possibilité de modifier les informations personnelles et de changer le mot de passe.
   - Attribution et gestion des rôles (administrateur, utilisateur standard, invité).

2. **Gestion des Fichiers :**
   - Téléversement de fichiers facile avec support du glisser-déposer.
   - Organisation des fichiers par projets et catégories pour une navigation simplifiée.
   - Prévisualisation intégrée des fichiers (images, PDFs, documents) pour un accès rapide et pratique.
   - Téléchargement et partage sécurisé de fichiers avec des permissions personnalisées.
   - Système de tagging et de recherche avancée pour une localisation rapide des documents.

3. **Collaboration et Partage :**
   - Espaces de travail collaboratifs pour faciliter la coopération entre architectes et clients.
   - Système de permissions détaillé pour contrôler l'accès aux fichiers et dossiers.
   - Fonctionnalités de commentaires et annotations sur les documents pour des retours précis et efficaces.
   - Notifications en temps réel pour les mises à jour de fichiers, commentaires et autres activités.

4. **Sécurité et Conformité :**
   - Chiffrement des données et des communications via HTTPS pour garantir la confidentialité et la sécurité.
   - Validation des données côté serveur pour prévenir les injections et autres attaques.
   - Limitation du taux de requêtes pour se prémunir contre les attaques par déni de service (DoS).
   - Audit logs pour suivre les activités critiques et assurer la conformité avec les réglementations sur la protection des données.

5. **Déploiement et Intégration :**
   - Déploiement facile sur des plateformes comme Heroku ou Netlify, avec support des environnements de développement, de test et de production séparés.
   - Intégration avec des systèmes externes via une API RESTful bien documentée.
   - Utilisation de GitHub Actions ou Travis CI pour l'intégration continue et le déploiement continu (CI/CD).

## Prérequis

- Node.js et npm installés sur votre machine.
- MongoDB pour la base de données. MongoDB Atlas recommandé pour une solution cloud.

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/KiddMiguel/archivapro.git
   cd archivapro
   ```

2. Installez les dépendances pour le front-end et le back-end :

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Configurez les variables d'environnement en créant un fichier `.env` dans le dossier `server` avec les informations suivantes :

   ```plaintext
   PORT=5000
   MONGO_URI=<votre_mongo_uri>
   JWT_SECRET=<votre_secret_jwt>
   ```

## Lancer l'application

1. Lancer le serveur back-end :

   ```bash
   cd server
   npm start
   ```

2. Lancer le front-end :

   ```bash
   cd client
   npm start
   ```

3. Ouvrez votre navigateur et allez sur `http://localhost:3000`.

## Contribution

Les contributions sont les bienvenues ! Veuillez suivre les étapes ci-dessous pour contribuer :

1. Forker le projet
2. Créez votre branche feature (`git checkout -b feature/nouvelle-feature`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez votre branche (`git push origin feature/nouvelle-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

Pour toute question ou suggestion, veuillez contacter [emailIpssi@example.com](mailto:emailIpssi@example.com).
# archivagePro
