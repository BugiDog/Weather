const config = require('./config.json')
const request = require('request')
const app = require('express')()
const server = app.listen(config.PORT, () => console.log(`Server started on ${config.PORT} port`))
const io = require('socket.io').listen(server)

const TransformСurrentWeather = require('./TransformFunctions/TransformСurrentWeather')
const TransformForecastHourly = require('./TransformFunctions/TransformForecastHourly')

const weather = new Map()

io.on('connection', (socket) => {
    socket.on('takeWeather', data => {

        let urlCurrent
        if (typeof (data) === 'string') {
            urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${config.WeatherKeyAPI}`
        } else if (data.latitude && data.longitude) {
            urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${config.WeatherKeyAPI}`
        } 
        request(urlCurrent, (error, response) => {
            console.log('ERROR:', error);
            if (!!error) {
                

            } else if (JSON.parse(response.body).cod >= '400') {
                console.log('----------------');
                console.log('ERROR:', JSON.parse(response.body));
                socket.emit('Error', JSON.parse(response.body))
            } else {
                weather.set(socket.id, new Map())
                weather.get(socket.id).set('currentWeather', TransformСurrentWeather(JSON.parse(response.body)))
                const latitude = JSON.parse(response.body).coord.lat
                const longitude = JSON.parse(response.body).coord.lon
                const urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely&appid=${config.WeatherKeyAPI}`
                request(urlForecast, (error, response) => {
                    weather.get(socket.id).set('forecastHourly',TransformForecastHourly(JSON.parse(response.body).hourly) )
                    weather.get(socket.id).set('forecastDaily', JSON.parse(response.body).daily)
                    socket.emit('status', true)
                })
            }  
        }) 
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