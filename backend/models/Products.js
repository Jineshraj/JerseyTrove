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
    fitType: {
      type: String,
      required: true,
    },
    collarType: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String], // Array of strings like ['S', 'M', 'L']
      required: true,
    },
    images: {
      type: [String],
      required: true, // Multiple images (first one used as thumbnail)
    },
    lastVerifiedDate: {
      type: Date,
      default: Date.now, // The second you save a jersey, the 30-day timer starts!
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
