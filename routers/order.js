const express = require('express');
const router = express.Router();
const orderCtrl = require('../app/controllers/orderController');

router.post('/create', orderCtrl.create);
router.get('/read', orderCtrl.read);

module.exports = router;
