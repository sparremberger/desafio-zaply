import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        id: { type: Number, required: true },
        image: { type: String, required: true },
        name: { type: String },
        categories: { type: String },
        price: { type: Number, required: true },
        brand: { type: String },
    },
    {
        timestamps: true,
    }
);

// Da documentação do Mongoose:
// The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
const Product = mongoose.model("Produto", productSchema);

export default Product;
