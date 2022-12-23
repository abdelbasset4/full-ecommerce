const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, "product title is required"],
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, "product description is required"],
        minlength: [3, 'Too short product description'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
    sold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    imageCover: {
        type: String,
        required: [true, 'Product Image cover is required'],
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'category',
        required: [true, 'Product must be belong to category'],
    },
    subcategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory',
        },
    ],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'brand',
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
        // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

productSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'category',
        select: 'name -_id'
    });
    next();
})
const Product = mongoose.model('Product', productSchema);
module.exports = Product