const express = require('express');
const router = express.Router();

const counterCtrl = require('../app/controllers/counterController');

router.post('/create', counterCtrl.create);
router.get('/read', counterCtrl.read);
router.put('/update', counterCtrl.update);

module.exports = router;