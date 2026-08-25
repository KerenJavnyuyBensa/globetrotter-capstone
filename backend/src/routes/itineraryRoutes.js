const express = require("express");

const router = express.Router();

const {
    createItinerary,
    getItineraries
} = require("../controllers/itineraryController");

const authenticateToken = require("../middleware/authMiddleware");


// Create itinerary
router.post("/", authenticateToken, createItinerary);


// Get itineraries
router.get("/", authenticateToken, getItineraries);


module.exports = router;