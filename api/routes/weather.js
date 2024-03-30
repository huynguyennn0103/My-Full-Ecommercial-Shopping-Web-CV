const router = require("express").Router();
const https = require("https")
//[GET]/
router.get("/",function(req,res){
    const query = req.query.id
    const apiKey = process.env.WEATHER_KEY
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey
    https.get(url,function(response){
        response.on("data",(d)=>{
            // const weatherData = JSON.parse(d);
            // const temp = weatherData.main.temp;
            // const desc = weatherData.weather[0].description;
            // const icon = weatherData.weather[0].icon;
            // const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // res.write("<h1>The weather of "+ query+ "</h1>")
            // res.write("<h1>The temperature is " + temp + " with desc: " + desc+"</h1>")
            // res.write("<img src=" + imgUrl+">")
            // res.send()
            // console.log(JSON.parse(d))
            res.status(200).json(JSON.parse(d))
        })
    });
})

module.exports = router