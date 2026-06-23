import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import vuserrouter from "./routers/vuserrouter.js";
import authrouer from "./routers/authrouter.js";
import Productsrouter from "./routers/Productsrouter.js";
import categoryrouter from "./routers/categoryrouter.js";
import vadminrouter from "./routers/vadminrouter.js";
import shippingrouter from "./routers/shippingrouter.js";
import checkoutrouter from "./routers/checkoutrouter.js";
import orderRoutes from "./routers/checkoutrouter.js";
import blogrouter from "./routers/blogrouter.js";
import blogcategory from "./routers/blogcategory.js";
import stripRoute from "./routers/striperoute.js";
import contectrouter from "./routers/contectrouter.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
connectDB();

// ✅ Routes
app.use("/api/auth", authrouer); // Register/Login
app.use("/api", vuserrouter); // CRUD routes
app.use("/api", vadminrouter);

// products k liya
app.use("/api", Productsrouter);
// categories  k liya
app.use("/api", categoryrouter);

// shipping k liya
app.use("/api", shippingrouter);
// chakout k liya
app.use("/api", checkoutrouter);

app.use("/api/orders", orderRoutes);
//blog k liya
app.use("/api", blogrouter);
//blog category k liya
app.use("/api", blogcategory);

//payment k liya
app.use("/api", stripRoute);

//contect k liya 
app.use("/api", contectrouter);


// Default Route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

// Server Start
// const PORT = process.env.PORT || 4000;
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }

export default app;
