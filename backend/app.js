const express = require('express');

const app = express();
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
// Requête POST : Middelware qui traite les requête POST
app.post('/api/stuff', (req, res, next) => {

})

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihize',
            title: 'Mon troisième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
})

module.exports = app;