import mongoose from "mongoose";

const vadminmodelSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },

   role: { 
        type: String, 
        enum: ['admin', 'vendor'],  
        default: 'admin',
        required: true 
    },

    shopename:{type: String, trim: true},
    ownername:{type: String, trim: true},
    owneremail:{type: String, trim: true},
    ownerphone:{type: String, trim: true},
    owneraddress:{type: String, trim: true},
    commissionrate:{type: Number, default:0},
    status:{type:String, enum:["active", "inactive"], default:"active"},
    createdat:{type:Date, default:Date.now},
    
});

export default mongoose.model("vadmin", vadminmodelSchema);