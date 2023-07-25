const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.conotroller')

router.post('/',(req,res)=>{
    loginController.userLogin(req,res)
});


module.exports = router;
