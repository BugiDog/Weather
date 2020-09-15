const TransformTime = require('./TransformTime') 

const TransformCurrentWeather = (respons) => {
    const date = TransformTime(respons.dt, 'date')
    const sity = respons.name
    const temperature = (respons.main.temp - 273).toFixed(1)
    const temperatureFeelsLike = (respons.main.feels_like - 273).toFixed(1)
    const humidity = respons.main.humidity
    const pressure = respons.main.pressure
    const sunrise = TransformTime(respons.sys.sunrise, 'time')
    const sunset = TransformTime(respons.sys.sunset, 'time')
    let weatherId
    ((respons.weather[0].id === 800 || respons.weather[0].id === 801 || respons.weather[0].id === 500) &&
        (respons.weather[0].icon.split('')[2] === 'n')) ? weatherId = respons.weather[0].id + 10 : weatherId = respons.weather[0].id
    const windSpeed = respons.wind.speed

    console.log({
        date, sity, temperature, temperatureFeelsLike, humidity, pressure, sunrise, sunset, weatherId, windSpeed
    });

    return ({
        date, sity, temperature, temperatureFeelsLike, humidity, pressure, sunrise, sunset, weatherId, windSpeed
    })


}

module.exports = TransformCurrentWeather