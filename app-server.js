const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')


/* Middleware */
app.use(express.json())
app.use(express.static('public'))

app.use((req, res, next) => {
    res.locals.data = {}
    next()
})

app.use(require('./config/checkToken'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/items', require('./routes/api/items'))
app.use('/api/orders', require('./routes/api/orders'))
app.use('/api/profile', require('./routes/api/profile'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))
  });

 app.post('./routes/api/profile', (req, res) => {
  res.send('POST request received')
 }); 

module.exports = app