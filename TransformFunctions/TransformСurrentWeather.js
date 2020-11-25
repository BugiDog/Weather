const TransformTime = require('./TransformTime') 

const TransformCurrentWeather = (respons) => {

    const date = TransformTime(respons.dt, 'time') +' '  + TransformTime(respons.dt, 'date')
    const sity = respons.name
    const temperature = respons.main.temp.toFixed()>0? `+${respons.main.temp.toFixed()}`:respons.main.temp.toFixed()
    const temperatureFeelsLike = respons.main.feels_like.toFixed()>0? `+${respons.main.feels_like.toFixed()}`:respons.main.feels_like.toFixed()
    const humidity = respons.main.humidity
    const pressure = (respons.main.pressure*0.75).toFixed()
    const sunrise = TransformTime(respons.sys.sunrise, 'time')
    const sunset = TransformTime(respons.sys.sunset, 'time')
    const dataWeatherDescription = respons.weather[0].description
    const weatherDescription = dataWeatherDescription.replace(dataWeatherDescription[0],dataWeatherDescription[0].toUpperCase()) 
    let windDirection
    const windDegree = respons.wind.deg
    if (windDegree>=337 || windDegree<22) {
        windDirection = 'С'
    } else if (windDegree>=22 && windDegree<67){
        windDirection = 'СВ'
    }else if (windDegree>=67 && windDegree<112){
        windDirection = 'В'
    }else if (windDegree>=112 && windDegree<157){
        windDirection = 'ЮВ'
    }else if (windDegree>=157 && windDegree<202){
        windDirection = 'Ю'
    }else if (windDegree>=202 && windDegree<247){
        windDirection = 'ЮЗ'
    }else if (windDegree>=247 && windDegree<292){
        windDirection = 'З'
    }else if (windDegree>=292 && windDegree<337){
        windDirection = 'CЗ'
    }
    
    let weatherId
    ((respons.weather[0].id === 800 || respons.weather[0].id === 801 || respons.weather[0].id === 500) &&
        (respons.weather[0].icon.split('')[2] === 'n')) ? weatherId = respons.weather[0].id + 10 : weatherId = respons.weather[0].id
    const windSpeed = respons.wind.speed

    console.log({
        date, sity, temperature, temperatureFeelsLike, humidity, pressure, sunrise, sunset, weatherDescription,weatherId, windSpeed,windDirection
    });

    return ({
        date, sity, temperature, temperatureFeelsLike, humidity, pressure, sunrise, sunset,weatherDescription, weatherId, windSpeed,windDirection
    })


}

module.exports = TransformCurrentWeather