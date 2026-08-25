    const express = require("express");

const router = express.Router();

const recommendationController = require("../controllers/recommendationController");


// Get recommendations
router.get("/", recommendationController.getRecommendations);


module.exports = router;