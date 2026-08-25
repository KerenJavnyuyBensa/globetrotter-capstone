const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Destination data used for recommendations
const destinations = [
    {
        id: 1,
        name: "Paris",
        country: "France",
        category: "City",
        description: "The City of Light"
    },
    {
        id: 2,
        name: "Dubai",
        country: "UAE",
        category: "Luxury",
        description: "Modern city with world-class attractions"
    },
    {
        id: 3,
        name: "Cape Town",
        country: "South Africa",
        category: "Beach",
        description: "Beautiful coastline and mountains"
    },
    {
        id: 1785411307403,
        name: "Nairobi",
        country: "Kenya",
        category: "Wildlife",
        description: "Safari and national parks"
    }
];

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Recommendation Service is running",
        service: "recommendation-service",
        port: 5004
    });
});

// GET recommendations
app.get("/recommendations", (req, res) => {
    res.status(200).json({
        message: "Recommended destinations",
        recommendations: destinations
    });
});

const PORT = 5004;

app.listen(PORT, () => {
    console.log(`Recommendation Service running on http://localhost:${PORT}`);
});