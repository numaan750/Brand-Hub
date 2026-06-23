import express from "express";
import { createShipping, deleteShipping, getAllShipping, getShippingById, updateShipping } from "../controllers/shippingcontroller.js";



const router = express.Router();



router.get("/shippingmodel", getAllShipping);
router.post("/shippingmodel", createShipping);
router.get("/shippingmodel/:id", getShippingById);
router.put("/shippingmodel/:id", updateShipping);
router.delete("/shippingmodel/:id", deleteShipping);


export default router;