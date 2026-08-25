  const { readData } = require("../utils/dataAccess");


// =======================
// GET RECOMMENDATIONS
// =======================
const getRecommendations = (req, res) => {
    try {

        const data = readData();

        const destinations = data.destinations;


        res.status(200).json({
            message: "Recommended destinations",
            recommendations: destinations
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getRecommendations
};