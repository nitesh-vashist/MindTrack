import express from 'express';
import dotenv from 'dotenv';    
import cors from 'cors';
import connectDB from './config/db.js';
import trackRoutes from './routes/trackRoutes.js';
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", trackRoutes); // Base route for API

app.get("/",(req,res)=>{
    res.send("API is running 🧠");
});

const PORT = process.env.PORT||5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



