# Eval API

Ce projet est une API développée par Kylian Patry. Voici une description des différents fichiers et dossiers présents dans ce projet.

## Structure du projet

- **.env** : Fichier de configuration des variables d'environnement.
- **.gitignore** : Fichier spécifiant les fichiers et dossiers à ignorer par Git.
- **.prettierrc** : Fichier de configuration pour Prettier.
- **app.js** : Point d'entrée de l'application Express.
- **bin/** : Contient le script pour démarrer le serveur.
  - **www** : Script pour démarrer le serveur HTTP.
- **middleware/** : Contient les middlewares de l'application.
  - **verify_is_admin.js** : Middleware pour vérifier si l'utilisateur est administrateur.
  - **verify_jwt_token.js** : Middleware pour vérifier le token JWT.
- **model/** : Contient les modèles de données Sequelize.
  - **Cart.js** : Modèle de données pour les paniers.
  - **index.js** : Fichier d'index pour les modèles.
  - **Order.js** : Modèle de données pour les commandes.
  - **Product.js** : Modèle de données pour les produits.
  - **ProductInCart.js** : Modèle de données pour les produits dans les paniers.
  - **Tag.js** : Modèle de données pour les tags.
  - **User.js** : Modèle de données pour les utilisateurs.
- **orm.js** : Configuration de l'instance Sequelize.
- **package.json** : Fichier de configuration des dépendances du projet.
- **public/** : Contient les fichiers statiques.
  - **images/** : Dossier pour les images.
  - **javascripts/** : Dossier pour les fichiers JavaScript.
  - **stylesheets/** : Dossier pour les fichiers CSS.
    - **style.css** : Fichier de style CSS.
- **routes/** : Contient les définitions des routes de l'API.
  - **admin.js** : Routes liées à l'administration.
  - **auth.js** : Routes liées à l'authentification.
  - **index.js** : Route de la page d'accueil.
  - **products.js** : Routes liées aux produits.
  - **tags.js** : Routes liées aux tags.
  - **users.js** : Routes liées aux utilisateurs.
- **ReadMe.md** : Ce fichier. Contient des informations sur le projet.

## Recupérer le repository

Pour récupérer le repository, exécutez la commande suivante:

```bash
git clone https://github.com/Ky-oo/eval-api.git
```

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```bash
npm install
```

## Utilisation

Pour démarrer l'application, utilisez la commande suivante :

```bash
npm start
```

## Auteur

Kylian Patry

## Licence

Ce projet est sous licence MIT.
