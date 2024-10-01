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

// CORS configuration
app.use(cors({
    origin: 'https://madrasa-system.netlify.app', // Allow only your Netlify app
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
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
app.get("/hello", (req, res) => {
    res.json("API is running....");
});

// Use defined routes
app.use('/', Routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
