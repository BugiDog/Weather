const TransformTime = require('./TransformTime') 

const TransformForecastHourlyItem = (item) =>{
    const time = TransformTime(item.dt, 'time')
    const temperature = item.temp .toFixed(1)
    const temperatureFeelsLike = item.feels_like .toFixed(1)
    let weatherId
    ((item.weather[0].id === 800 || item.weather[0].id === 801 || item.weather[0].id === 500) &&
        (item.weather[0].icon.split('')[2] === 'n')) ? weatherId = item.weather[0].id + 10 : weatherId = item.weather[0].id
    const windSpeed = item.wind_speed

    return({
        time,temperature, temperatureFeelsLike,weatherId, windSpeed
    })

}

const TransformorecastHourly = (respons) => {
    const forecastForTwoDays = {
        today: {
            date:'',
            forecast:[]
        },
        tomorrow:{
            date:'',
            forecast:[]
        },
        aftertomorrow: {
            date:'',
            forecast:[]
        },
        iconsIDArr: []
    }

    const firstDayTime=respons[0].dt
    respons.map((item) => {
        const transformItem=TransformForecastHourlyItem(item)
       
        switch ( TransformTime(item.dt,'date')) {
            case TransformTime(firstDayTime,'date'): 
                forecastForTwoDays.today.date = TransformTime(item.dt,'date');
                forecastForTwoDays.today.forecast.push(transformItem);
            break
            case TransformTime(firstDayTime + 86400,'date'): 
                forecastForTwoDays.tomorrow.date = TransformTime(item.dt,'date');
                forecastForTwoDays.tomorrow.forecast.push(transformItem); 
            break
            case TransformTime(firstDayTime + 86400 * 2,'date'): 
                forecastForTwoDays.aftertomorrow.date = TransformTime(item.dt,'date');
                forecastForTwoDays.aftertomorrow.forecast.push(transformItem); 
            break
        }
        if (!forecastForTwoDays.iconsIDArr.includes(transformItem.weatherId)) forecastForTwoDays.iconsIDArr.push(transformItem.weatherId)
    })

    console.log(forecastForTwoDays);
    
    return(forecastForTwoDays)


}

module.exports = TransformorecastHourly