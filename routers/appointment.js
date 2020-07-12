const express = require('express');
const router = express.Router();

const appointmentCtrl = require('../app/controllers/appointment');

router.post('/create', appointmentCtrl.create);
router.get('/read', appointmentCtrl.read);
router.put('/update', appointmentCtrl.update);
router.delete('/delete/:id', appointmentCtrl.delete);

module.exports = router;
