const express = require('express')
const mysql = require('../mysql')
const router = new express.Router()
const cors = require('cors')
const mysqlp = mysql.promise()

router.post('/books/bookAdd', cors(),async (req, res) => {
    try {
        const book = req.body
        if (book.book_isbn && book.book_title && book.authors_auth_id){
        await mysqlp.query(`CREATE TABLE IF NOT EXISTS books (book_id int(4) PRIMARY KEY AUTO_INCREMENT, book_isbn varchar(13) not null unique, book_title varchar(200) not null, authors_auth_id int(4) not null, foreign key (authors_auth_id) references authors(auth_id))`)
        await mysqlp.query(`insert into books (book_isbn, book_title, authors_auth_id) values (?,?,?)`, [book.book_isbn, book.book_title, book.authors_auth_id])
        res.status(201).send()
        }
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/books', cors(), async (req, res) => {
    try {
        await mysqlp.query('select * from `books`', (err, results, fields) => {
            res.send(results)
        })
        
    }
    catch(e){
        res.status(500)
    }
})

router.get('/books/:par', cors(), async (req, res) => {
    try {
        const param = req.params.par
        await mysqlp.query(`select * from \`books\` where book_isbn like "%${param}%" or book_title like "%${param}%"`, (err, results, fields) => {
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

router.get('/books/bookEdit/:id', cors(), async (req, res) => {
    try {
        const id = req.params.id
        await mysqlp.query(`select * from \`books\` where book_id=${id}`, (err, results, fields) => {
            if (results.length === 0) {
                res.status(404).send()
            }
            else {
                const book = results[0]
                res.send(book)
            }
        })
    } catch(e) {
        res.status(500).send()
    }
})

router.put('/books/bookEdit/:id', cors(), async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        await mysqlp.query(`update \`books\` set book_isbn = '${data.book_isbn}', book_title = '${data.book_title}', authors_auth_id = ${data.authors_auth_id} where book_id = '${id}'`, (err, results, fields) => {
            if (err) {
                return res.status(400).send()
            }
            res.send(results)
        })
    }
    catch(e) {
        res.status(500).send()
    }
})

router.delete('/books/:id', cors(), async (req, res) => {
    try {
        const id = req.params.id
        await mysqlp.query(`delete from \`books\` where book_id = '${id}'`)
        res.send()
    }
    catch(e){
        res.status(400).send()
    }
})

module.exports = router