import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String], // Array of strings like ['S', 'M', 'L']
      required: true,
    },
    imageUrl: {
      type: String,
      required: true, // We will just paste a Google Images link here for now
    },
    lastVerifiedDate: {
      type: Date,
      default: Date.now, // The second you save a jersey, the 30-day timer starts!
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
