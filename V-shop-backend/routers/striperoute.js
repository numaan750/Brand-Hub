import express from "express";
import { createPaymentIntent } from "../controllers/stripecontroller.js";
// import { stripeWebhookHandler } from "../controllers/stripeWebhook.js";

const router = express.Router();

// Stripe checkout route
router.post("/stripe", createPaymentIntent);
// router.post("/webhook", stripeWebhookHandler);


export default router;
