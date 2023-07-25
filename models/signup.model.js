const mongo = require('mongoose');
const { Schema } = mongo;
const signupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                // Basic email format validation
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    mobile: {
        type: Number,
        required: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isVerified: Boolean

})

const bcrypt = require('bcrypt');
signupSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 12, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        this.password = hashedPassword;
        next();
    });
});


signupSchema.pre('save', async function (next) {
    const query = {
        name: this.name
    }
    const length = await mongo.model("Signup").countDocuments(query);
    if (length > 0) {
        throw next("user name already exists !");
    }
    else {
        next();
    }
});

// user email unique validation
signupSchema.pre('save', async function (next) {
    const query = {
        email: this.email
    }
    const length = await mongo.model("Signup").countDocuments(query);
    if (length > 0) {
        throw next("user email already exists !");
    }
    else {
        next();
    }
});

module.exports = {
    schema: mongo.model('Signup', signupSchema)
}