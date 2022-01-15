const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const page = req.body.pages

    const query = `
        INSERT INTO books (title, pages) VALUES ('${title}', '${page}')
    `
    conn.query(query, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/')
    })
})

app.get('/', (req, res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'node'
})
conn.connect(err => {
    if (err !== null) {
        console.log(err);
    }
    console.log("Mysql conectado com sucesso");
})

app.listen(3000)