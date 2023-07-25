require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signupModel = require('../models/signup.model');
const userSchema = signupModel.schema;

const userLogin = async (req,res)=>{
        try {
            const email = req.body.email;
            const password = req.body.password;

            const useremail = await userSchema.findOne({ email: email })
    
            const isMatch = await bcrypt.compare(password, useremail.password)
            if (isMatch) {
                const token = jwt.sign({
                    name: useremail.name,
                    email: useremail.email,
                    mobile: useremail.mobile,
                    password:useremail.password,
                    isVerified:useremail.isVerified
    
                }, 'SECRET_KEY', { expiresIn: "12h" }
                );
                return res.status(200).json({
                    token: token
                })
            }
            else {
                res.send("invalid password");
            }
        }
        catch (err) {
            res.status(500).json({
                err: err
            })
        }
    }

module.exports = {
    userLogin:userLogin
}