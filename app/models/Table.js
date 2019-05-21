const mongoose = require('mongoose');

module.exports = mongoose.model('Table', new mongoose.Schema({
        number: {type: Number, unique: true},
        seats: Number,
        is_deleted: Boolean
    }, {timestamps: true}
));
