const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    //   console.log('req.headers',req.headers)
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    // console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    console.log(token); // Bearer token

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            console.log('decoded.username',decoded.username)
            req.user = decoded.username;//setting username in req.user
            next();
        }
    );
}

module.exports = verifyJWT