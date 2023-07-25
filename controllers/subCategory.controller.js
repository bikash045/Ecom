const subCategoryModel = require('../models/subCategory.model');
const subCategorySchema = subCategoryModel.sub_cat;

const addSubCategory = async (req, res) => {
    try {
        const data = new subCategorySchema({
            category_id: req.body.category_id,
            subCategory_name: req.body.subCategory_name
        })

        const saveData = await data.save();
        res.status(200).send({ success: true, dataRes: saveData })


    }
    catch (error) {
        res.status(404).send({ sucess: false, msg: 'something is wrong' })
    }
}

const fetchSubCategory = async (req, res) => {
    try {
        const data = await subCategorySchema.find()
        return res.status(200).send({ sucess: true, msg: 'sub category data', dataRes:data})
     }
    catch (error) {
        res.status(404).send({ sucess: false, msg: 'something is wrong' })
    }
}

const fetchSubCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await subCategorySchema.findById(id)
        return res.status(200).send({ sucess: true, dataRes:data})
     }
    catch (error) {
        res.status(404).send({ sucess: false, msg: 'something is wrong' })
    }
}

const UpdateSubCategoryById= async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updateData = await subCategorySchema.updateOne({"_id":id},data)
        return res.status(200).send({ sucess: true, dataRes:updateData})
     }
    catch (error) {
        res.status(404).send({ sucess: false, msg: 'something is wrong' })
    }
}

const deleteSubCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await subCategorySchema.findByIdAndDelete(id);
        return res.status(200).send({ sucess: true, msg:"deleted sub category"})
     }
    catch (error) {
        res.status(404).send({ sucess: false, msg: 'something is wrong' })
    }
}

module.exports = {
    addSubCategory:addSubCategory,
    fetchSubCategory:fetchSubCategory,
    fetchSubCategoryById:fetchSubCategoryById,
    UpdateSubCategoryById:UpdateSubCategoryById,
    deleteSubCategoryById:deleteSubCategoryById

}
