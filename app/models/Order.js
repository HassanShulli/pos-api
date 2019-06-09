const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-page');

const OrderSchema = new mongoose.Schema({
        table: {
        	_id: {
		        type: Schema.Types.ObjectId,
		        ref: 'Table'
        	},
        	number: Number
        },
        items: Array,
        total: Number
    }, {timestamps: true}
)

OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', OrderSchema);

// module.exports = mongoose.model('Order', new mongoose.Schema({
//         table: Number,
//         items: Array,
//         total: Number
//     }, {timestamps: true}
// ));
