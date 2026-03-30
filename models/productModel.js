// Product Schema
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

// Category Schema
const categorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    coverFile: { type: String },
    title: { type: String, required: true },
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