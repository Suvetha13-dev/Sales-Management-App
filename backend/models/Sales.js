const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sale', saleSchema);