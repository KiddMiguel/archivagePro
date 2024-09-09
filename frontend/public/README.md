# ArchiDrive

ArchiDrive est une plateforme de gestion de fichiers sécurisée et intuitive conçue pour les cabinets d'architectes. Elle permet de stocker, organiser et gérer les fichiers des clients de manière efficace.

## Introduction

ArchiDrive utilise une architecture de microservices avec ReactJS, NodeJS et MongoDB. Cette plateforme permet aux utilisateurs de s'inscrire, de se connecter, de gérer leurs fichiers et d'acheter des espaces de stockage supplémentaires.

## Architecture

Le projet est structuré en plusieurs microservices :

- **API Gateway** : Point d'entrée pour tous les services.
- **User Service** : Gère l'authentification et les profils des utilisateurs.
- **File Service** : Gère le stockage et la gestion des fichiers (en développement).
- **Billing Service** : Gère les paiements et les abonnements (en développement).
- **Stats Service** : Fournit des statistiques sur l'utilisation des fichiers (en développement).
- **Frontend** : Interface utilisateur développée avec ReactJS.

## Endpoints

### User Service

- **POST /register** : Inscription d'un nouvel utilisateur.
- **POST /login** : Connexion d'un utilisateur.
- **GET /profile** : Récupération des informations du profil de l'utilisateur.
- **PUT /profile** : Mise à jour du profil de l'utilisateur.
- **DELETE /profile** : Suppression du profil de l'utilisateur.
- **GET /users** : Récupération de tous les utilisateurs (admin uniquement).
- **PUT /password** : Modification du mot de passe de l'utilisateur.
- **GET /logout** : Déconnexion de l'utilisateur.
- **GET /test** : Route de test pour vérifier le bon fonctionnement du service.

## Authentication

Toutes les routes (sauf l'inscription et la connexion) nécessitent un jeton JWT pour l'authentification. Utilisez le middleware `verifyToken` pour protéger ces routes.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/archidrive.git
   cd archidrive
