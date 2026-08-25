const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Destination data from Phase 1
let destinations = [
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
        message: "Destination Service is running",
        service: "destination-service",
        port: 5002
    });
});

// GET all destinations
app.get("/destinations", (req, res) => {
    res.status(200).json(destinations);
});

// SEARCH destinations
app.get("/destinations/search", (req, res) => {
    const keyword = req.query.name?.trim();

    if (!keyword) {
        return res.status(200).json(destinations);
    }

    const results = destinations.filter(destination =>
        destination.name.toLowerCase().includes(keyword.toLowerCase()) ||
        destination.country.toLowerCase().includes(keyword.toLowerCase())
    );

    res.status(200).json(results);
});

// CREATE destination
app.post("/destinations", (req, res) => {
    const {
        name,
        country,
        category,
        description
    } = req.body;

    if (!name || !country || !category || !description) {
        return res.status(400).json({
            message: "Name, country, category, and description are required"
        });
    }

    const newDestination = {
        id: Date.now(),
        name,
        country,
        category,
        description
    };

    destinations.push(newDestination);

    res.status(201).json({
        message: "Destination created successfully",
        destination: newDestination
    });
});

const PORT = 5002;

app.listen(PORT, () => {
    console.log(`Destination Service running on http://localhost:${PORT}`);
});