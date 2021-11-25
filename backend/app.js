const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user')

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


// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)

module.exports = app;