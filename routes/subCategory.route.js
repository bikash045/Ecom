const express = require('express');
const router = express.Router();
const subCat_controller = require('../controllers/subCategory.controller');

router.post('/',(req,res)=>{
    subCat_controller.addSubCategory(req,res)
})

router.get('/',(req,res)=>{
    subCat_controller.fetchSubCategory(req,res)
});

router.get('/:id',(req,res)=>{
    subCat_controller.fetchSubCategoryById(req,res)
});

router.put('/:id',(req,res)=>{
    subCat_controller.UpdateSubCategoryById(req,res)
});

router.delete('/:id',(req,res)=>{
    subCat_controller.deleteSubCategoryById(req,res)
});

module.exports = router;