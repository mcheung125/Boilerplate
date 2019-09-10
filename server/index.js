//Entry Point for server

const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

// Logging middleware
app.use(morgan('dev'))

// Static middleware
app.use(express.static(path.join(__dirname, '../public')))

// Parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Matches all requests to /api
app.use('/api', require('./api'))

// Sends user to index.html for requets that don't match api routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// 500 error handler
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
