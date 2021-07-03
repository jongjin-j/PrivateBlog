const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

const PORT = 5000

const dbURI = "mongodb://127.0.0.1:27017/test"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(PORT))
  .catch((error) => console.log(error))

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('style'))

app.get('/', (req, res) => {
  res.render('home', {title: 'Home'})
})

app.use('/blogs', blogRoutes)

app.use('/', authRoutes)

app.use((req, res) => {
  res.status(404).render('error', {title: 'Error'})
})

