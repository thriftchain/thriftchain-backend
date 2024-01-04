const mongoose = require("mongoose")

const waitlistSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "please enter your email"],
        lowercase: true,
        trim: true,
        lowercase: true,
        unique: true,
    }
})
const Waitlist = mongoose.model("waitlist", waitlistSchema)
module.exports = {Waitlist}