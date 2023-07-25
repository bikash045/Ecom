require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = await req.query.token || req.body.token || req.headers['authorization'];
    if (!token) {
        res.status(200).send({ success: false, msg: "a token is required for authentication" });
    }
    try {
        const descode = jwt.verify(token, "SECRET_KEY");
       req.user = descode;
    }
    catch (error) {
        res.status(400).send("invalid token");
    }
    return next();

}

module.exports = verifyToken;