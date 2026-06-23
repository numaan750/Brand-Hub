// import Stripe from "stripe";
// import dotenv from "dotenv";
// import checkoutmodel from "../models/checkoutmodel.js";

// dotenv.config();
// const stripe = new Stripe(process.env.STRIP_SECRETE_KEY);

// export const stripeWebhookHandler = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
//   } catch (err) {
//     console.error("Webhook signature verification failed.", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the checkout.session.completed event
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;
//     const orderId = session.metadata?.orderId;

//     try {
//       if (orderId) {
//         const updated = await checkoutmodel.findByIdAndUpdate(orderId, {
//           status: "paid",
//           paymentIntent: session.payment_intent || null,
//           paidAt: new Date()
//         }, { new: true });

//         console.log("Order updated from webhook:", updated?._id);
//       } else {
//         console.warn("No orderId in session metadata");
//       }
//     } catch (err) {
//       console.error("Error updating order from webhook:", err);
//     }
//   }

//   // Return 200 to acknowledge receipt of the event
//   res.json({ received: true });
// };
