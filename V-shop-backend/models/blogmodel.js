import mongoose from "mongoose";

const blogmodelSchema = new mongoose.Schema({
  minheading: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogCategory",
    required: true,
  },
  img: { type: String, required: true },
  qoutes: { type: String, required: true },
  sections: [
    {
      heading: { type: String },
      paragraph: { type: String },
    },
  ],
}, {
  timestamps: true // Yeh add karo - createdAt aur updatedAt automatic add ho jayega
});

export default mongoose.model("blogmodel", blogmodelSchema);