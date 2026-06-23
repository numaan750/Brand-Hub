import mongoose from "mongoose";

const checkoutmodelSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  apartment: { type: String },

  products: [
    {
      img: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  status: {
    type: String,
    enum: ["pending", "delivered", "deleted", "cancelled"], // ✅ "cancelled" add kiya
    default: "pending",
  },

   userId: {
        type: String,  // Ya mongoose.Schema.Types.ObjectId agar User model hai
        required: true,
        index: true
    },
    email: String,

  createdAt: { type: Date, default: Date.now }, // optional, useful for timestamps
});

export default mongoose.model("checkoutmodel", checkoutmodelSchema);
