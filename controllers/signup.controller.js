const signupModel = require('../models/signup.model');
const userSchema = signupModel.schema;


const userSignup = async (req, res) => {

  // Twilio configuration
  const twilio = require('twilio');
  const accountSid = 'ACb9d9a26de9b3706d7d1ea6f1dc9defe8';
  const authToken = '64eb37bfa99bc61c13d13cc1e1dd5f72';
  const twilioClient = twilio(accountSid, authToken);
  const twilioPhoneNumber = '+14027245895'

  try {
    // Generate OTP (6-digit number)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via SMS
    await twilioClient.messages.create({
      body: `Your OTP: ${otp}`,
      from: twilioPhoneNumber,
      to: req.body.mobile,
    });

    // Create a new signup entry
    const signup = new userSchema({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
      otp: otp,
      isVerified: true
    });

    // Save the signup data to MongoDB
    await signup.save();

    res.json({ success: true, message: 'OTP sent to your mobile number.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

const fetchUsers = async (req,res)=>{
  try{
    const dataRes = await userSchema.find()
    res.json({ success: true, message: 'users data',data:dataRes });
  }
  catch(error)
  {
    error:error
  }

}

const fetchUsersById = async (req,res)=>{
  try{
    const id = req.params.id;
    const dataRes = await userSchema.findById(id)
    res.json({ success: true, message: 'user data',data:dataRes });
  }
  catch(error)
  {
    error:error
  }

}

const updateUsersById = async (req,res)=>{
  try{
    const id = req.params.id;
    const data = req.body;
    const dataRes = await userSchema.updateOne({'_id':id},data)
    res.status(200).send({success:true, updateData:dataRes})
  }
  catch(error){
    error:error
  }
}

const deleteUserById = async (req,res) =>{
  try{
    const id = req.params.id;
    const dataRes = await userSchema.findByIdAndDelete(id)
    res.status(200).send({success:true,msg:"user deleted"})
  }
  catch(error){
    error:error
  }
}

const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const isMatch = await userSchema.findOne({ mobile, otp})
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid OTP' });
    }
    else {
      isMatch.isVerified = true;
      res.status(200).json({ message: 'User verified successfully' });
    }
  }
  catch (error) {
    res.status(404).send({ success: false, msg: "failed to verify" })
  }
}


module.exports = {
  userSignup: userSignup,
  fetchUsers:fetchUsers,
  fetchUsersById:fetchUsersById,
  updateUsersById:updateUsersById,
  deleteUserById:deleteUserById,
  verifyOtp: verifyOtp
}