require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary local destination data
// We will move this back to MongoDB later.
const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    category: "City",
    description: "The City of Light",
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: 2,
    name: "Dubai",
    country: "UAE",
    category: "Luxury",
    description: "Modern city with world-class attractions",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  {
    id: 3,
    name: "Cape Town",
    country: "South Africa",
    category: "Beach",
    description: "Beautiful coastline and mountains",
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    id: 4,
    name: "Nairobi",
    country: "Kenya",
    category: "Wildlife",
    description: "Safari and national parks",
    latitude: -1.2921,
    longitude: 36.8219,
  },
  {
    id: 5,
    name: "Tokyo",
    country: "Japan",
    category: "Culture",
    description: "A vibrant city blending tradition and technology",
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    id: 6,
    name: "New York",
    country: "USA",
    category: "City",
    description: "The city that never sleeps",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: 7,
    name: "London",
    country: "United Kingdom",
    category: "History",
    description: "A historic city filled with culture and landmarks",
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    id: 8,
    name: "Rome",
    country: "Italy",
    category: "History",
    description: "Ancient history, architecture, and Italian culture",
    latitude: 41.9028,
    longitude: 12.4964,
  },
  {
    id: 9,
    name: "Cairo",
    country: "Egypt",
    category: "Ancient",
    description: "Gateway to the pyramids and ancient Egyptian history",
    latitude: 30.0444,
    longitude: 31.2357,
  },
  {
    id: 10,
    name: "ICT University",
    country: "Cameroon",
    city: "Yaoundé",
    area: "Messassi",
    category: "Education",
    description: "ICT University campus in Messassi, Yaoundé",
    latitude: 3.9436,
    longitude: 11.5678,
  },
];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Destination Service is running",
    service: "destination-service",
    port: process.env.PORT || 5002,
  });
});

// Get all destinations
app.get("/destinations", (req, res) => {
  res.json(destinations);
});

// Get one destination
app.get("/destinations/:id", (req, res) => {
  const destination = destinations.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  res.json(destination);
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Destination Service is running on port ${PORT}`);
});