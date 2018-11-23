# README

## Table of Contents

- [README](#readme)
  - [Table of Contents](#table-of-contents)
  - [Sepcs](#sepcs)
  - [Organisation du dépôt](#organisation-du-d%C3%A9p%C3%B4t)
  - [Modules](#modules)
  - [Installation](#installation)
  - [Utilisation](#utilisation)
  - [Enoncé](#enonc%C3%A9)
  - [Sujet](#sujet)
    - [Sujet du prof](#sujet-du-prof)
    - [Modalités](#modalit%C3%A9s)
    - [Api tierce](#api-tierce)

## Sepcs

- Base de données : mongodb, mlab
- travis
- sonarcloud

## Organisation du dépôt

```
  ProjetWeb
  |
  +---src/
  |    |
  |    +---views/
  |    |
  |    +---models/
  |    |
  |    +---public/
  |
  +---tests/
  |
  +---resources/
```

- src : Code source du projet
  - views : templates ejs
  - models : partie back du projet (serveur node.js)
  - public : partie front du projet (pages html)
- tests : fichiers de test du projet
- resources : resources du projet (packages etc...)

## Modules

- express
- react

## Installation

TODO

## Utilisation

TODO

## Enoncé

Réaliser une app web avec un front avec un frameword genre _React_, _Angular_,
_Vue_. Le front est une single app qui doit faire des requêtes asynchrones
(js) sur un backend pour récupérer des données. Nous devons aussi implémenter
le back end. Ce back doit être fait en jersey ou en node (API rest doccumenté
en swagger). Le back gère la persistence avec un **BDD**, en plus de consomer
une API tièrce. Cette application doit être accéssible en ligne, l'application
doit être accessible en ligne via Heroku (par exemple) et mlabl (si mongodb).
L'api doit être restful. L'interface du site doit être en responsie design et
il doit être "joli" et ergonomique.

## Sujet

### Sujet du prof

Pouvoir afficher sur une carte géographique (avec une timeline) des informations
sur une collaboartion, nous pouvons interagir avec les éléments graphiques pour
filtrer les informations, comme restrindre la zone ou le temps. Le coeur du
sujet reste assez libre.

### Modalités

Apparemment faut faire de la gestion de projet, il faut définir le cahier des
charges. Lundi 19, présenter le "cahier des charges" du projet que l'on a
choisi.

### Api tierce

- Utilisation de l'api [HAL](https://api.archives-ouvertes.fr/docs/)
