const express = require('express')
const app = express()

const PORT = 5000

app.set('view engine', 'ejs')
app.set('views', 'pages')

const blogs = [
  {title: 'Golf Course 1', location: 'Location 1'},
  {title: 'Golf Course 2', location: 'Location 2'},
  {title: 'Golf Course 3', location: 'Location 3'}
]

app.listen(PORT)

app.get('/', (req, res) => {
  res.render('index', {title: 'Home', blogs})
})

app.use((req, res) => {
  res.status(404).render('error')
})

