const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { readData, writeData } = require("../utils/dataAccess");

// =======================
// REGISTER USER
// =======================
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }

        // Clean input
        const cleanUsername = username.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const data = readData();

        // Make sure users exists
        if (!Array.isArray(data.users)) {
            data.users = [];
        }

        // Check if user already exists
        const existingUser = data.users.find(
            user =>
                user.email &&
                user.email.trim().toLowerCase() === cleanEmail
        );

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            id: crypto.randomUUID(),
            username: cleanUsername,
            email: cleanEmail,
            password: hashedPassword,
            role: "Student"
        };

        // Save user
        data.users.push(newUser);
        writeData(data);

        console.log("REGISTERED USER:", cleanEmail);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// =======================
// LOGIN USER
// =======================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("=================================");
        console.log("LOGIN REQUEST");
        console.log("Email received:", email);

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Clean email
        const cleanEmail = email.trim().toLowerCase();

        const data = readData();

        // Make sure users exists
        if (!Array.isArray(data.users)) {
            return res.status(500).json({
                message: "Users database is not available"
            });
        }

        console.log("Users in database:", data.users.length);

        // Find user
        const user = data.users.find(
            item =>
                item.email &&
                item.email.trim().toLowerCase() === cleanEmail
        );

        if (!user) {
            console.log("USER NOT FOUND:", cleanEmail);
            console.log("=================================");

            return res.status(404).json({
                message: "User not found. Please register first."
            });
        }

        console.log("USER FOUND:", user.email);

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            console.log("PASSWORD DOES NOT MATCH");
            console.log("=================================");

            return res.status(401).json({
                message: "Invalid password"
            });
        }

        console.log("PASSWORD CORRECT");

        // Make sure JWT secret exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing");

            return res.status(500).json({
                message: "JWT secret is not configured"
            });
        }

        // Create fresh JWT
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role || "Student"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        console.log("NEW JWT CREATED");
        console.log("User ID:", user.id);
        console.log("Role:", user.role || "Student");
        console.log("=================================");

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role || "Student"
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};