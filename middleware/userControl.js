const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = function (req, res, next) {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, `${process.env.SECRET}`, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            }
            else{
                console.log('token info: ', decodedToken)
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}