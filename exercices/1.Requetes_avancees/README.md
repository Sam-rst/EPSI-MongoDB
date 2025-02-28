# Requêtes avancées

📌 **Lien exercice** : [Document Google](https://docs.google.com/document/d/1G6O2cJm3UkRyHpbtLCSMxX_D-SQh3ZjES4HXuQeSwa4/edit?tab=t.0)

---

## **Exercice 1**

### **Données Exemple**

Voici un exemple de données dans la collection :

```json
{
    "name": "Collier de Lumière",
    "powerLevel": 75,
    "age": 900
}
```

### **1️⃣ Créez une nouvelle collection et ajoutez-y tous les éléments du fichier JSON 1**

```shell
# Fait avec Compass
db.creature2.insertMany([...])  # Remplacez [...] par le contenu du fichier JSON 1
```

### **2️⃣ Retrouvez tous les éléments ayant le nom "Flûte Enchantée".**

```shell
db.creature2.find({name: "Flûte Enchantée"})
```

### **3️⃣ Retrouvez tous les éléments n’ayant pas le nom "Flûte Enchantée".**

```shell
db.creature2.find({name: {$ne: "Flûte Enchantée"}})
```

### **4️⃣ Retrouvez tous les éléments ayant un âge inférieur ou égal à 550.**

```shell
db.creature2.find({age: {$lte: 550}}).sort({age: 1})
```

### **5️⃣ Retrouvez tous les éléments ayant un âge strictement supérieur à 1100.**

```shell
db.creature2.find({age: {$gt: 1100}}).sort({age: 1})
```

### **6️⃣ Retrouvez tous les éléments dont l'âge est plus petit que leur puissance.**

```shell
db.creature2.find({$expr: {$lt: ["$age", "$powerLevel"]}})
```

---

## **Exercice 2**

### **Données Exemple**

Voici un exemple de données dans la collection :

```json
{
    "nom": "Gargouille du Destin",
    "type": "Gargouille",
    "origine": "Forêt enchantée de Brocéliande",
    "description": "La Gargouille du Destin est une créature en pierre qui protège les secrets de la forêt enchantée de Brocéliande. Elle possède des ailes majestueuses et un regard perçant."
}
```

### **1️⃣ Créez une nouvelle collection et ajoutez-y tous les éléments du fichier JSON 2**

```shell
# Fait avec Compass
db.creature3.insertMany([...])  # Remplacez [...] par le contenu du fichier JSON 2
```

### **2️⃣ Trouver les créatures du type "Cerbère" ou "Griffon".**

```shell
# Méthode 1 :
db.creature3.find({$or: [{type: "Cerbère"}, {type: "Griffon"}]})

# Méthode 2 :
db.creature3.find({type: {$in: ["Cerbère", "Griffon"]}})
```

### **3️⃣ Trouver toutes les créatures qui ne sont ni "Cerbère" ni "Griffon".**

```shell
# Méthode 1 :
db.creature3.find({$nor: [{type: "Cerbère"}, {type: "Griffon"}]})

# Méthode 2 :
db.creature3.find({type: {$nin: ["Cerbère", "Griffon"]}})
```

### **4️⃣ Trouver la créature étant un "Griffon" et ayant comme origine "Mythe des Tempêtes Ailées".**

```shell
db.creature3.find({$and: [{type: "Griffon"}, {origine: "Mythe des Tempêtes Ailées"}]})
```

### **5️⃣ Trouver toutes les valeurs des créatures de type "Esprit" ou ayant comme origine "Folklore des Pierres Runiques".**

```shell
db.creature3.find({$or: [{type: "Esprit"}, {origine: "Folklore des Pierres Runiques"}]})
```

### **6️⃣ Trouver tous les documents dont l’origine est un "folklore".**

```shell
db.creature3.find({origine: /Folklore/})
```

### **7️⃣ Trouver les 2 documents dont l’origine a un lien avec les "Tempêtes".**

```shell
db.creature3.find({origine: /Tempêtes/}).limit(2)
```
