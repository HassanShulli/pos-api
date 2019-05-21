const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-page');

const OrderSchema = new mongoose.Schema({
        table: Number,
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
