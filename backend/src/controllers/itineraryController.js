  const crypto = require("crypto");

const { readData, writeData } = require("../utils/dataAccess");


// =======================
// CREATE ITINERARY
// =======================
exports.createItinerary = (req, res) => {

    try {

        const {
            userId,
            destination,
            days
        } = req.body;


        // Validation
        if (!userId || !destination || !days) {
            return res.status(400).json({
                error: "userId, destination, and days are required"
            });
        }


        const data = readData();


        const newItinerary = {
            id: crypto.randomUUID(),
            userId,
            destination,
            days
        };


        // Save to JSON file
        data.itineraries.push(newItinerary);

        writeData(data);


        res.status(201).json({
            message: "Itinerary created successfully",
            itinerary: newItinerary
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// =======================
// GET ALL ITINERARIES
// =======================
exports.getItineraries = (req, res) => {

    try {

        const data = readData();


        res.status(200).json({
            message: "All itineraries",
            itineraries: data.itineraries
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};