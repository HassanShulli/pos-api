const express = require('express');
const router = express.Router();
const orderCtrl = require('../app/controllers/orderController');
const counterCtrl = require('../app/controllers/counterController');

router.post('/create', orderCtrl.create, counterCtrl.update);
router.get('/read', orderCtrl.read);

module.exports = router;
