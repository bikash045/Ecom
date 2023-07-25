const productModel = require('../models/product.model');
const productSchema = productModel.schema_name;

const addProduct = async (req, res) => {
    try {
        const product = await new productSchema({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            category_id: req.body.category_id,
            sub_category: req.body.sub_category,
        })
        if (req.files) {
            let path = ''
            req.files.forEach(function (files, index, arr) {
                path = path + files.path + ','
            })
            path = path.substring(0, path.lastIndexOf(','))
            product.image = path
        }
        const storeData = await product.save();
        return res.status(200).send({ sucess: true, msg: 'product details', dataRes: storeData })
    }
    catch (error) {
        res.status(404).send({ sucess: false, msg: 'something is wrong' })
    }
}

const fetchProduct = async (req,res)=>{
    const dataRes = await productSchema.find();
    res.status(200).send({success:true,msg:'find all product from database',data:dataRes})
}

const fetchProductById = async (req,res)=>{
    const id = req.params.id;
    const dataRes = await productSchema.findById(id);
    res.status(200).send({success:true,msg:'find all product from database',data:dataRes})
}
const updateProductById = async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const dataRes = await productSchema.findById({'_Id':id},data);
    res.status(200).send({success:true,msg:'find all product from database',data:dataRes})
}

const deleteProductById = async (req,res)=>{
   const id = req.params.id;
    const dataRes = await  productSchema.findByIdAndDelete({'_id':id});
    res.status(200).send({sucess:true,msg:'delete product'})
}
module.exports = {
    addProduct: addProduct,
    fetchProduct:fetchProduct,
    fetchProductById:fetchProductById,
    updateProductById:updateProductById,
    deleteProductById:deleteProductById,
}




