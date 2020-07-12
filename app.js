let express = require("express");
let morgan = require('morgan');
let app = express();
app.use(morgan('combined'));

let port = 3000;    // for local use
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/POS_DB");  //for local mongo use
mongoose.connection.on('error', function (err) {
    console.error(err);
    process.exit();
});

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


const appointment = require('./routers/appointment');

//initialise express router
let router = express.Router();

app.use("/appointment", appointment);

// catch 404
app.use(function (req, res) {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(port, function () {

    console.log("Server listening on port " + port);

});
module.exports = router;
