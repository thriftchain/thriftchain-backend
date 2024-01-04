const { Waitlist } = require("../model/waitlistModel");
const { validateInput } = require("../validation/inputValidation");

module.exports.getWaitlist = async(req,res)=>{
    try {
        const result = await Waitlist.find();
        res.status(200).json({
            status: "success",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}



module.exports.addWaitlist = async (req, res) => {
  try {
    const { error } = validateInput(req.body);
     if (error) return res.status(400).json(error.details[0].message);

    const { email } = req.body;

      //check if email already exists in database
      const existingEmail= await Waitlist.findOne({ email: req.body.email });

      if (existingEmail) {
          return res.status(400).json({
              status: "fail",
              message: "Email already exists in the waitlist",
          });
      }

    const newEntry = await Waitlist.create({email});
    res.status(201).json({ 
        message: "You have been successfully added to the waitlist",
        data: newEntry 
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
