const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        destination: {
            type: String,
            required: true
        },

        days: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);