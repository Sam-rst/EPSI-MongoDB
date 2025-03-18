// ...existing code...

// Étape 2 : Création des requêtes find

// 1. Récupérer un document précis par son _id
db.shaders.find({ _id: ObjectId("67d974aaad882955f4bbe25e") });

// 2. Récupérer un document précis par un ID généré par vous
db.mods.find({ mod_id: "jei" });

// 3. Trier et retourner une liste d’éléments selon deux champs
db.shaders.find().sort({ "stats.total_downloads": -1, "stats.rating": -1 });

// 4. Retourner trois documents en affichant uniquement un champ par document (autre que l’_id)
db.mods.find({}, { name: 1 }).limit(3);

// 5. Récupérer tous les documents ayant une valeur supérieure à X
db.shaders.find({ "stats.total_downloads": { $gt: 5000000 } });

// 6. Récupérer plusieurs documents en utilisant un filtre avec $and
db.mods.find({ $and: [{ "stats.rating": { $gte: 4.8 } }, { "stats.total_downloads": { $gt: 10000000 } }] });

// 7. Récupérer trois documents correspondant à une expression régulière ($regex) de votre choix (sans utiliser $limit)
db.shaders.find({ name: { $regex: /Shaders/i } }).limit(3);

// Requête pour récupérer les modpacks ayant comme mods "jei"
db.modpacks.find({ "mods.mod_id": "jei" });

// Étape 3 : Création des mises à jour (update)

// 1. Modifier une valeur spécifique dans le premier document retourné par un filtre correspondant à plusieurs documents
db.shaders.updateOne({ "author.name": "Sonic Ether" }, { $set: { "author.website": "https://new-website.com" } });

// 2. Incrémenter une valeur spécifique dans tous les documents d’un montant X
db.mods.updateMany({}, { $inc: { "stats.total_downloads": 1000 } });

// 3. Ajouter un élément à un tableau d’objets imbriqués
db.shaders.updateMany({}, { $push: { "features.graphical": "Nouveau Feature" } });

// 4. Renommer un champ dans tous les documents
db.mods.updateMany({}, { $rename: { "summary": "overview" } });

// 5. Supprimer toutes les valeurs d’une collection
db.modpacks.deleteMany({});
