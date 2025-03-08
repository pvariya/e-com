const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8090;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

 app.use("/api/users", userRouter);
 app.use("/api/products", productRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
