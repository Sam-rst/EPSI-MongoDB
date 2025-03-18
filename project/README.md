# Project MongoDB

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
