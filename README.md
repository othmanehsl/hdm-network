📌 Application de Gestion de Tâches (Full-Stack)

Bienvenue dans l'application de gestion de tâches ! Il s'agit d'une application full-stack construite avec NestJS pour le backend, Prisma pour la gestion de la base de données, et React pour le frontend.

Cette application permet aux utilisateurs de créer, modifier, supprimer et organiser leurs tâches efficacement avec une interface optimisée en UX/UI.

🚀 Technologies utilisées

🖥️ Frontend

React.js – Composants réutilisables et gestion d'état efficace

CSS – Stylisation et amélioration de l'expérience utilisateur

🛠 Backend

NestJS – Framework backend structuré et modulaire

Prisma ORM – Gestion de la base de données MySQL

MySQL – Base de données relationnelle

📌 Fonctionnalités principales

✅ Gestion des tâches

Créer une tâche avec :

Nom

Description

Date d'échéance

Heure

État (À faire, En cours, Terminé)

Afficher une liste des tâches enregistrées

Modifier une tâche via une modal popup intuitive

Supprimer une tâche définitivement

Trier les tâches par état

🏗️ Installation et configuration

📌 Prérequis

Node.js (v16+ recommandé)

MySQL installé et configuré

Prisma installé globalement (optionnel)

🔧 Installation


Installez les dépendances :

# Backend
cd backend
npm install

# Frontend
cd frontend
npm install

🔌 Configuration de la base de données

Modifier le fichier .env dans le dossier backend et ajoutez :

DATABASE_URL="mysql://user:password@localhost:3306/nom_de_la_base"

Appliquez les migrations Prisma :

npx prisma migrate dev --name init

🚀 Démarrer l'application

📡 Démarrer le backend :

npm run start

🌐 Démarrer le frontend :

yarn dev

L'application sera disponible sur : http://localhost:5173

🎨 Améliorations UX/UI

Formulaire enrichi : ajout de la date, heure et état des tâches

Design moderne avec CSS

Popup modal pour l'édition des tâches

Transitions fluides pour une meilleure expérience utilisateur

🏆 Améliorations futures

Authentification utilisateur (gestion des utilisateurs et sessions)

Ajout de priorités aux tâches

Notifications et rappels pour les échéances
