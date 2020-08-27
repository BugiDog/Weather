const config = require('./config.json')
const request = require('request')
const app = require('express')()
const server = app.listen(config.PORT, () => console.log(`Server started on ${config.PORT} port`))
const io = require('socket.io').listen(server)

const weather = new Map()

io.on('connection', (socket) => {
    socket.on('takeWeather', data => {
        try {
            let urlCurrent
            if (typeof (data) === 'string') {
                urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${config.WeatherKeyAPI}`
            } else if (data.lat && data.lon) {
                urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${config.WeatherKeyAPI}`
            }
            request(urlCurrent, (error, response) => {
                    if (response.body.cod === '404') new Error(response.body.message)
                    weather.set(socket.id, new Map())
                    weather.get(socket.id).set('currentWeather', JSON.parse(response.body))
                    const lat = JSON.parse(response.body).coord.lat
                    const lon = JSON.parse(response.body).coord.lon
                    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=${config.WeatherKeyAPI}`
                    request(URL, (error, response) => {
                        weather.get(socket.id).set('forecastHourly', JSON.parse(response.body).hourly)
                        weather.get(socket.id).set('forecastDaily', JSON.parse(response.body).daily)
                        console.log(weather);
                        socket.emit('status', true)
                    })
            })
        } catch (err) { console.log(err); }
    })

    socket.on('weatherCurrent', () => {
        try {
            console.log('weatherCurrent');
            socket.emit('weatherCurrent', weather.get(socket.id).get('currentWeather'))
        } catch (err) { }
    })
    socket.on('forecastHourly', () => {
        try {
            console.log('forecastHourly');
            socket.emit('forecastHourly', weather.get(socket.id).get('forecastHourly'))
        } catch (err) { }
    })
    socket.on('forecastDaily', () => {
        try {
            console.log('forecastDaily');
            socket.emit('forecastDaily', weather.get(socket.id).get('forecastDaily'))
        } catch (err) { }
    })
})