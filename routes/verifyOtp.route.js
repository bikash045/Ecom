const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller')

router.post('/',(req,res)=>{
    signupController.verifyOtp(req,res)
});

module.exports = router;