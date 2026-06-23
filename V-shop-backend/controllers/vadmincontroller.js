import vadminmodel from "../models/vadminmodel.js";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

const loginvadminmodels = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingadmin = await vadminmodel.findOne({ email });
    if (!existingadmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingadmin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingadmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: existingadmin._id,
        username: existingadmin.username,
        email: existingadmin.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllvendors = async (req, res) => {
  try {
    const vendors = await vadminmodel
      .find({ role: "vendor" })
      .select("-password");
    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await vadminmodel
      .findOne({
        _id: req.params.id,
        role: "vendor",
      })
      .select("-password");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVendor = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      shopName,
      ownerName,
      phone,
      address,
      commissionRate,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !shopName ||
      !ownerName ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await vadminmodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await vadminmodel.create({
      username,
      email,
      password: hashedPassword,
      role: "vendor", 
      shopName,
      ownerName,
      phone,
      address,
      commissionRate: commissionRate || 10,
      status: "active",
    });

    res.status(201).json({
      success: true,
      message: "Vendor created successfully!",
      vendor: {
        id: vendor._id,
        username: vendor.username,
        email: vendor.email,
        shopName: vendor.shopename,
        ownerName: vendor.ownername,
        phone: vendor.phone,
        address: vendor.address,
        commissionRate: vendor.commissionrate,
        status: vendor.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      email,
      shopName,
      ownerName,
      phone,
      address,
      commissionRate,
      status,
    } = req.body;

    const vendor = await vadminmodel.findOne({ _id: id, role: "vendor" });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (username) vendor.username = username;
    if (email) vendor.email = email;
    if (shopName) vendor.shopename = shopName;
    if (ownerName) vendor.ownername = ownerName;
    if (phone) vendor.phone = phone;
    if (address) vendor.address = address;
    if (commissionRate !== undefined) vendor.commissionrate = commissionRate;
    if (status) vendor.status = status;

    await vendor.save();

    res.status(200).json({
      success: true,
      message: "Vendor updated successfully!",
      vendor: {
        id: vendor._id,
        username: vendor.username,
        email: vendor.email,
        shopName: vendor.shopename,
        ownerName: vendor.ownername,
        phone: vendor.phone,
        status: vendor.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await vadminmodel.findOneAndDelete({
      _id: id,
      role: "vendor",
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleVendorStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await vadminmodel.findOne({ _id: id, role: "vendor" });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.status = vendor.status === "active" ? "inactive" : "active";
    await vendor.save();

    res.status(200).json({
      success: true,
      message: `Vendor status changed to ${vendor.status}`,
      status: vendor.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { loginvadminmodels };
