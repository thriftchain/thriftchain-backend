const express = require('express')
const expressWs = require('express-ws')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const messageRoutes = require('./routes/messageRoute');
require('dotenv').config()
const app = express()
const wsInstance = expressWs(app)


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
mongoose.connect(dbURI,)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));

app.use('/messaging', messageRoutes(wsInstance.getWss()));
app.wsInstance = wsInstance;

const port = 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
