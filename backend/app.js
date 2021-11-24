const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

const app = express();

mongoose.connect('mongodb+srv://go-fullstack-fr:1234@cluster0.akwyw.mongodb.net/est?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Exemple de Miffdelware //Middelware 1 test
// app.use((req, res,next) => {
//     console.log('Requete reçue !');
//     next();
// });
// //Middelware 2 test
// app.use((req,res,next) => {
//     res.status(201);
//     next();
// })
// //Middelware 3 test
// app.use((req, res,next) => {
//     res.json({message : 'La requête a bien été reçue !'})
//     next();
// })
// //Middelware 4 test
// app.use((req, res) => {
//     console.log('reponse envoyé avec succès !')
// })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// Requête POST : Middelware qui traite les requête POST
app.post('/api/stuff', (req, res, next) => {
    // console.log(req.body);
    // res.status(201).json({
    //     message: 'Object crée'
    // })

    delete req.body._id;
    const thing = new Thing({
        // L'opérateur spread = La syntaxe de décomposition permet de développer une expression là où plusieurs arguments (dans le cas des appels à une fonction) ou là où plusieurs éléments (dans le cas des tableaux) sont attendus.
        ...req.body
    });
// fonction save enregistre les données dans la base de données
    thing.save()
        .then(() => {res.status(201).json({message : "Objet enregisté ! "})})
        .catch(error => res.status(400).json({ error }));

})

app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json(error));
})

module.exports = app;