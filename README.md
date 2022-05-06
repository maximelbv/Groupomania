![image](https://user-images.githubusercontent.com/58565963/167067876-6ca58ea7-0917-410b-a1de-21e14bda7427.png)

7ème projet du parcours Développeur Web d'Open Classrooms

Réseau social interne pour l'entreprise Groupomania. Il permettra à sa mise en production de proposer un espace numérique pour les employés de l'entreprise pour qu'ils puissent se connaître dans un cadre plus informel.

## Requirements

- Node JS version 17.1.0 (version de dev)

## Installation

Pour installer le projet sur votre machine, suivez les instructions: 

### Installer le modèle de base de données :

- Ouvrez votre gestionnaire de base de données (phpMyAdmin par exemple)
- à la racine, entrez la commande suivante 

```bash
CREATE DATABASE IF NOT EXISTS groupomania;
```

- En rechargeant votre gestionnaire, vous devriez voir apparaître la nouvelle bas de données 'groupomania'
- Copiez le code de 'groupomania.sql' (dans le dossier du projet) et exécutez le dans la base de données qui vient d'être créée. (onglet 'SQL')

En rechangeant votre gestionnaire, vous devriez voir apparaître la base 'groupomania' avec ses tables.

### Installer le projet
- Clonez ce repository 
- ouvrez un terminal à la racine du projet et entrez les commandes  à la suite

```bash
  cd back
  npm install
  npm start
```

- ouvrez un deuxième terminal et entrez les commandes à la suite 

```bash
  cd front
  npm install
  npm start
```


Le projet devrait se lancer sur le port http://127.0.0.1:3000
