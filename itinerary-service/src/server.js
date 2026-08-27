const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// ITINERARY SERVICE
// ==========================================

let itineraries = [
    {
        id: 1,
        userId: "adb349a5-57f4-4d0e-9555-eea726f31a27",
        destination: "Paris",
        days: 5
    },
    {
        id: "eb267252-268b-479f-9561-c3fb21c863aa",
        userId: "cfa3faca-f7b7-428b-9c50-24f7a4eb69a4",
        destination: "Paris",
        days: 5
    },
    {
        id: "92ed33d8-25d9-4859-a314-36fe8f3239fb",
        userId: "adb349a5-57f4-4d0e-9555-eea726f31a27",
        destination: "Nairobi",
        days: 4
    }
];

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "Itinerary Service is running",
        service: "itinerary-service",
        port: 5003
    });
});

// ==========================================
// GET ALL ITINERARIES
// ==========================================

app.get("/itineraries", (req, res) => {
    res.status(200).json({
        message: "All itineraries",
        itineraries
    });
});

// ==========================================
// CREATE ITINERARY
// ==========================================

app.post("/itineraries", (req, res) => {

    const {
        userId,
        destination,
        days
    } = req.body;

    // Validation
    if (!userId || !destination || !days) {
        return res.status(400).json({
            message: "userId, destination and days are required"
        });
    }

    // Validate number of days
    if (Number(days) <= 0) {
        return res.status(400).json({
            message: "Days must be greater than 0"
        });
    }

    const newItinerary = {
        id: crypto.randomUUID(),
        userId,
        destination,
        days: Number(days)
    };

    itineraries.push(newItinerary);

    res.status(201).json({
        message: "Itinerary created successfully",
        itinerary: newItinerary
    });
});

// ==========================================
// GET ITINERARIES FOR A USER
// ==========================================

app.get("/itineraries/user/:userId", (req, res) => {

    const userId = req.params.userId;

    const userItineraries = itineraries.filter(
        itinerary => itinerary.userId === userId
    );

    res.status(200).json({
        message: "User itineraries",
        itineraries: userItineraries
    });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = 5003;

app.listen(PORT, () => {
    console.log(
        `Itinerary Service running on http://localhost:${PORT}`
    );
});