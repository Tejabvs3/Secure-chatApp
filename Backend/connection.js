const mongoose = require('mongoose');
require('dotenv').config();



const connectDB = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.spuuoeo.mongodb.net/?retryWrites=true&w=majority`);
        console.log('MongoDB connected!!');
    } catch (err){
        console.log("Failed to connect to MongoDB",err);
    }
};
connectDB();