import http from 'http'

const app = http.createServer((req, res) => {
   res.writeHead(200, {'Content-Type': 'text/plain'})
   res.end('Hello World')
})

const PORT = 5000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

