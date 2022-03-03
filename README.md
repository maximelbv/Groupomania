# Groupomania 

7ème projet du parcours Développeur Web d'Open Classrooms

Réseau social interne pour l'entreprise Groupomania. Il permettra à sa mise en production de proposer un espace numérique pour les employés de l'entreprise pour qu'ils puissent se connaître dans un cadre plus informel.

## Requirements

- Node JS version 17.1.0 (version de dev)

## Installation

Pour installer le projet sur votre machine, suivez les instructions: 

### Installer le modèle de base de données :

- Copiez l'intégralité du code contenu dans 'groupomania.sql'
- Ouvrez votre gestionnaire de base de données (phpMyAdmin par exemple)
- Collez le code de 'groupomania.sql' et exécutez le à la racine

En rechangeant votre gestionnaire, vous devriez voir apparaître la base 'groupomania' avec ses tables.

### Installer le projet
- Clonez ce repository 
- ouvrez un terminal à la racine du projet et entrez les commandes  à la suite

```bash
  cd back
  npm install
  npm start
  cd ..
  cd front
  npm install
  npm start
```

Le projet devrait se lancer sur le port http://127.0.0.1:3000
