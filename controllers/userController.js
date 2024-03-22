const { generateToken } = require("../config/jwt");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const { validateInput } = require("../validation/inputValidation");

const createUser = asyncHandler(async (req, res) => {
    const { error } = validateInput(req.email, req.name);
    if (error) return res.status(400).json(error.details[0].message);

    const email = req.body.email;
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        //create new user
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        res.status(400).json({ message: "User already exists" });
    }
});


const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    //check if user is in database
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: generateToken(findUser._id),
        })
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
})

module.exports = { createUser, userLogin }
