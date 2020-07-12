const mongoose = require('mongoose');

module.exports = mongoose.model('Appointment', new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        carModel: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    }, {timestamps: true}
));