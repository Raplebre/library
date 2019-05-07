const express = require('express')
const mysql = require('../mysql')
const router = new express.Router()

const mysqlp = mysql.promise()

router.post('/books', async (req, res) => {
    try {
        const book = req.body
        console.log(book)
        await mysqlp.query(`CREATE TABLE IF NOT EXISTS books (ISBN varchar(13) PRIMARY KEY, book_title varchar(200) not null, books_auth_id int(4) not null, foreign key (books_auth_id) references authors(auth_id))`)
        await mysqlp.query(`insert into books (ISBN, book_title, books_auth_id) values (?,?,?)`, [book.ISBN, book.book_title, book.books_auth_id])
        res.status(201).send()
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/books', async (req, res) => {
    try {
        await mysqlp.query('select * from `books`', (err, results, fields) => {
            console.log(results)
            res.send(results)
        })
        
    }
    catch(e){
        res.status(500)
    }
})

router.get('/books/:par', async (req, res) => {
    try {
        const param = req.params.par
        await mysqlp.query(`select * from \`books\` where ISBN like "%${param}%" or book_title like "%${param}%"`, (err, results, fields) => {
            if (results.length === 0){
                res.status(404).send()
            }
            else {
                res.send(results)
            }
        })
    }
    catch(e){
        res.status(500).send()
    }
})

router.patch('/books/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        await mysqlp.query(`update \`books\` set ISBN = '${data.ISBN}', book_title = '${data.book_title}', books_auth_id = ${data.books_auth_id} where ISBN = '${id}'`, (err, results, fields) => {
            if (err) {
                return res.status(400).send()
            }
            console.log(results)
            res.send(results)
        })
    }
    catch(e) {
        res.status(500).send()
    }
})

router.delete('/books/:id', async (req, res) => {
    try {
        const id = req.params.id
        await mysqlp.query(`delete from \`books\` where ISBN = '${id}'`)
        res.send()
    }
    catch(e){
        res.status(400).send()
    }
})

module.exports = router