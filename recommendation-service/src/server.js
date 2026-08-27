const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ============================
// CONFIGURATION
// ============================

const PORT = 5004;
const DESTINATION_SERVICE_URL =
    "http://localhost:5002/destinations";

// ============================
// HOME ROUTE
// ============================

app.get("/", (req, res) => {
    res.json({
        message: "Recommendation Service is running",
        service: "recommendation-service",
        port: PORT
    });
});

// ============================
// GET RECOMMENDATIONS
// ============================

app.get("/recommendations", async (req, res) => {
    try {

        // Get destinations from Destination Service
        const response = await fetch(
            DESTINATION_SERVICE_URL
        );

        if (!response.ok) {
            throw new Error(
                `Destination Service returned ${response.status}`
            );
        }

        const destinations = await response.json();

        // Make sure we received an array
        if (!Array.isArray(destinations)) {
            throw new Error(
                "Invalid destination data received"
            );
        }

        // For now, return all available destinations.
        // Later we can add personalized scoring.
        const recommendations = destinations.map(
            (destination) => ({
                ...destination,
                match_score: 100
            })
        );

        res.status(200).json({
            message: "Recommended destinations",
            count: recommendations.length,
            recommendations
        });

    } catch (error) {

        console.error(
            "Recommendation Service Error:",
            error.message
        );

        res.status(502).json({
            message:
                "Unable to get recommendations from Destination Service",
            error: error.message
        });
    }
});

// ============================
// START SERVER
// ============================

app.listen(PORT, () => {
    console.log(
        `Recommendation Service running on http://localhost:${PORT}`
    );
});