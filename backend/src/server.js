const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/destinations", destinationRoutes);
app.use("/recommendations", recommendationRoutes);
app.use("/itineraries", itineraryRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "GlobeTrotter API is running"
    });
});

const PORT = process.env.PORT || 5000;

// Only start the server when this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`GlobeTrotter Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;