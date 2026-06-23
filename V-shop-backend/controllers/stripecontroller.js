import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIP_SECRETE_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image],
          metadata: {
            id: product._id,
          },
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/ordercarts?payment_status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/ordercarts?payment_status=cancelled`,
    });

    res.json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({
      message: error.message,
      error: process.env.NODE_ENV === "development" ? error : {},
    });
  }
};
