const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { render } = require('ejs')

const app = express()

const PORT = 5000

const dbURI = "mongodb+srv://BlogUser:BostonGolfReview@blog.95hn5.mongodb.net/Review-blog?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(PORT))
  .catch((error) => console.log(error))


app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('style'))

const blogs = [
  {title: 'Golf Course 1', location: 'Location 1'},
  {title: 'Golf Course 2', location: 'Location 2'},
  {title: 'Golf Course 3', location: 'Location 3'}
]

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((error) => {
      console.log(error)
    })
})

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)
  
  blog.save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/blogs/new', (req, res) => {
  res.render('create', {title: 'New Blog'})
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then((result) => {
      res.render('details', {blog: result, title: 'Blog Details'})
    })
    .catch((error) => {
      console.log(error)
    })
})

app.use((req, res) => {
  res.status(404).render('error', {title: 'Error'})
})

