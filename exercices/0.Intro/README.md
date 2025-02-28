# Introduction à MongoDB

📌 **Lien exercice** : [Document Google](https://docs.google.com/document/d/12ciQ49PGaze4TZKyb7oLWxsY8PcQdfLAQnhfJibIjrg/edit?usp=sharing)

🔙 **Page précédente :**  [README.md](../README.md)

---

## **Exercice 1**

### **1️⃣ Créer une base de données du nom de ton choix**

```shell
use mythic
```

### **2️⃣ Ajouter une collection et y insérer plusieurs utilisateurs**

```shell
db.user.insertMany([
    { "nom": "Alice", "age": 30, "email": "alice@example.com", "ville": "Paris" },
    { "nom": "Bob", "age": 25, "email": "bob@example.com", "ville": "Lyon" },
    { "nom": "Charlie", "age": 35, "email": "charlie@example.com", "ville": "Marseille" },
    { "nom": "David", "age": 28, "email": "david@example.com", "ville": "Toulouse" },
    { "nom": "Emma", "age": 22, "email": "emma@example.com", "ville": "Nice" },
    { "nom": "François", "age": 40, "email": "francois@example.com", "ville": "Bordeaux" },
    { "nom": "Gabrielle", "age": 27, "email": "gabrielle@example.com", "ville": "Lille" },
    { "nom": "Hugo", "age": 32, "email": "hugo@example.com", "ville": "Strasbourg" },
    { "nom": "Isabelle", "age": 29, "email": "isabelle@example.com", "ville": "Grenoble" },
    { "nom": "Jean", "age": 33, "email": "jean@example.com", "ville": "Nantes" }
])
```

### **3️⃣ Ajouter un document dans cette collection**

```shell
db.user.insertOne({ "nom": "Lucas", "age": 26, "email": "lucas@example.com", "ville": "Montpellier" })
```

### **4️⃣ Créer une nouvelle collection**

```shell
db.magie.createCollection("artefacts")
```

### **5️⃣ Ajouter 3 documents d’un coup dans cette nouvelle collection**

```shell
db.artefacts.insertMany([
    { "nom": "Anneau de pouvoir", "propriétaire": "Sauron", "puissance": 100 },
    { "nom": "Baguette de sureau", "propriétaire": "Dumbledore", "puissance": 95 },
    { "nom": "Trident de Poséidon", "propriétaire": "Poséidon", "puissance": 90 }
])
```

### **6️⃣ Créer une troisième collection**

```shell
db.createCollection("creatures")
```

### **7️⃣ Ajouter tous les éléments du fichier JSON des éléments mythiques**

```shell
db.creatures.insertMany([
    {
        "name": "Licorne",
        "type": "Créature",
        "origin": "Monde entier",
        "description": "Une créature légendaire ressemblant à un cheval avec une corne en spirale unique sur son front, souvent associée à la pureté et aux pouvoirs magiques."
    },
    {
        "name": "Fée",
        "type": "Être",
        "origin": "Européen",
        "description": "Une petite créature semblable à un humain avec des ailes, souvent représentée comme ayant des pouvoirs surnaturels et liée à la nature."
    },
    {
        "name": "Dragon",
        "type": "Créature",
        "origin": "Mythologies du monde entier",
        "description": "Une créature légendaire, souvent représentée comme un grand serpent ou un lézard ailé, capable de cracher du feu et dotée de pouvoirs magiques."
    },
    {
        "name": "Excalibur",
        "type": "Artefact",
        "origin": "Légende arthurienne",
        "description": "L'épée légendaire du roi Arthur, accordant la souveraineté sur la Grande-Bretagne et possédant des pouvoirs magiques."
    },
    {
        "name": "Syntaxe le Malicieux",
        "type": "Cocker Ensorcelé",
        "origin": "Toulouse, France",
        "description": "Syntaxe le Malicieux, plus communément appelé Syn, utilise son apparence mignonne et innocente pour facilement tromper ceux qui l'entourent."
    },
    {
        "name": "Cerbère",
        "type": "Créature",
        "origin": "Mythologie grecque",
        "description": "Un chien à trois têtes, avec une queue de serpent et une crinière de serpents venimeux, gardien des Enfers."
    }
])
```

---

## **Exercice 2**

### **1️⃣ Trouver tous les éléments dans la première collection**

```shell
db.user.find()
```

### **2️⃣ Trouver les 2 premiers éléments de la deuxième collection**

```shell
db.artefacts.find().limit(2)
```

### **3️⃣ Trouver 2 éléments dans la collection des éléments mythiques en skippant les 3 premiers**

```shell
db.creatures.find().skip(3).limit(2)
```

### **4️⃣ Retourner les éléments mythiques organisés par origine en ordre croissant**

```shell
db.creatures.find().sort({origin: 1})
```

### **5️⃣ Retourner les éléments mythiques, organisés par origine puis par nom**

```shell
db.creatures.find().sort({origin: 1, name: 1})
```

### **6️⃣ Retourner 4 éléments mythiques, en skippant les 2 premiers, organisés par origine puis par type**

```shell
db.creatures.find().skip(2).limit(4).sort({origin: 1, type: 1})
```
