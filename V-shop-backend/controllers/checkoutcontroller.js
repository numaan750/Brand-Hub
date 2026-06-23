import checkoutmodel from "../models/checkoutmodel.js"


const getcheckout = async (req, res) => {
    try {
        const checkout = await checkoutmodel.find();
        res.status(200).json(checkout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getcheckoutById = async (req, res) => {
    try {
        const checkout = await checkoutmodel.findById(req.params.id);
        if (checkout) {
            res.status(200).json(checkout);
        } else {
            res.status(404).json({ message: "checkout not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createcheckout = async (req, res) => {
    try {
        console.log("📥 Received checkout data:", req.body);

        // ✅ Validate required fields
        const { userId, email, firstname, lastname, address, city, phone, products } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!email || !firstname || !lastname || !address || !city || !phone) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // ✅ Create checkout
        const checkout = new checkoutmodel(req.body);
        await checkout.save();

        console.log("✅ Order created:", checkout);
        res.status(201).json(checkout);
    } catch (error) {
        console.log("❌ Error creating checkout:", error);
        res.status(400).json({ message: error.message });
    }
}

const updatecheckout = async (req, res) => {
    try {
        const checkout = await checkoutmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (checkout) {
            res.status(200).json(checkout);
        } else {
            res.status(404).json({ message: "checkout not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// 🟦 SOFT DELETE (Order moves to Deleted Orders)
// export const softDeleteCheckout = async (req, res) => {
//     try {
//         const checkout = await checkoutmodel.findByIdAndUpdate(
//             req.params.id,
//             { status: "deleted" },
//             { new: true }
//         );

//         if (checkout) {
//             res.status(200).json({ message: "Order moved to deleted list", checkout });
//         } else {
//             res.status(404).json({ message: "Order not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// const deletecheckout = async (req, res) => {
//     try {
//         const checkout = await checkoutmodel.findByIdAndDelete(req.params.id);
//         if (checkout) {
//             res.status(200).json({ message: "checkout deleted successfully" });
//         } else {
//             res.status(404).json({ message: "checkout not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }



//orders k liya 
export const updatestatus = async (req, res) => {
    try {
        const { status } = req.body;  // ✅ Sirf status nikalo
        
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const checkout = await checkoutmodel.findByIdAndUpdate(
            req.params.id, 
            { status: status },  // ✅ Sirf status update karo
            { new: true }
        );
        
        if (checkout) {
            res.status(200).json(checkout);
        } else {
            res.status(404).json({ message: "checkout not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// User k orders by email
export const getcheckoutByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        
        // ✅ Debug logs
        console.log("🔍 Searching for email:", email);
        
        // ✅ Case-insensitive search with trim
        const checkouts = await checkoutmodel.find({ 
            email: { $regex: new RegExp(`^${email.trim()}$`, 'i') }
        });
        
        console.log("📦 Found orders:", checkouts.length);
        console.log("📋 Orders:", checkouts);
        
        res.status(200).json(checkouts);
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: error.message });
    }
}

// ✅ USER ID se orders get karne ka NAYA function
export const getcheckoutByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        console.log("🔍 Searching for userId:", userId);
        
        // ✅ userId se saare orders fetch karo (deleted aur cancelled chod kar)
        const checkouts = await checkoutmodel.find({ 
            userId: userId,
            status: { $nin: ["deleted"] }  // deleted orders exclude
        });
        
        console.log("📦 Found orders:", checkouts.length);
        
        res.status(200).json(checkouts);
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: error.message });
    }
}
// ✅ YE NAYA FUNCTION ADD KARO (Line 59 ke baad)
//  export const permanentDeleteCheckout = async (req, res) => {
//     try {
//         const checkout = await checkoutmodel.findByIdAndDelete(req.params.id);
//         if (checkout) {
//             res.status(200).json({ message: "Order permanently deleted" });
//         } else {
//             res.status(404).json({ message: "Order not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// GET /checkouts?page=1&limit=10
export const getCheckoutsPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status; // ✅ Status query parameter
        const skip = (page - 1) * limit;

        // ✅ Build filter query
        let filterQuery = { status: { $nin: ["deleted"] } };
        
        // ✅ Add status filter if provided and not "all"
        if (status && status !== "all") {
            filterQuery.status = status;
        }

        // Fetch checkouts with pagination and filter
        const [checkouts, total] = await Promise.all([
            checkoutmodel.find(filterQuery)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            checkoutmodel.countDocuments(filterQuery)
        ]);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            data: checkouts,
            page,
            totalPages,
            total,
            limit
        });
    } catch (error) {
        console.error("❌ Error fetching checkouts:", error);
        res.status(500).json({ message: "Failed to fetch checkouts" });
    }
};


// ✅ Get count of new orders (last 24 hours)
export const getNewOrdersCount = async (req, res) => {
    try {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        const count = await checkoutmodel.countDocuments({
            status: { $nin: ["deleted"] },
            createdAt: { $gte: oneDayAgo }
        });

        res.status(200).json({ count });
    } catch (error) {
        console.error("❌ Error fetching new orders count:", error);
        res.status(500).json({ message: "Failed to fetch new orders count" });
    }
};

// ✅ Get new orders (last 24 hours) with full details
export const getNewOrders = async (req, res) => {
    try {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        const orders = await checkoutmodel.find({
            status: { $nin: ["deleted"] },
            createdAt: { $gte: oneDayAgo }
        })
        .sort({ createdAt: -1 }) // Latest first
        .limit(50); // Maximum 50 orders

        res.status(200).json({ orders });
    } catch (error) {
        console.error("❌ Error fetching new orders:", error);
        res.status(500).json({ message: "Failed to fetch new orders" });
    }
};

export const getorderscount = async (req, res) => {
  try {
    const count = await checkoutmodel.countDocuments();

    res.status(200).json({
      success: true,
      totalOrders: count,
    });
  } catch (error) {
    console.error("Error fetching orders count:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await checkoutmodel
      .find({ status: { $nin: ["deleted"] } })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching recent orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ YE FUNCTION ADD KARO (agar already nahi hai)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await checkoutmodel
      .find({ status: { $nin: ["deleted"] } })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching all orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { getcheckout, getcheckoutById, createcheckout, updatecheckout };