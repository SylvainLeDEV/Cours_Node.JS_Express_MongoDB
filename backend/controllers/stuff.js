const Thing = require("../models/Thing");
//fs signifie « file system » (soit « système de fichiers », en français). Il nous donne accès aux fonctions qui
// nous permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers.
const fileSystème = require('fs');

exports.createThing = (req, res, next) => {

    const thingObject = JSON.parse(req.body.thing);

    delete thingObject._id;
    const thing = new Thing({
        // L'opérateur spread = La syntaxe de décomposition permet de développer une expression là où plusieurs arguments (dans le cas des appels à une fonction) ou là où plusieurs éléments (dans le cas des tableaux) sont attendus.
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
// fonction save enregistre les données dans la base de données
    thing.save()
        .then(() => {
            res.status(201).json({message: "Objet enregisté ! "})
        })
        .catch(error => res.status(400).json({error}));
}

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body}

    Thing.updateOne({_id: req.params.id}, {...thingObject, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Object modifé !'}))
        .catch(error => res.status(400).json({error}))
}

exports.deleteThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1]
            fileSystème.unlink(`images/${filename}`, () => {
                Thing.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'Object supprimé !'}))
                    .catch(error => res.status(400).json({error}))
            })
        })
        .catch(error => res.status(500).json({error}))

    Thing.findOne({_id: req.params.id})
        .then((thing) => {
            if (!thing) {
                return res.status(404).json({
                    error: new Error('Object non trouvé !')
                });
            }
            if (thing.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new Error('Requête non autorisé !')
                })
            }
            Thing.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Object supprimé !'}))
                .catch(error => res.status(400).json({error}))
        })

}

exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}))

}

exports.getAllThing = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json(error));
}