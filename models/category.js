// /models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    coverFile: { type: String },
    icon: { type: String },
    image: { type: String },
    color: { type: String },
    subcategories: [{
        id: { type: Number, required: true },
        title: { type: String, required: true },
        icon: { type: String },
        image: { type: String },
        subcategories: [{
            id: { type: Number, required: true },
            title: { type: String, required: true },
            products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
        }]
    }]
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
