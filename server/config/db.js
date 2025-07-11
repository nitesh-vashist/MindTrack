import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected ✅");
    }catch(error){
        console.log("MongoDB connection failed ❌");
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;