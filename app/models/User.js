const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
        email: String,
        password: String
    }, {timestamps: true}
));