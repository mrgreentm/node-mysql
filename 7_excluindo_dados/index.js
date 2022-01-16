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
        res.redirect('/books')
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const query = `
        SELECT * FROM books WHERE id = '${id}'
    `
    conn.query(query, (err, data) => {
        if (err) { console.log(err); }
        const book = data[0]
        res.render('only', { book })
    })
})

app.get('/books', (req, res) => {
    const query = `SELECT * FROM books`
    conn.query(query, (err, data) => {
        if (err) { console.log(err); return }
        const books = data
        res.render('books', { books })
    })
})

app.get('/books/edit/:id', (req, res) => {

    const id = req.params.id

    const query = `SELECT * FROM books WHERE id = '${id}'`

    conn.query(query, (err, data) => {
        if (err) {
            console.log(err);
        }
        const book = data[0]

        res.render('editbook', { book })
    })

})

app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pages = req.body.pages

    const query = `UPDATE books SET title = '${title}', pages = '${pages}' WHERE id = ${id}`

    conn.query(query, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect(`/books`)

    })

})

app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM books WHERE id = '${id}'`

    conn.query(query, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/books')
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