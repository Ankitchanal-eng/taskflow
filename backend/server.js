require("dotenv").config();
console.log("Loaded JWT_SECRET:", JSON.stringify(process.env.JWT_SECRET));
console.log("Length:", process.env.JWT_SECRET.length);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const authRoutes = require("./routes/auth");
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

// --- CRITICAL MIDDLEWARE FIX ---

// 1. Body Parser: Must come first to populate req.body
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Added for robustness

// 2. CORS: Must be fully configured and applied before secure routes.
app.use(cors({
    origin: 'https://taskflow-app-roan.vercel.app/', // Must match your Vite frontend URL exactly
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
    // CRITICAL: Explicitly expose/allow headers, especially 'Authorization'
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], 
}));

// --- ROUTES ---

// Task Routes (These require the Authorization header checked by CORS)
app.use('/api/tasks', taskRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

// --- DATABASE CONNECTION & SERVER STARTUP ---

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`The server is running on ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
}

connectDB();