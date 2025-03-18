# Project MongoDB

Réalisé par Maxime DUSSORT et Samuel RESSIOT

## Étape 1 : Création de vos JSON

Vous devrez créer deux collections sous un même thème, chacune contenant au moins 15 documents.
L'une de ces collections devra contenir des objets imbriqués (embedded documents).
Vous devrez être en mesure d’exécuter des requêtes find complexes retournant plusieurs valeurs, en utilisant $gt, $expr et $regex sur l'une de vos collections.
Les noms des champs devront être en anglais, mais le contenu devra être en français.

### Collections créées

- **Shaders** : Contient des informations sur différents shaders pour Minecraft.
- **Mods** : Contient des informations sur différents mods pour Minecraft.
- **Modpacks** : Contient des informations sur différents modpacks pour Minecraft.

Voici la mise à jour de ton README.md avec l'intégration des requêtes MongoDB correspondantes :

## Étape 2 : Création des requêtes find

Vous devrez créer des requêtes permettant de :

1. **Récupérer un document précis par son _id** :

   ```js
   db.shaders.find({ _id: ObjectId("67d974aaad882955f4bbe25e") });
   ```

2. **Récupérer un document précis par un ID généré par vous** :

   ```js
   db.mods.find({ mod_id: "jei" });
   ```

3. **Trier et retourner une liste d’éléments selon deux champs** :

   ```js
   db.shaders.find().sort({ "stats.total_downloads": -1, "stats.rating": -1 });
   ```

4. **Retourner trois documents en affichant uniquement un champ par document (autre que l’_id)** :

   ```js
   db.mods.find({}, { name: 1 }).limit(3);
   ```

5. **Récupérer tous les documents ayant une valeur supérieure à X** :

   ```js
   db.shaders.find({ "stats.total_downloads": { $gt: 5000000 } });
   ```

6. **Récupérer plusieurs documents en utilisant un filtre avec `$and`** :

   ```js
   db.mods.find({ 
       $and: [{ "stats.rating": { $gte: 4.8 } }, { "stats.total_downloads": { $gt: 10000000 } }] 
   });
   ```

7. **Récupérer trois documents correspondant à une expression régulière (`$regex`) de votre choix (sans utiliser `$limit`)** :

   ```js
   db.shaders.find({ name: { $regex: /Shaders/i } }).limit(3);
   ```

8. **Requête pour récupérer les modpacks ayant comme mods "jei"** :

   ```js
   db.modpacks.find({ "mods.mod_id": "jei" });
   ```

---

## Étape 3 : Création des mises à jour (update)

Avant d’exécuter ces modifications, faites un dump de votre base de données.

1. **Modifier une valeur spécifique dans le premier document retourné par un filtre correspondant à plusieurs documents** :

   ```js
   db.shaders.updateOne(
       { "author.name": "Sonic Ether" },
       { $set: { "author.website": "https://new-website.com" } }
   );
   ```

2. **Incrémenter une valeur spécifique dans tous les documents d’un montant X** :

   ```js
   db.mods.updateMany({}, { $inc: { "stats.total_downloads": 1000 } });
   ```

3. **Ajouter un élément à un tableau d’objets imbriqués** :

   ```js
   db.shaders.updateMany({}, { $push: { "features.graphical": "Nouveau Feature" } });
   ```

4. **Renommer un champ dans tous les documents** :

   ```js
   db.mods.updateMany({}, { $rename: { "summary": "overview" } });
   ```

5. **Supprimer toutes les valeurs d’une collection** :

   ```js
   db.modpacks.deleteMany({});
   ```

#### Sauvegarde et restauration

Dump de la base de données

```bash
mongodump --host localhost --port 27017 --username admin --password password --db minecraft_mods --out ./backup
```

Restauration de la base de données

```bash
mongorestore --host localhost --port 27017 --username admin --password password --db minecraft_mods ./backup/minecraft_mods
```

**Exemples d'utilisation avancée :**

1. Trouver les modpacks compatibles avec un mod spécifique

```js
db.modpacks.find({ "mods.mod_id": "jei" })
```

2. Trouver les mods les plus téléchargés par catégorie

```js
db.mods.aggregate([
  { $unwind: "$categories" },
  {
    $group: {
      _id: "$categories",
      avg_downloads: { $avg: "$stats.total_downloads" },
      mods: { $push: { id: "$mod_id", name: "$name", downloads: "$stats.total_downloads" } }
    }
  },
  { $sort: { avg_downloads: -1 } }
])
```

3. Lister les shaders compatibles avec des configurations modestes

```js
db.shaders.find({
  $or: [
    { "requirements.minimum.ram": { $lte: "4GB" } },
    { "requirements.lite.ram": { $lte: "4GB" } }
  ]
})
```

4. Recherche texte complète sur tous les mods

```js
// Création d'un index texte
db.mods.createIndex({ name: "text", description: "text", "features.functionality": "text" })

// Requête de recherche
db.mods.find({ $text: { $search: "stockage automatisation" } })
```

## Étape 4 : Les références (referred)

### La collection supplémentaire

Dans notre projet, nous avons ajouté une troisième collection nommée **shaders** qui contient des informations sur les shaders graphiques pour Minecraft. Cette collection est référencée dans la collection **modpacks**.

```json
// Structure de la collection shaders
{
  "_id": ObjectId("..."),
  "shader_id": "seus-ptgi",                         
  "name": "SEUS PTGI",                               
  "full_name": "Sonic Ether's Unbelievable Shaders - Path Traced Global Illumination",
  "summary": "Le premier shader avec illumination globale par ray-tracing pour Minecraft",
  "description": "SEUS PTGI est un shader révolutionnaire...",
  "author": {
    "name": "Sonic Ether",
    "website": "https://www.sonicether.com/",
    "donation_url": "https://www.patreon.com/sonicether"
  },
  "versions": [...],
  "requirements": {...},
  "features": ["Path tracing", "Illumination globale"],
  "stats": {
    "total_downloads": 2850000,
    "rating": 4.9
  }
}
```

#### La méthode utilisée pour créer la référence

Nous avons utilisé la méthode de référence par identifiant (DBRef implicite) où chaque modpack contient un tableau d'objets avec les identifiants des shaders qu'il inclut :

```js
// Ajout des références aux shaders dans les modpacks
db.modpacks.updateMany(
  { minecraft_version: "1.18.2" },
  {
    $set: {
      "shaders": [
        {
          "shader_id": "complementary",
          "name": "Complementary Shaders",
          "version": "4.6",
          "recommended": true
        }
      ]
    }
  }
);
```

Nous avons également implémenté l'option demandée de référence basée sur le nombre de lettres :

```js
// Créer des références basées sur le nombre de lettres dans le nom des mods
db.mods.aggregate([
  { 
    $addFields: { 
      shader_length_ref: { $toString: { $strLenCP: "$name" } }
    }
  },
  {
    $merge: { into: "mods" }
  }
]);

// Associer les shaders aux mods selon la longueur du nom
db.mods.updateMany(
  {},
  [
    {
      $set: {
        shader_ref: {
          $arrayElemAt: [
            {
              $filter: {
                input: { $objectToArray: "$$ROOT" },
                as: "field",
                cond: { $eq: ["$$field.k", "name"] }
              }
            },
            0
          ]
        }
      }
    },
    {
      $set: {
        shader_ref: { $strLenCP: "$shader_ref.v" }
      }
    }
  ]
);
```

#### Requête pour afficher l'objet parent avec l'objet enfant (aggregate)

Cette requête d'agrégation permet d'afficher les modpacks avec leurs mods et shaders référencés :

```js
db.modpacks.aggregate([
  // Étape 1: Joindre les détails des mods référencés
  {
    $lookup: {
      from: "mods",
      localField: "mods.mod_id",
      foreignField: "mod_id",
      as: "detailed_mods"
    }
  },
  // Étape 2: Joindre les détails des shaders référencés
  {
    $lookup: {
      from: "shaders",
      localField: "shaders.shader_id",
      foreignField: "shader_id",
      as: "detailed_shaders"
    }
  },
  // Étape 3: Restructurer le résultat pour intégrer les informations
  {
    $addFields: {
      mods: {
        $map: {
          input: "$mods",
          as: "mod_ref",
          in: {
            $mergeObjects: [
              "$$mod_ref",
              {
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$detailed_mods",
                        as: "dm",
                        cond: { $eq: ["$$dm.mod_id", "$$mod_ref.mod_id"] }
                      }
                    },
                    0
                  ]
                }
              }
            ]
          }
        }
      },
      shaders: {
        $map: {
          input: "$shaders",
          as: "shader_ref",
          in: {
            $mergeObjects: [
              "$$shader_ref",
              {
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$detailed_shaders",
                        as: "ds",
                        cond: { $eq: ["$$ds.shader_id", "$$shader_ref.shader_id"] }
                      }
                    },
                    0
                  ]
                }
              }
            ]
          }
        }
      }
    }
  },
  // Étape 4: Supprimer les tableaux temporaires
  {
    $project: {
      detailed_mods: 0,
      detailed_shaders: 0
    }
  }
])
```

Cette requête permet d'obtenir une vue complète de chaque modpack avec les détails des mods et shaders qu'il contient, montrant ainsi comment les trois collections sont liées entre elles.
