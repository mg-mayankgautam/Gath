require("dotenv").config();
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 4700;

const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());

const allowedOrigins = [
    "https://shotkut.vercel.app",
    "https://shotkut.com",
    "https://www.shotkut.com",
    "http://localhost:3456",
    "http://localhost:3001"
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;

    if (allowedOrigins.includes(requestOrigin)) {
        res.setHeader("Access-Control-Allow-Origin", requestOrigin);
        res.setHeader("Access-Control-Allow-Credentials", "true"); // Explicitly set this header
    }

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});




// require("dotenv").config();

// const path = require('path');
// const express = require('express');
// const app = express();

// const PORT = process.env.PORT || 4700;

// const bodyparser = require('body-parser');//use with axios 

// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');

// app.use(cookieParser())



// app.use(express.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// app.use(bodyparser.json({ limit: "50mb" }));
// app.use(bodyparser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(express.json());


// // List of allowed origins
// const allowedOrigins = [
//     // "https://www.moheerajewels.com",
//     "https://shotkut.vercel.app",
//     "https://shotkut.com",
//     "https://www.shotkut.com",
//     "http://localhost:3456",
//     "http://localhost:3001"
// ];

// // Use `cors` middleware
// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true); // Allow if origin matches or is null (server-to-server requests)
//             } else {
//                 callback(new Error("Not allowed by CORS"));
//             }
//         },
//         credentials: true, // Allow credentials
//     })
// );

// // Custom middleware to set headers manually
// app.use((req, res, next) => {
//     const requestOrigin = req.headers.origin;

//     // Dynamically set Access-Control-Allow-Origin if origin is allowed
//     if (allowedOrigins.includes(requestOrigin)) {
//         res.setHeader("Access-Control-Allow-Origin", requestOrigin);
//     }

//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS"
//     );
//     next();
// });



const videosRouter = require('./routes/videos.js');
app.use('/videos', videosRouter);

const authRouter = require('./routes/auth.js');
app.use('/auth', authRouter);

const refreshRouter = require('./routes/refresh.js');
app.use('/refresh', refreshRouter);



mongoose.connect(process.env.MONGODB_URL, {
    autoIndex: true // Enable automatic index creation
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`https://localhost:` + PORT);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
