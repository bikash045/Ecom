const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.post('/',(req,res)=>{
    categoryController.addCategory(req,res)
});

router.get('/',(req,res)=>{
    categoryController.fatchCategory(req,res)
});

router.get('/:id',(req,res)=>{
    categoryController.fatchCategoryById(req,res)
});


router.put('/:id',(req,res)=>{
    categoryController.updateCategoryById(req,res)
});

router.delete('/:id',(req,res)=>{
    categoryController.deleteCategoryById(req,res)
});
module.exports = router;