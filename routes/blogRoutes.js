const express = require('express')
const Blog = require('../models/blog')
//const blogController = require('../controllers/blogController')

const router = express.Router()

router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((error) => {
      console.log(error)
    })
})

router.post('/', (req, res) => {
    const blog = new Blog(req.body)
  
    blog.save()
        .then((result) => {
            res.redirect('/')
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/new', (req, res) => {
    res.render('create', {title: 'New Blog'})
  })

router.get('/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then((result) => {
      res.render('details', {blog: result, title: 'Blog Details'})
    })
    .catch((error) => {
      console.log(error)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'})
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router;