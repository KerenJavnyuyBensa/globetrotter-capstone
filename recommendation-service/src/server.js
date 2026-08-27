const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "Recommendation Service is running",
    service: "recommendation-service",
    port: 5004,
  });
});

// =====================================================
// GET RECOMMENDATIONS
// Get destinations from Destination Service
// =====================================================

app.get("/recommendations", async (req, res) => {
  try {
    const response = await fetch(
      "http://localhost:5002/destinations"
    );

    if (!response.ok) {
      throw new Error(
        `Destination Service returned status ${response.status}`
      );
    }

    const destinations = await response.json();

    // Give every destination a basic match score.
    // Later we can make this personalized based on
    // the user's preferences.
    const recommendations = destinations.map((destination) => ({
      ...destination,
      match_score: 100,
    }));

    res.status(200).json({
      message: "Recommended destinations",
      count: recommendations.length,
      recommendations: recommendations,
    });
  } catch (error) {
    console.error(
      "Recommendation Service Error:",
      error.message
    );

    res.status(502).json({
      message: "Destination Service unavailable",
      error: error.message,
    });
  }
});

// =====================================================
// START SERVER
// =====================================================

const PORT = 5004;

app.listen(PORT, () => {
  console.log(
    `Recommendation Service running on http://localhost:${PORT}`
  );
});