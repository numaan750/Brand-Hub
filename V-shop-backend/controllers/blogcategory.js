import blogcategiry from "../models/blogcategory.js";

export const getAllBlogCategory = async (req, res) => {
    try {
        const blogCategory = await blogcategiry.find();
        res.status(200).json(blogCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogCategoryById = async (req, res) => {
    try {
        const blogCategory = await blogcategiry.findById(req.params.id);
        if (blogCategory) {
            res.status(200).json(blogCategory);
        } else {
            res.status(404).json({ message: "Blog Category not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBlogCategory = async (req, res) => {
    try {
        const blogCategory = await blogcategiry.create(req.body);
        res.status(200).json(blogCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlogCategory = async (req, res) => {
    try {
        const blogCategory = await blogcategiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(blogCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlogCategory = async (req, res) => {
    try {
        const blogCategory = await blogcategiry.findByIdAndDelete(req.params.id);
        if (blogCategory) {
            res.status(200).json({ message: "Blog Category deleted successfully" });
        } else {
            res.status(404).json({ message: "Blog Category not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

