require("dotenv").config(); // import dotenv
const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const cors = require("cors"); // import cors
const authRoutes = require("./routes/auth"); // import auth Routes

const app = express();
const PORT = process.env.PORT || 3001; // Use env variable for port

// --- MIDDLEWARE ---
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable cross-origin requests

// --- ROUTES ---
// Integrate the Authentication routes
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