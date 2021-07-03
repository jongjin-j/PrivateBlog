const express = require('express')
const router = express.Router()
const User = require('../models/user')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ''}

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

router.get('/signup', (req, res) => {
    res.render('signup', {title: 'Sign Up'})
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
})

router.post('/signup', async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.create({email, password})
        res.status(201).json(user)
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json(errors)
    }
})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    res.send('login')
})

module.exports = router