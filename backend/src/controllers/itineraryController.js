const crypto = require("crypto");

const { readData, writeData } = require("../utils/dataAccess");

// CREATE ITINERARY
exports.createItinerary = (req, res) => {
    try {
        const { destination, days } = req.body;

        // Get the logged-in user's ID from the JWT
        const userId = req.user.id;

        if (!destination || !days) {
            return res.status(400).json({
                message: "Destination and number of days are required"
            });
        }

        const data = readData();

        // Make sure itineraries exists
        if (!Array.isArray(data.itineraries)) {
            data.itineraries = [];
        }

        const newItinerary = {
            id: crypto.randomUUID(),
            userId: userId,
            destination: destination,
            days: Number(days),
            createdAt: new Date().toISOString()
        };

        data.itineraries.push(newItinerary);

        writeData(data);

        return res.status(201).json({
            message: "Itinerary created successfully",
            itinerary: newItinerary
        });

    } catch (error) {
        console.error("Create itinerary error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};


// GET USER ITINERARIES
exports.getItineraries = (req, res) => {
    try {
        const userId = req.user.id;

        const data = readData();

        if (!Array.isArray(data.itineraries)) {
            data.itineraries = [];
        }

        const userItineraries = data.itineraries.filter(
            itinerary => itinerary.userId === userId
        );

        return res.status(200).json({
            message: "User itineraries",
            itineraries: userItineraries
        });

    } catch (error) {
        console.error("Get itineraries error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};