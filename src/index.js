const express = require('express')
const bookRouter = require('./routers/book')
const authorRouter = require('./routers/author')

const port = process.env.PORT
const db_port = process.env.DB_PORT

const app = express()
app.use(express.json())
app.use(bookRouter)
app.use(authorRouter)

app.listen(port, () => {
    console.log('Server up on port ', port)
})