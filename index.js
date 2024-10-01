const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5000

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))

app.use(cors({
  origin: '', // Allow your frontend's origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // if cookies or other credentials are being sent
}));

mongoose
    .connect(process.env.MONGO_URL || "mongodb+srv://mms:mms@cluster0.5if0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))


    app.get("", (req , res) => {
        res.send("api is tunning....")
    })

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})
