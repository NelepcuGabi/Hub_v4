const {sign, verify} = require('jsonwebtoken');

const createToken = (user) => {
    const accessToken = sign(
        { username: user.username, id: user.id },
        "jwttelecomauth", 
        { expiresIn: '30d' }
    );

    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["accessToken"]
    
    if(!accessToken) 
        return res.status(400).json({error : "User not Authenticated!"});
    
    try {
        const validateToken = verify(accessToken, "jwttelecomauth")
        if(validateToken) {
            req.authenticated = true
            return next()
        }
    }
    catch (err) {
        return res.status(400).json({error: err});
    }
}
module.exports = { createToken, validateToken }