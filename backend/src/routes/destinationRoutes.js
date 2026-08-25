 const express = require("express");
const router = express.Router();

const {
    getDestinations,
    createDestination,
    searchDestinations
} = require("../controllers/destinationController");


// Get all destinations
router.get("/", getDestinations);


// Search destinations
router.get("/search", searchDestinations);


// Create destination
router.post("/", createDestination);


module.exports = router;