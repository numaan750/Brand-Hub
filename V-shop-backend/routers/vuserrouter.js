import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getcountusers,
  getUserById,
  updateUser,
} from "../controllers/vusercontroller.js";

const router = express.Router();

router.get("/vusermodel", getAllUsers);
router.get("/vusermodel/:id", getUserById);
router.put("/vusermodel/:id", updateUser);
router.delete("/vusermodel/:id", deleteUser);
router.get("/users/count", getcountusers);  // Ye theek hai, no change needed

export default router;
