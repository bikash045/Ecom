const mongo = require('mongoose');
const {Schema} = mongo;

const sub_categorySchema = new Schema ({
    category_id:{
        type:String,
        required:true,
    },
    subCategory_name :{
        type:String,
        required:true
    }
})

 sub_categorySchema.pre('save', async function (next) {
    const query = {
        subCategory_name: this.subCategory_name
    }
    const length = await mongo.model("SubCategory").countDocuments(query);
    if (length > 0) {
        throw next("sub category name already exists !");
    }
    else {
        next();
    }
});

module.exports = {
    sub_cat:mongo.model('SubCategory',sub_categorySchema)
}