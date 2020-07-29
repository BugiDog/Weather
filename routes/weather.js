const {Router} = require('express')
const request  = require('request')
const config = require('../config.json')

const router = Router()


router.get('/Current', async (req,res ) => {
    try {
        const city =req.query.city  
        console.log('Origen:' +city)
        const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.WeatherKeyAPI}`
        request (URL,(error, response)=>{
            console.log(response.body ) 
            console.log( typeof(response.body)) 
            console.log( typeof(JSON.parse(response.body)))
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.json(JSON.parse(response.body))  
        }) 
    } catch (err) {
        
    }
    

})


module.exports = router