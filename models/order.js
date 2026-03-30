// /models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customer: { type: String, required: true },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'delivered'],
        default: 'pending'
    },
    address: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
