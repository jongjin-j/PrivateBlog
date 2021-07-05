const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const requireAuth = require('./middleware/authMiddleware')

const app = express()

const PORT = 5000

const dbURI = "mongodb://localhost:27017/test"

/*  Alternative database URI  */
//const dbURI = "mongodb://127.0.0.1:27017/test"

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(PORT))
  .catch((error) => console.log(error))

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('style'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.render('home', {title: 'Home'})
})

app.use('/blogs', requireAuth, blogRoutes)

app.use(authRoutes)

app.use((req, res) => {
  res.status(404).render('error', {title: 'Error'})
})

