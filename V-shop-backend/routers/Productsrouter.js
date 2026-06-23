import express from "express";
import { createProduct, deleteProduct, getAllProducts, getcountproducts, getProductById, updatediscount, updateProduct } from "../controllers/productscontroller.js";

const router = express.Router();

router.get("/productsmodel", getAllProducts);
router.post("/productsmodel", createProduct);
router.get("/productsmodel/:id", getProductById);
router.get("/productsmodel/discount/active", updatediscount);
router.put("/productsmodel/:id", updateProduct);
router.delete("/productsmodel/:id", deleteProduct);
router.get("/products/count", getcountproducts);

export default router;