 const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/data.json");

// Read JSON data
function readData() {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
}

// Write JSON data
function writeData(data) {
    fs.writeFileSync(
        dataPath,
        JSON.stringify(data, null, 2)
    );
}

module.exports = {
    readData,
    writeData
};