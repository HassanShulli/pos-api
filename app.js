var express = require("express");
var morgan = require('morgan')
var app = express();
const expressJwt = require('express-jwt');
app.use(morgan('combined'))

// var port = process.env.PORT || 8080;    // for heroku
var port = 3000;    // for local use
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/POS_DB", {useMongoClient: true});  //for local mongo use
// mongoose.connect("mongodb://pos_admin1:pos_admin1@ds151530.mlab.com:51530/pos_app", {useMongoClient: true}); //mlab
mongoose.connection.on('error', function (err) {
    console.error(err);
    process.exit();
});

// app.use(expressJwt({
//     secret: 'pos-app-shared-secret',
//     getToken: function fromHeaderOrQuerystring(req) {
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             return req.headers.authorization.split(' ')[1];
//         } else if (req.query && req.query.token) {
//             return req.query.token;
//         }
//         return null;
//     }
// }).unless({
//     path: [
//         '/',
//         '/user/login',
//         '/user/register'
//     ]
// }), function (err, req, res, next) {
//     if (err) {
//         res.status(401).send({ success: false, result: [], messages: [err.message] })
//     }
// });

// allow-cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if(req.method === 'OPTIONS'){
    	res.writeHead(200);
    	res.end()
    }else{
    	next();    	
    }
});


const table = require('./routers/table');
const item = require('./routers/item');
const order = require('./routers/order');
const user = require('./routers/user');
const counter = require('./routers/counter');

//initialise express router
var router = express.Router();

app.use("/table", table);
app.use("/item", item);
app.use("/order", order);
app.use("/user", user);
app.use("/counter", counter);

// catch 404
app.use(function (req, res) {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(port, function () {

    console.log("Server listening on port " + port);

});
module.exports = router;
