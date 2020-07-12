const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Counter', new mongoose.Schema({
	item_id: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null
	},
	table_id: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        default: null
	},
	count: Number,
	type: String
}, {timestamp: true}
))