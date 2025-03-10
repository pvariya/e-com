const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/productData");
const Cart = require("./models/Cart");

mongoose.connect("mongodb://127.0.0.1:27017/e-com");
const data = async () => {
 try {
     await Product.deleteMany();
     await User.deleteMany();
     await Cart.deleteMany();
     const createduser = await User.create({
       name: "purv",
       email: "purv@gmail.com",
       password: "123456",
       role: "admin",
     });
   
     const userId = createduser._id;
   
     const sampleProducts = products.map((ele) => {
       return { ...ele, user: userId };
     });
   
     await Product.insertMany(sampleProducts);
     console.log("Product inserted successfully");
     process.exit();
 } catch (error) {
    console.log("err seeding data",error.message);
    process.exit(1);
    
 }
};

data()
