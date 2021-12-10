require('dotenv').config();
var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token =
        req.header('Authorization')?.replace('Bearer ', '') ||
        req.cookies.token ||
        req.body.token;

    if (!token) res.status(403).json({ message: 'token is missing' });

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);

        req.user = decode; // add info in request
    } catch (err) {
        return es.status(401).json({ message: 'Invalid Token!' });
    }

    return next();
};

module.exports = auth;
