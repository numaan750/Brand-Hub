import blogmodel from "../models/blogmodel.js";

export const getblog = async (req, res) => {
        try {
            const blog = await blogmodel.find().populate('category');
            res.status(200).json(blog);
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    export const getblogById = async (req, res) => {
        try {
            const blog = await blogmodel.findById(req.params.id).populate('category');
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
 export const createblog = async (req, res) => {
        try {
            const blog = new blogmodel(req.body);
            await blog.save();
            await blog.populate('category');
            res.status(201).json(blog);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };


    export const updateblog = async (req, res) => {
        try {
            const blog = await blogmodel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category');
            res.status(200).json(blog);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    export const deleteblog = async (req, res) => {
        try {
            const blog = await blogmodel.findByIdAndDelete(req.params.id);
            res.status(200).json(blog);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    
