const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ''}

    if(err.message === 'Email does not exist'){
        errors.email = err.message
    }

    if(err.message === 'Incorrect password'){
        errors.password = err.message
    }

    if(err.code === 11000){
        errors.email = 'Email is already registered'
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60

/*const createToken = (id) => {
    return jwt.sign({ id }, 'some secret', {
        expiresIn: maxAge
    })
}*/

const createToken = (id) => {
    return jwt.sign({ id }, `${process.env.SECRET}`, {
        expiresIn: maxAge
    })
}

router.get('/signup', (req, res) => {
    res.render('signup', {title: 'Sign Up'})
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
})

router.post('/signup', async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
})

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
})

module.exports = router