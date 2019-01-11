# README

## Table of Contents

- [README](#readme)
  - [Table of Contents](#table-of-contents)
  - [Liens du projet](#liens-du-projet)
  - [Sepcs](#sepcs)
  - [Organisation du dépôt](#organisation-du-d%C3%A9p%C3%B4t)
  - [Modules](#modules)

## Liens du projet

La docuemntation de l'API se trouve en format .json ou .html dans le dossier doc/
ou directement à l'adresse suivante :
[Lien vers la documentation](http://julien.pilleux.emi.u-bordeaux.fr/doc/doc.html)

Le site est hébergé sur Heroku et est à l'adresse suivante :
[Lien vers le site](https://collab-lab.herokuapp.com/)

## Sepcs

- Base de données : mongodb, mlab

La base de données est une base mongoDB hébergée en ligne sur le site mlab et
comporte les collections suivantes :

> _User_
> | username | password | labs |
> | :------: | :------: | :---: |

## Organisation du dépôt

```
  ProjetWeb
  |
  ├── doc/
  |
  ├── src/
  |    |
  |    ├── css/
  |    |
  |    ├── jsx/
  |    |
  |    ├── server/
  |    |     |
  |    |     ├── controllers/
  |    |     |
  |    |     ├── models/
  |    |     |
  |    |     └── routes/
  |    |
  |    └── public/
  |
  └── tests/
```

- doc : La documentation de l'API interne
- src : Code source du projet
  - views : templates ejs
  - models : partie back du projet (serveur node.js)
  - public : partie front du projet (pages html)
- tests : fichiers de test du projet
- resources : resources du projet (packages etc...)

## Modules

- express
- mongoose
- react
- Bootstrap 4
