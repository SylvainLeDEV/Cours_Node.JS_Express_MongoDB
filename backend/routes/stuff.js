const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

// Requête POST : Middelware qui traite les requête POST
router.post('/', auth, multer, stuffCtrl.createThing);
router.delete('/:id', auth, stuffCtrl.deleteThing)
router.put('/:id', auth, multer, stuffCtrl.modifyThing)
//nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint ;
router.get('/:id', auth, stuffCtrl.getOneThing)
router.get('/', auth, stuffCtrl.getAllThing)

module.exports = router;

