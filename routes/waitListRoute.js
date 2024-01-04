const express = require("express")
const {addWaitlist, getWaitlist} = require("../controllers/waitlistController")

const route = express.Router()

route.post('/joinwaitlist', addWaitlist)
route.get('/',getWaitlist)

module.exports = route