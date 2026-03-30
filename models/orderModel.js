const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    customer: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
});

// Create the Order model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;  // Export the Order model to be used elsewhere in your app


