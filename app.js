const express = require('express');
const app = express();

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log("server is running");
});

// middleware def
const userMiddleware = require('./middleware/user.middleware');

app.use(userMiddleware.urlEncoder);
app.use(userMiddleware.jsonEncoder);
app.use(userMiddleware.multipart);


//users profile routes
const signupRoute = require('./routes/signup.route');
const verifyOtpRoute = require('./routes/verifyOtp.route');
const loginRoute = require('./routes/login.route');
const verify_tokenRoute = require('./routes/verifytoken.route');

app.use('/api/signup', signupRoute);
app.use('/api/verify-otp', verifyOtpRoute);
app.use('/api/login', loginRoute);
app.use('/api/verify-token',verify_tokenRoute);

//categories and products routes
const categoryRoute = require('./routes/category.route');
const subCategoryRoute = require('./routes/subCategory.route');
const productRoute = require('./routes/product.route');

app.use('/api/category',categoryRoute);
app.use('/api/sub-category',subCategoryRoute);
app.use('/api/product', productRoute);



// database connection
const mongo = require('mongoose');
mongo.connect('mongodb://localhost:27017/Flipkart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});





