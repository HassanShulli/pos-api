const express = require('express');
const router = express.Router();

const tableCtrl = require('../app/controllers/tableController');
const counterCtrl = require('../app/controllers/counterController');

router.post('/create', tableCtrl.create, counterCtrl.create);
router.get('/read', tableCtrl.read);
router.put('/update', tableCtrl.update);
router.delete('/delete/:id', tableCtrl.delete);

module.exports = router;