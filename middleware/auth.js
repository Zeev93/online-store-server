const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({ msg: 'Not token registered' })
    }

    // Validate token

    try {
        const crypt = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = crypt.user
        next()
    } catch (error) {
        console.log(error);
    }
}