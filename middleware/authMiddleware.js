const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'some secret', (err, decodedToken) => {
            if(err){
                console.log(err)
                res.redirect('/login')
            }
            else{
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}