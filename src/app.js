const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import routes
const cabinRoutes = require("./routes/cabinRoutes");
const guestRoutes = require("./routes/guestRoutes");
const settingRoutes = require("./routes/settingRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const idsRoutes = require("./routes/idsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(
    cors({
        origin: ["http://localhost:5173", "https://soroush-the-wild-oasis.vercel.app"],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

// Custom middleware for delay
app.use(async (req, res, next) => {
    // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`); // Log requests
    await new Promise(r => setTimeout(r, 800)); // Delay simulation
    next();
});

// API Routes
app.get("/", (req, res) => {
    res.send("Hello from The Wild Oasis backend!");
});

app.use("/api/cabins", cabinRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/cabinIds-guestIds", idsRoutes);
app.use("/api/auth", authRoutes);

// Catch-all for 404 Not Found
app.use((req, res, next) => {
    console.log(`--- Incoming Request ---`);
    res.status(404).json({ message: "API route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    console.error("Global Error Handler:", err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack in dev only
    });
});

module.exports = app;
