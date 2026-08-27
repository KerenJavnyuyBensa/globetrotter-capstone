const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("=================================");
    console.log("AUTHENTICATION CHECK");
    console.log("Authorization header:", authHeader ? "PRESENT" : "MISSING");
    console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "YES" : "NO");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ No Bearer token");
        console.log("=================================");

        return res.status(401).json({
            message: "Access token required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("✅ TOKEN VALID");
        console.log("User ID:", decoded.id);
        console.log("Role:", decoded.role);
        console.log("=================================");

        req.user = decoded;

        next();

    } catch (error) {

        console.log("❌ TOKEN INVALID");
        console.log("JWT ERROR NAME:", error.name);
        console.log("JWT ERROR MESSAGE:", error.message);
        console.log("=================================");

        return res.status(403).json({
            message: "Invalid or expired token",
            error: error.name
        });
    }
};

module.exports = authenticateToken;