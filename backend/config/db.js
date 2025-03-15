const mongoose = require('mongoose');

const connectDb =async()=>{
    try {
        await mongoose.connect("mongodb+srv://variyapurv4211:purv@cluster0.ykwwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
        process.exit(1)
    }
    
}

module.exports = connectDb;