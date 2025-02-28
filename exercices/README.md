# Exercices MongoDB

🔙 **Page précédente :**  [`README.md`](../README.md)

## 📌 **Structure des exercices**

Les exercices sont organisés en plusieurs dossiers correspondant aux différentes étapes d'apprentissage :

- 📂 `0.Intro/` → Introduction à MongoDB
- 📂 `1.Requetes_avancees/` → Requêtes avancées en MongoDB
- 📂 `2.Mise_a_jour_suppression/` → Mise à jour et suppression des documents

Chaque dossier contient un fichier **README.md** détaillant les exercices et leurs solutions.

---

## **📖 Contenu des exercices**

### **🟢 0. Introduction à MongoDB**

📍 **Fichier :** [`README.md`](./0.Intro/README.md)  
📍 **Données JSON :** [`mythical.json`](./0.Intro/mythical.json)  

**Contenu :**

- Création d'une base de données
- Ajout de collections et de documents
- Requêtes CRUD de base (Create, Read, Update, Delete)
- Importation de fichiers JSON dans MongoDB

➡️ Voir les exercices détaillés : [`Introduction à MongoDB`](./0.Intro/README.md)

---

### **🔵 1. Requêtes avancées**

📍 **Fichier :** [`README.md`](./1.Requetes_avancees/README.md)  
📍 **Données JSON :** [`mythical2.json`](./1.Requetes_avancees/mythical2.json), [`objectMythiqueV2.json`](./1.Requetes_avancees/objectMythiqueV2.json)

**Contenu :**

- Requêtes avancées avec filtres (`$gt`, `$lt`, `$ne`, `$in`, `$or`, `$and`, etc.)
- Opérations de tri et de pagination (`sort()`, `skip()`, `limit()`)
- Recherche textuelle et expressions régulières
- Agrégation et jointures entre collections

➡️ Voir les exercices détaillés : [`Requêtes avancées`](./1.Requetes_avancees/README.md)

---

### **🟠 2. Mise à jour et suppression**

📍 **Fichier :** [`README.md`](./2.Update_delete/README.md)  
📍 **Données JSON :** [`objectMythique.json`](./2.Update_delete/objectMythique.json), [`mythical2.json`](./2.Update_delete/mythical2.json)

---

**Contenu :**

- Modification de documents avec `$set`, `$inc`, `$rename`
- Suppression de champs avec `$unset`
- Remplacement total d’un document avec `replaceOne()`
- Suppression ciblée avec `deleteOne()` et `deleteMany()`
- Gestion de tableaux avec `$push`, `$each`

➡️ Voir les exercices détaillés : [`Mise à jour et suppression`](./2.Update_delete/README.md)