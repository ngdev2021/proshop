import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        name: { type: String, required: true },
        rating: { type: Number, default: 0, required: true },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    reviews: [reviewsSchema ],
    price: { type: Number, default: 0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
