import express from "express";
import { createVendor, deleteVendor, getAllvendors, getVendorById, loginvadminmodels, toggleVendorStatus, updateVendor } from "../controllers/vadmincontroller.js";


const router = express.Router();

router.post("/vadminmodels", loginvadminmodels);


// Vendor management routes
router.get("/vendors", getAllvendors);
router.get("/vendors/:id", getVendorById);
router.post("/vendors", createVendor);
router.put("/vendors/:id", updateVendor);
router.delete("/vendors/:id", deleteVendor);
router.patch("/vendors/:id/toggle-status", toggleVendorStatus);

export default router;