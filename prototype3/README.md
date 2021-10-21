# Titre du projet
Camerpedia

## Contributeurs
TONG Samuel Quentin 16U2085
NGUEJIP MUKETE Yves Jordan 17Q2742
KITIO AZANFACK Sage Excelle 15T2364
NJOUONKOU NKANJONE Maxime Anicet 17Q2772



### Description du projet

Camerpedia est une application web dont l’objectif est de mettre à la disposition de
toutes les personnes les nourritures camerounaises, leurs compositions, leurs valeurs
énergétiques, leurs vertus. Ceci dans le but d’aider les gens à mieux se nourrir en fonction de
mieux se nourrir en fonction de l’objectif recherché. Elle est basée sur une base de données
graphe utilisant des ontologies qui sont peuplées au fur et à mesure du temps avec nos
connaissances ainsi que les connaissances des utilisateurs


### Prérequis
-GraphDB: c’est un triple store compatible avec RDF et SPARQL et développé en JAVA. Nous utilisons sa version gratuite 9.8.0
-Apache Solr: c’est un moteur de recherche textuelle développé également en JAVA. Il est connecté à GraphDB pour permettre de faire la recherche textuelle sur les données de la base de données graphe
-NodeJS et Koa: utiliser au niveau du backend pour faire la connexion entre GraphDB et Apache Solr
 
### Installation
-installer NodeJS
-Telecharger graphdb sur son site https://graphdb.ontotext.com/
-Après avoir installer graphDB le lancer
-importer dans graphDB le fichier better-food-ontologie.owl 
-Telecharger Apache Solr via le lien https://solr.apache.org/downloads.html
-Après avoir installer Apache Solr le lancer
-créer un core dans solr avec les commandes suivantes:
	./solr start
	./solr create_core -c better-food-ontologie
-Écrire la requête de base du select des triplets, run et download en csv
-Aller dans son core créé, aller dans documents, choisir document type "File Upload" et sélectionner le fichier csv dans document(s)
-Submit le document et aller dans overview, ça doit avoir augmenté les documents
-Aller dans query, la requête select * va sélectionner tous les triplets(exécuter la requête on doit voir afficher les résultats)

## Démarrage
- Installer les dépendances `npm install`
-Pour lancer le serveur entrer la commande: npm run dev pour le serveur
-Pour lancer le frontend entrer les commandes: 
	npm run build
	npm run start 



## Front end fait avec

* [HTML]
* [TailwindCSS] - Framework CSS
* [NuxtJS] - Framework JavaScript
* [Visual Studio Code] - Editeur de textes

## License

Ce projet est sous licence - voir le fichier [LICENSE.md](LICENSE.md) pour plus d'informations


