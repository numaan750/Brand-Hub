import express from "express";
import { createcheckout,getAllOrders,getcheckout, getcheckoutByEmail, getcheckoutById, getcheckoutByUserId, getCheckoutsPaginated, getNewOrders, getNewOrdersCount, getorderscount, getRecentOrders, updatecheckout, updatestatus } from "../controllers/checkoutcontroller.js";


const router = express.Router();    


router.get("/checkoutmodel", getcheckout);
router.post("/checkoutmodel", createcheckout);
router.get("/checkoutmodel/:id", getcheckoutById);
router.put("/checkoutmodel/:id", updatecheckout);
// router.delete("/checkoutmodel/:id", deletecheckout);
router.put("/checkoutmodel/:id/status", updatestatus);
router.get("/checkoutmodel/user/:userId", getcheckoutByUserId);  // ✅ NAYA
router.get("/checkoutmodel/email/:email", getcheckoutByEmail);
// router.delete("/checkoutmodel/:id/permanent-delete", permanentDeleteCheckout);
// router.put("/checkoutmodel/:id/soft-delete", softDeleteCheckout);
router.get("/paginated", getCheckoutsPaginated);      // ✅ Paginated checkouts
router.get("/new-count", getNewOrdersCount);  // ✅ Yeh route add karo
router.get("/new-orders", getNewOrders);  // ✅ Yeh route add karo
router.get("/orders/count", getorderscount);
// ✅ More specific route FIRST
router.get("/recent", getRecentOrders);
// ✅ General route AFTER
router.get("/orders", getAllOrders);




export default router;