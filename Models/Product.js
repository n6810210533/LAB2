import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    detail: String,
    price: { type: Number, min: 0 }
}, { timestamps: true });

export default mongoose.model(
    'Product', productSchema);
