import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000 // Use the PORT from environment variables

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', //frontend server url
    credentials: true,
}));

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is started on port ${port}`)
})