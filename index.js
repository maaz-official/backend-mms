const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

// Use express.json to parse JSON request bodies
app.use(express.json({ limit: '10mb' }));

// Parse allowed origins from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow credentials (cookies, authorization headers)
}));

// Handle preflight requests (OPTIONS)
app.options('*', cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// A simple route to check if the API is running
app.get("/", (req, res) => {
    res.json("API is running....");
});

// Use defined routes
app.use('/api', Routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
