import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, match: /^#([A-Fa-f0-9]{6})$/},
});

const sizeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  price: { type: Number, required: true },
});

const productsmodelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  sale: { type: Boolean, default: false },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "categorymodel",
    required: true
  },


  discount: {
  code: { type: String },
  percent: { type: Number },
  expiresAt: { type: Date },
},



  description: { type: String, required: true },
  images: [
  {
    url: {
      type: String,
      required: true,
    },
    colour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color",
    },
  },
],
  colors: [colorSchema],

  sizes: [sizeSchema],
}, { timestamps: true });

const productsmodel = mongoose.models.productsmodel || mongoose.model("productsmodel", productsmodelSchema);

export default productsmodel;

