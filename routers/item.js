const express = require('express');
const router = express.Router();

const itemCtrl = require('../app/controllers/itemController');

router.post('/create', itemCtrl.create) ;
router.get('/read', itemCtrl.read);
router.put('/update', itemCtrl.update);
router.delete('/delete/:id', itemCtrl.delete);

module.exports = router;