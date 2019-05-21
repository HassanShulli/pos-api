const mongoose = require('mongoose');

module.exports = mongoose.model('Item', new mongoose.Schema({
        name: String,
        price: Number,
        fileName: String,
        type: String
    }, {timestamps: true}
));