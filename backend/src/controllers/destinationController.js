const crypto = require("crypto");

const { readData, writeData } = require("../utils/dataAccess");

// =======================
// GET ALL DESTINATIONS
// =======================
exports.getDestinations = (req, res) => {
    try {
        const data = readData();

        res.status(200).json(data.destinations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// =======================
// CREATE DESTINATION
// =======================
exports.createDestination = (req, res) => {
    try {
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

        const data = readData();

        const newDestination = {
            id: Date.now(),
            name,
            country,
            category,
            description
        };

        data.destinations.push(newDestination);

        writeData(data);

        res.status(201).json({
            message: "Destination created successfully",
            destination: newDestination
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// =======================
// SEARCH DESTINATIONS
// =======================
exports.searchDestinations = (req, res) => {
    try {
        const keyword = req.query.name?.trim().toLowerCase();

        const data = readData();

        if (!keyword) {
            return res.status(200).json(data.destinations);
        }

        const destinations = data.destinations.filter(destination =>
            destination.name.toLowerCase().includes(keyword) ||
            destination.country.toLowerCase().includes(keyword)
        );

        res.status(200).json(destinations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};