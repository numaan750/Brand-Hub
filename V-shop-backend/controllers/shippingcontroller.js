import shippingmodel from "../models/shippingmodel.js";

export const getAllShipping = async (req, res) => {
    try {
        const shipping = await shippingmodel.find();
        res.status(200).json(shipping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getShippingById = async (req, res) => {
    try {
        const shipping = await shippingmodel.findById(req.params.id);
        if (shipping) {
            res.status(200).json(shipping);
        } else {
            res.status(404).json({ message: "Shipping not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createShipping = async (req, res) => {
    try {
        const shipping = new shippingmodel(req.body);
        await shipping.save();
        res.status(201).json(shipping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateShipping = async (req, res) => {
    try {
        const shipping = await shippingmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (shipping) {
            res.status(200).json(shipping);
        } else {
            res.status(404).json({ message: "Shipping not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const deleteShipping = async (req, res) => {
    try {
        const shipping = await shippingmodel.findByIdAndDelete(req.params.id);
        if (shipping) {
            res.status(200).json({ message: "Shipping deleted successfully" });
        } else {
            res.status(404).json({ message: "Shipping not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


