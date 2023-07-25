const categoryModel = require('../models/category.model');
const categorySchema = categoryModel.cat_schema;

const addCategory = async (req, res) => {
    try {
            const data = req.body;
            const collection = await new categorySchema(data);
            const cat_data = await collection.save();
            return res.status(200).send({success:true,dataRes:cat_data});
        }
    catch (error) {
        res.status(404).send({ sucess: false, msg: "something is wrong" })
    }
}

const fatchCategory = async (req,res) => {
    const data =  await categorySchema.find();
    return res.status(200).send({sucess:true,msg:'category data',dataRes:data})
}
const fatchCategoryById = async (req,res)=>{
    const id = req.params.id;
    const dataRes = await categorySchema.findById(id);
    return res.status(200).send({success:true,data:dataRes});
}

const updateCategoryById = async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const dataRes = await categorySchema.updateOne({"_id":id},data)
    return res.status(200).send({success:true,updateData:dataRes});
}
const deleteCategoryById = async (req,res) => {
    const id = req.params.id;
    const data =  await categorySchema.findByIdAndDelete(id);
    return res.status(200).send({sucess:true,msg:'category data',dataRes:data})
}
module.exports = {
    addCategory: addCategory,
    fatchCategory:fatchCategory,
    fatchCategoryById:fatchCategoryById,
    updateCategoryById:updateCategoryById,
    deleteCategoryById:deleteCategoryById
}