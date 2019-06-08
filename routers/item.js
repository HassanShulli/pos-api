const express = require('express');
const router = express.Router();

const itemCtrl = require('../app/controllers/itemController');

router.post('/create', itemCtrl.create) ;
router.get('/read', itemCtrl.read);
router.put('/update', itemCtrl.update);
router.delete('/delete/:id', itemCtrl.delete);

// function verifyToken(req, res, next) {
  // Get auth header value
  // const bearerHeader = req.headers['Authorization'];
  // const bearerHeader2 = req.headers['Content-Type'];
  // var tok = okenArray = jwttoken.split(" ");
  // console.log('Authorization  : ', bearerHeader);
  // console.log('Content-Type  : ', bearerHeader);
  
  // Check if bearer is undefined
  // if(typeof bearerHeader !== 'undefined') {
  //   // Split at the space
  //   const bearer = bearerHeader.split(' ');
  //   // Get token from array
  //   const bearerToken = bearer[1];
  //   // Set the token
  //   req.token = bearerToken;
  //   // Next middleware
    // next();
  // } else {
  //   // Forbidden
  //   res.sendStatus(403);
  // }

// }


module.exports = router;
