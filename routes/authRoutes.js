const express = require('express')
const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signup', {title: 'Sign Up'})
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
})

router.post('/signup', (req, res) => {
    res.send('signup')
})

router.post('/login', (req, res) => {
    res.send('login')
})

module.exports = router