const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller')

router.post('/',(req,res)=>{
    signupController.userSignup(req,res)
});

router.get('/',(req,res)=>{
    signupController.fetchUsers(req,res)
});

router.get('/:id',(req,res)=>{
    signupController.fetchUsersById(req,res)
});

router.put('/:id',(req,res)=>{
    signupController.updateUsersById(req,res)
});
router.delete('/:id',(req,res)=>{
    signupController.deleteUserById(req,res)
});


router.post('/',(req,res)=>{
    signupController.verifyOtp(req,res)
})

module.exports = router;