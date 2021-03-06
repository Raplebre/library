const express = require('express')
const bookRouter = require('./routers/book')
const authorRouter = require('./routers/author')
const cors = require('cors')

const port = process.env.PORT
const db_port = process.env.DB_PORT

const app = express()
app.use(express.json())
app.use(cors())
app.use(function(req, res, next) {
    console.log('ola')
    next()
})
app.use('/api', bookRouter)
app.use(authorRouter)

app.listen(port, () => {
    console.log('Server up on port', port)
})