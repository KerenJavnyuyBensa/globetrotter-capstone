    const express = require("express");
const crypto = require("crypto");

const { readData, writeData } = require("../utils/dataAccess");

const router = express.Router();


// REGISTER
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            error: "Username, email, and password are required"
        });
    }

    const data = readData();

    const existingUser = data.users.find(
        user => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        return res.status(409).json({
            error: "Email is already registered"
        });
    }

    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const newUser = {
        id: crypto.randomUUID(),
        username,
        email,
        password: hashedPassword,
        role: "Student"
    };

    data.users.push(newUser);
    writeData(data);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        }
    });
});


// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    const data = readData();

    const user = data.users.find(
        user => user.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
        return res.status(401).json({
            error: "Invalid email or password"
        });
    }

    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    if (hashedPassword !== user.password) {
        return res.status(401).json({
            error: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role || "Student"
        }
    });
});


module.exports = router;