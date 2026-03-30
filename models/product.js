// /models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    weight: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    image: { type: String, required: true },
    discount: { type: String, required: true },
    subcategoryId: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
