const mongo = require('mongoose');
const {Schema} = mongo;

const productSchema = new Schema ({
     name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
      type: Number,
      required: true,
    },
    description:{
      type:String,
      title:String,
      required: true,
    },
    image:{
      type: String,
      required: true,
    },
    category_id:{
      type:String,
      required: true,
    },
    sub_category:{
      type:String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
  },
})

productSchema.pre('save', async function (next) {
  const query = {
      name: this.name
  }
  const length = await mongo.model("Product").countDocuments(query);
  if (length > 0) {
      throw next("this product is already exists !");
  }
  else {
      next();
  }
});

module.exports = {
  schema_name:mongo.model('Product',productSchema)
}