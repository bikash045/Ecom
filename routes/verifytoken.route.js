const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/',auth,function(req,res){
    res.status(200).send({success:true,msg:"authenticated"})
});

module.exports = router;