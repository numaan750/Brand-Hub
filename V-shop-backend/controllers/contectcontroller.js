import contectmodel from "../models/contectmodel.js";
import nodemailer from "nodemailer";

export const getcontect = async (req, res) => {
  try {
    const contect = await contectmodel.find();
    // ✅ Return in correct format
    res.status(200).json({
      success: true,
      data: contect,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createcontect = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save to DB
    const contect = new contectmodel({ name, email, message });
    await contect.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "🔔 Some One Send the Message! ",
      html: `
        <h2>New Message Recived 🔔</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // ✅ Response
    res.status(201).json({
      success: true,
      message: "Contact form submitted and email sent.",
      data: contect,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

export const updatecontect = async (req, res) => {
  try {
    const contect = await contectmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(contect);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletecontect = async (req, res) => {
  try {
    const contect = await contectmodel.findByIdAndDelete(req.params.id);
    if (contect) {
      res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contect = await contectmodel.findByIdAndUpdate(
      id,
      { read: true }, // ⭐ Ye read ko true kar dega
      { new: true }   // Updated document return karega
    );
    
    if (!contect) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    
    res.status(200).json({
      success: true,
      data: contect,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};