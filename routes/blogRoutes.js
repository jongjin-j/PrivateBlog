const express = require('express')
const Blog = require('../models/blog')
//const blogController = require('../controllers/blogController')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './style/uploads');
  },
  
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
  
const upload = multer({
storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((error) => {
      console.log(error)
    })
})

router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file)

    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body,
        image: req.file.filename
    })
  
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