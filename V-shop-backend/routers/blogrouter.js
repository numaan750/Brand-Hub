import express from "express";
import { createblog, deleteblog, getblog, getblogById, updateblog } from "../controllers/blogcontroller.js";

const router = express.Router();


router.get("/blogmodel", getblog);
router.post("/blogmodel", createblog);
router.get("/blogmodel/:id", getblogById);
router.put("/blogmodel/:id", updateblog);
router.delete("/blogmodel/:id", deleteblog);


export default router;