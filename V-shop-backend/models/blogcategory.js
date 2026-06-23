import mongoose from "mongoose";


const blogCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    key: { type: String, required: true },
});

export default mongoose.model("blogCategory", blogCategorySchema);