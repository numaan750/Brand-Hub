import express from "express";
import { createcontect, deletecontect, getcontect, markAsRead, updatecontect } from "../controllers/contectcontroller.js";

const router = express.Router();

router.get("/contectmodel", getcontect);
router.post("/contectmodel", createcontect);
router.put("/contectmodel/:id", updatecontect);
router.delete("/contectmodel/:id", deletecontect);
router.patch("/contectmodel/:id/read", markAsRead); // ⭐ YE ROUTE ADD KARO



export default router;