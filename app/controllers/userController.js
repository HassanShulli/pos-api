const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expessJwt = require('express-jwt');
const bcrypt = require('bcrypt');

exports.register = function(req, res) {
	var newUser = {
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10)
	};
	
	console.log('newUser : ', newUser);

	User.create(newUser, function(err, user) {
		 if (err) {
            res.json({success: false, result: [], messages: [err.message]});
        } else {
            res.json({success: true, result: user, messages: []});
        }
	})
}

exports.login = function(req, res) {
	User.findOne({email: req.body.email},
		function(err, user) {
			if(err) {
				res.json({success: false, result: [], messages: [err.message]});
			} else if (user && bcrypt.compareSync(req.body.password, user.password)) {
				var token = jwt.sign({userID: user._id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
				res.json({success: true, result: token, messages: []});
			} else {
				res.json({success: false, result: [], messages: ['Invalid login credentials']});
			}
		
		})
}


// app.post('/api/auth', function(req, res) {
//   const body = req.body;

//   const user = USERS.find(user => user.username == body.username);
//   if(!user || body.password != 'todo') return res.sendStatus(401);
  
//   var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
//   res.send({token});
// });