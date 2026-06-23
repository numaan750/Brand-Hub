import mongoose from "mongoose";


const shippingmodelSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{type: Number, },
    description:{type: String, },
    isActive:{type: Boolean, },
});

export default mongoose.model("shippingmodel", shippingmodelSchema);