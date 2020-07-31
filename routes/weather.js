const { Router } = require('express')
const request = require('request')
const config = require('../config.json')

const router = Router()


router.get('/Current', async (req, res) => {
    try {
        const city = req.query.city
        console.log('Origen:' + city)
        
        const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.WeatherKeyAPI}`
        request(URL, (error, response) => {
            console.log(response.body)
            console.log(typeof (response.body))
            console.log(typeof (JSON.parse(response.body)))
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.json(JSON.parse(response.body))
        })
    } catch (err) {

    }


})

router.get('/OneHour', async (req, res) => {
    try {
        console.log('req:' + req.query)

        const lat = req.query.lat//req.query.lat   33.441792
        const lon = req.query.lon// req.query.lon   -94.037689
        const part = 'current,hourly,daily'//current   minutely hourly   daily
        

        console.log('1')
        console.log('config.WeatherKeyAPI:' + config.WeatherKeyAPI)

        const URL=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
        exclude=${part}&appid=${config.WeatherKeyAPI}`
       // const URL = `https://https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude =${part}&appid=${config.WeatherKeyAPI}`
        request(URL, (error, response) => {
            console.log('2')
            console.log(response.body)
            console.log(typeof (response))
            console.log(error)
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.json(JSON.parse(response.body))
        })
    } catch (err) {

    }


})





module.exports = router