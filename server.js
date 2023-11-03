const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config
const app = express()

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
//app.use(cookieParser());

//   Api Health Checker
app.get("/api/healthchecker", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Thrift Chain",
    });
});

//Database connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));


const port = 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
