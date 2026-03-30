const mongoose = require('mongoose');
const Order = require('../models/order');
const { authenticateToken } = require('../utils/middleware');

// POST: Create a new order
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { customer, items, total, address, phone } = req.body;

            // Create a new order
            const order = new Order({
                userId: new mongoose.Types.ObjectId(), // Use actual user ID here
                customer,
                items: items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total,
                address,
                phone
            });

            // Save the order to DB
            await order.save();
            res.status(201).json(order);  // Return the created order
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Error creating order', error });
        }
    } else {
        res.status(404).json({ message: 'Route not found' });
    }
};

// GET: Fetch all orders
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ message: 'Error fetching orders' });
        }
    }
};

// More routes (GET by order ID, PUT, DELETE) follow the same structure
