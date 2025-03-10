const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoute");
const checkoutRoute = require("./routes/chechoutRoute");
const orderRouter = require("./routes/orderRoute");
const uploadRouter = require("./routes/uploadRoute");
const subscriberRoute = require("./routes/subscriberRoute");
const adminRoute = require("./routes/adminRoute");
const productAdminRoute = require("./routes/productAdminRoute");
const adminOrder = require("./routes/adminOrderRoute");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8090;



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRouter);
app.use("/api/upload",uploadRouter );
app.use("/api",subscriberRoute)

// admin
app.use("/api/admin",adminRoute)
app.use("/api/product-Admin",productAdminRoute)
app.use("/api/admin-order",adminOrder)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
