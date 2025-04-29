// app.js
require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4700;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const siteUsersDB = require('./models/siteUsersDB.js');
const axios = require('axios');
// Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware Setup
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 }));

// CORS Configuration
const allowedOrigins = [
    "https://shotkut.vercel.app",
    "https://shotkut.com",
    "https://www.shotkut.com",
    "http://localhost:3456",
    "http://localhost:3001",
    "http://localhost:3000"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// Cookie Debugging Middleware
app.use((req, res, next) => {
    next();
});

// --- GOOGLE AUTH NEW FLOW ---
app.post('/auth/google', async (req, res) => {
    console.log("Received /auth/google request body:", req.body); // ✅ Log 6
    const { credential } = req.body;
    
    try {
        // Call Google API here to verify access token and fetch user profile
        const googleUserInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${credential}`,
            },
        });
        
        console.log("Fetched Google User Info:", googleUserInfo.data); // ✅ Log 7

        const { email, given_name, family_name } = googleUserInfo.data;

        let user = await siteUsersDB.findOne({ email });

        if (!user) {
            user = new siteUsersDB({
                firstName: given_name,
                lastName: family_name,
                email: email,
                password: '', // Google user — no password
                role: 'USER',
            });
            console.log("Creating new user...");
        } else {
            console.log("Existing user found:", user);
        }
        
        // Now generate your accessToken and refreshToken
        const accessToken = jwt.sign(
            {        
                userId: user._id,
                username: user.email,
                role: user.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        
        // ✅ IMPORTANT: Create the refresh token
        const refreshToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        
        // ✅ Save the refresh token into DB
        user.refreshToken = refreshToken;
        await user.save();
        console.log("Saved refresh token for user:", user.email);
        
        // ✅ Send refresh token as httpOnly cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: "/",
        });
        
        // ✅ Send accessToken to client in response
        res.json({ accessToken });

        console.log("Sent back access token"); // ✅ Log 10
    } catch (error) {
        console.error("Error in /auth/google route:", error); // ✅ Log 11
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// --- GOOGLE AUTH NEW FLOW END ---

// Routes
const videosRouter = require('./routes/videos.js');
const authRouter = require('./routes/auth.js');
const refreshRouter = require('./routes/refresh.js');
const UserRouter = require('./routes/user.js')

app.use('/videos', videosRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/user',UserRouter)

// Database Connection
mongoose.connect(process.env.MONGODB_URL, { autoIndex: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
