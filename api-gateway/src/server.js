const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ============================
// GATEWAY TEST
// ============================
app.get("/", (req, res) => {
    res.json({
        message: "GlobeTrotter API Gateway is running",
        service: "api-gateway",
        port: 5000
    });
});

// ============================
// DESTINATION SERVICE
// ============================
app.get("/destinations", async (req, res) => {
    try {
        const response = await fetch(
            "http://localhost:5002/destinations"
        );

        const data = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        res.status(502).json({
            message: "Destination Service unavailable",
            error: error.message
        });
    }
});

// ============================
// RECOMMENDATION SERVICE
// ============================
app.get("/recommendations", async (req, res) => {
    try {
        const response = await fetch(
            "http://localhost:5004/recommendations"
        );

        const data = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        res.status(502).json({
            message: "Recommendation Service unavailable",
            error: error.message
        });
    }
});

// ============================
// ITINERARY SERVICE
// ============================
app.get("/itineraries", async (req, res) => {
    try {
        const response = await fetch(
            "http://localhost:5003/itineraries"
        );

        const data = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        res.status(502).json({
            message: "Itinerary Service unavailable",
            error: error.message
        });
    }
});

// ============================
// START SERVER
// ============================
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});