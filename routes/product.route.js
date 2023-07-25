const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/',(req,res)=>{
    productController.addProduct(req,res)
});

router.get('/',(req,res)=>{
    productController.fetchProduct(req,res)
});

router.get('/:id',(req,res)=>{
    productController.fetchProductById(req,res)
});

router.put('/:id',(req,res)=>{
    productController.updateProductById(req,res)
});

router.delete('/:id',(req,res)=>{
    productController.deleteProductById(req,res)
})

module.exports = router;