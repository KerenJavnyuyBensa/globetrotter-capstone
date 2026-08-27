require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// DESTINATION DATA
// International + Cameroon destinations
// =====================================================

const destinations = [
  // ============================
  // INTERNATIONAL DESTINATIONS
  // ============================

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

  // ============================
  // CAMEROON DESTINATIONS
  // ============================

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

  {
    id: 11,
    name: "Mount Cameroon",
    country: "Cameroon",
    city: "Buea",
    area: "Southwest Region",
    category: "Mountain",
    description:
      "One of Africa's highest volcanic mountains and a popular destination for hiking and nature exploration.",
    latitude: 4.2037,
    longitude: 9.1703,
  },

  {
    id: 12,
    name: "Kribi Beach",
    country: "Cameroon",
    city: "Kribi",
    area: "South Region",
    category: "Beach",
    description:
      "A beautiful coastal destination known for its beaches, ocean views, and relaxed atmosphere.",
    latitude: 2.9406,
    longitude: 9.9103,
  },

  {
    id: 13,
    name: "Limbe Beach",
    country: "Cameroon",
    city: "Limbe",
    area: "Southwest Region",
    category: "Beach",
    description:
      "A popular coastal destination with black volcanic sand, ocean views, and nearby attractions.",
    latitude: 4.0167,
    longitude: 9.2167,
  },

  {
    id: 14,
    name: "Mefou National Park",
    country: "Cameroon",
    city: "Yaoundé",
    area: "Centre Region",
    category: "Wildlife",
    description:
      "A wildlife sanctuary near Yaoundé where visitors can experience Cameroon's rich biodiversity.",
    latitude: 3.7447,
    longitude: 11.5167,
  },

  {
    id: 15,
    name: "Waza National Park",
    country: "Cameroon",
    city: "Waza",
    area: "Far North Region",
    category: "Wildlife",
    description:
      "A famous national park known for wildlife, savanna landscapes, and safari experiences.",
    latitude: 11.3447,
    longitude: 14.6917,
  },

  {
    id: 16,
    name: "Ekom-Nkam Waterfalls",
    country: "Cameroon",
    city: "Melong",
    area: "Littoral Region",
    category: "Nature",
    description:
      "Spectacular waterfalls surrounded by lush tropical scenery in the Littoral Region.",
    latitude: 5.1133,
    longitude: 9.9667,
  },

  {
    id: 17,
    name: "Foumban",
    country: "Cameroon",
    city: "Foumban",
    area: "West Region",
    category: "Culture",
    description:
      "A historic cultural destination famous for traditional crafts, royal heritage, and the Bamoun culture.",
    latitude: 5.7266,
    longitude: 10.8980,
  },

  {
    id: 18,
    name: "Dschang",
    country: "Cameroon",
    city: "Dschang",
    area: "West Region",
    category: "Culture",
    description:
      "A scenic highland destination known for its cool climate, landscapes, and cultural heritage.",
    latitude: 5.4475,
    longitude: 10.0665,
  },

  {
    id: 19,
    name: "Bamenda",
    country: "Cameroon",
    city: "Bamenda",
    area: "Northwest Region",
    category: "Mountain",
    description:
      "A highland city surrounded by beautiful hills, valleys, and scenic landscapes.",
    latitude: 5.9597,
    longitude: 10.1459,
  },

  {
    id: 20,
    name: "Yaoundé",
    country: "Cameroon",
    city: "Yaoundé",
    area: "Centre Region",
    category: "City",
    description:
      "The capital city of Cameroon, known for its hills, cultural attractions, institutions, and vibrant city life.",
    latitude: 3.8480,
    longitude: 11.5021,
  },
];

// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "Destination Service is running",
    service: "destination-service",
    port: process.env.PORT || 5002,
  });
});

// =====================================================
// GET ALL DESTINATIONS
// =====================================================

app.get("/destinations", (req, res) => {
  res.status(200).json(destinations);
});

// =====================================================
// GET ONE DESTINATION
// =====================================================

app.get("/destinations/:id", (req, res) => {
  const destination = destinations.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  res.status(200).json(destination);
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(
    `Destination Service is running on http://localhost:${PORT}`
  );
});