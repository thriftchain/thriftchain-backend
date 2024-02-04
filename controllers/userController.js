const { generateToken } = require("../config/jwt");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        //create new user
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error("User alreadly exist")
    }
});


const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user is in database
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    } else {
        throw new Error("Invalid password")
    }
})

module.exports = {createUser,userLogin}
