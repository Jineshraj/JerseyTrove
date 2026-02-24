import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 1. The User Link (Optional for Guest Checkout!)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // False means guests can buy without an account!
      ref: "User", // Tells Mongoose this ID belongs to the User collection
    },

    // 2. The Required Contact Info (For both Guests and Users)
    email: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String, // You can make this a more complex object later, keeping it simple for now
      required: true,
    },

    // 3. The Cart Items (An array of objects)
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        // This links this specific cart item back to the original jersey in the database
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    // 4. Payment Details
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false, // Flips to true once Razorpay confirms the transaction
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
