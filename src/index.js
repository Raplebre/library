const express = require('express')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.PORT
    }
)

const app = express()
app.use(express.json())

console.log(sequelize.config)