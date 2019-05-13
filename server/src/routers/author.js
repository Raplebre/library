const express = require('express')
const mysql = require('../mysql')
const router = new express.Router()
const cors = require('cors')
const mysqlp = mysql.promise()

router.post('/authors', async (req, res) => {
    try {
        const author = req.body
        console.log(author)
        await mysqlp.query(`CREATE TABLE IF NOT EXISTS authors (auth_id int(4) PRIMARY KEY AUTO_INCREMENT, auth_name varchar(250) not null)`)
        await mysqlp.query(`insert into authors (auth_name) values (?)`, [author.auth_name])
        res.status(201).send()
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/authors', cors(), async (req, res) => {
    try {
        await mysqlp.query('select * from `authors`', (err, results, fields) => {
            console.log(results)
            res.send(results)
        })
        
    }
    catch(e){
        res.status(500)
    }
})

router.get('/authors/:par', cors(), async (req, res) => {
    try {
        const param = req.params.par
        await mysqlp.query(`select * from \`authors\` where auth_name like "%${param}%"`, (err, results, fields) => {
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

router.get('/authors/authEdit/:id', cors(), async (req, res) => {
    try {
        const id = req.params.id
        await mysqlp.query(`select * from \`authors\` where auth_id=${id}`, (err, results, fields) => {
            if (results.length === 0) {
                res.status(404).send()
            }
            else {
                const author = results[0]
                res.send(author)
            }
        })
    } catch(e) {
        res.status(500).send()
    }
})

router.put('/authors/authEdit/:id', cors(), async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        await mysqlp.query(`update \`authors\` set auth_name = '${data.auth_name}' where auth_id = ${id}`, (err, results, fields) => {
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

router.delete('/authors/:id', cors(), async (req, res) => {
    try {
        const id = req.params.id
        await mysqlp.query(`delete from \`authors\` where auth_id = ${id}`)
        res.send()
    }
    catch(e){
        res.status(400).send()
    }
})

module.exports = router