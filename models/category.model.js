const mongo = require('mongoose');
const {Schema} = mongo;

const categorySchema = new Schema ({
    category:{
        type:String,
        required:true,
    }
});

 categorySchema.pre('save', async function (next) {
    const query = {
        category: this.category
    }
    const length = await mongo.model("Category").countDocuments(query);
    if (length > 0) {
        throw next("category name already exists !");
    }
    else {
        next();
    }
});

module.exports = {
    cat_schema:mongo.model('Category',categorySchema)
}