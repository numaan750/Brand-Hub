import mongoose from "mongoose";

const contectmodelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }, // ⭐ YE LINE ADD KARO
    
}, { timestamps: true }); // ⭐ Ye line add karo);

export default mongoose.model("contectmodel", contectmodelSchema);