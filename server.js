const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config()
const waitlistRoute = require('./routes/waitListRoute');
const dbconnect = require('./config/dbconnection');
const userRoutes = require('./routes/userRoute');
const { notFound, errorHandler } = require('./middleware/errorhandler');

const app = express()
dbconnect()
app.use(cors())
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
//app.use(cookieParser());

//Api Health Checker
app.get("/api/healthchecker", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Thrift Chain",
    });
});



//waitlist router
app.use("/waitlist", waitlistRoute)
app.use('/api/user',userRoutes)

app.use(notFound)
app.use(errorHandler)
const port = 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
