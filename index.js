const express = require('express')
const config = require('./config.json')

const app=express()


app.use('/weather', require('./routes/weather'))



app.listen(config.PORT , () => console.log(`Server started on ${config.PORT } port`))