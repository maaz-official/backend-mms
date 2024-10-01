// Load environment variables as early as possible
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// Use express.json to parse JSON request bodies
app.use(express.json({ limit: '10mb' }));

// CORS configuration
app.use(cors({
    origin: 'https://madrasa-system.netlify.app', // Allow only your Netlify app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow credentials (if needed for auth cookies or headers)
}));

// Handle preflight OPTIONS request for CORS
app.options('*', cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err.message);
    });

// A simple route to check if the API is running
app.get("/", (req, res) => {
    res.json("API is running....");
});

// Use defined routes
app.use('/api', Routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
