# **Exercices MongoDB - Mise à jour et suppression**

📌 **Lien exercice** : [Document Google](https://docs.google.com/document/d/1YgleBiQwqXwt8Jjg9-bKkbo4VOOSrGSV9E9d4KObQYk/edit?tab=t.0)

🔙 **Page précédente :**  [README.md](../README.md)

---

## **📌 Exercice 1 - Manipulation et suppression de données**

### **1️⃣ Créez une nouvelle collection et ajoutez-y tous les éléments du fichier JSON 1**

```shell
# Commande pour importer le fichier JSON 1
db.object.insertMany([...])  # Remplacez `[...]` par le contenu du fichier JSON 1
```

### **2️⃣ Incrémentez chaque élément de 1 année**

```shell
# Commande pour ajouter 1 an à tous les éléments
db.object.updateMany({}, {$inc: {age: 1}})
```

### **3️⃣ Effacez le premier élément ayant moins de 2000 ans**

```shell
# Commande pour supprimer le premier élément dont l'âge est inférieur à 2000 ans
db.object.deleteOne({age: {$lt: 2000}})
```

### **4️⃣ Effacez tous les éléments ayant plus de 2000 ans**

```shell
# Commande pour supprimer tous les éléments dont l'âge est supérieur à 2000 ans
db.object.deleteMany({age: {$gt: 2000}})
```

---

## **📌 Exercice 2 - Mise à jour et transformation des données**

### **1️⃣ Créez une nouvelle collection et ajoutez-y tous les éléments du fichier JSON 2**

```shell
# Commande pour importer le fichier JSON 2
db.creature3.insertMany([...])  # Remplacez `[...]` par le contenu du fichier JSON 2
```

### **2️⃣ Changez le nom de la première créature en "Gargouille du Dédain"**

```shell
# Commande pour modifier le name de la première créature
db.creature3.updateOne({}, {$set: {nom: "Gargouille du Dédain"}})
```

```shell
# Commande pour supprimer la clé nom dans le nom de la première créature
db.creature3.updateOne({}, {$unset: {nom: ""}})
```

### **3️⃣ Changez la clé `name` en `dedain` pour cette même gargouille**

```shell
# Commande pour renommer la clé "name" en "dedain"
db.creature3.updateOne({name: "Gargouille du Dédain"}, {$rename: {name: "dedain"}})
```

### **4️⃣ Changez le type de toutes les créatures de type "Nymphe" en "Steve"**

```shell
# Commande pour modifier le type "Nymphe" en "Steve"
db.creature3.updateMany({type: "Nymphe"}, {$set: {type: "Steve"}})
```

### **5️⃣ Supprimez le champ `description` de toutes les créatures de type "Griffon"**

```shell
# Commande pour supprimer le champ "description" des documents de type "Griffon"
db.creature3.updateMany({type: "Griffon"}, {$unset: {description: ""}})
```

### **6️⃣ Remplacez toutes les informations du document concernant le "Cerf d'Argent" par `nom: "Cerf-volant"`**

```shell
# Commande pour remplacer entièrement le document du "Cerf d'Argent"
db.creature3.replaceOne({nom: "Cerf d'Argent"}, {nom: "Cerf-volant", type: "Cerf", origine: "Forêt de Brocéliande", age: 500, description: "Le Cerf-volant est une créature majestueuse aux bois d'argent."})
```

### **7️⃣ Renommez la "Fée du Ruisseau" en "Fée des Dents"**

```shell
# Commande pour changer le nom de la "Fée du Ruisseau"
db.creature3.updateOne({nom: "Fée du Ruisseau"}, {$set: {nom: "Fée des Dents"}})
```

### **8️⃣ Ajoutez à la "Fée des Dents" une liste vide de dents**

```shell
# Commande pour ajouter une liste vide `dents: []`
db.creature3.updateOne({nom: "Fée des Dents"}, {$set: {dents: []}})
```

### **9️⃣ Ajoutez deux dents à cette liste**

```shell
# Commande pour insérer deux valeurs dans la liste `dents`
db.creature3.updateOne({nom: "Fée des Dents"}, {$push: {dents: {$each: ["dent1", "dent2"]}}})
```
