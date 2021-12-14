import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

app.use(express.urlencoded({ extended: true}))

app.get('/add-names', (req, res, next) => {
    res.send('<form action="/names" method="POST"><input type="text" name="nombre"><button type="submit">agregar</button></form>')
})

app.post('/names', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

app.get('/', (req, res, next) => {
    res.send('<form action="/add-names" method="GET"><h1>Mi primer servidor</h1><button type="submit">iniciar</button></form>');
})



app.listen(8080, () => console.log('Server is running in port 8080'))

