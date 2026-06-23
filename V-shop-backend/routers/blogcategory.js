import express from "express";
import { createBlogCategory, deleteBlogCategory, getAllBlogCategory, getBlogCategoryById, updateBlogCategory } from "../controllers/blogcategory.js";

const router = express.Router();


router.get("/blogcategorymodel", getAllBlogCategory);
router.get("/blogcategorymodel/:id", getBlogCategoryById);
router.post("/blogcategorymodel", createBlogCategory);
router.put("/blogcategorymodel/:id", updateBlogCategory);
router.delete("/blogcategorymodel/:id", deleteBlogCategory);


export default router;