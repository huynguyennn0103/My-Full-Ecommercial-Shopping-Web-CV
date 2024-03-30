import { useState, useEffect } from "react"
import { userRequest } from "../../requestMethods"
import { useSelector } from "react-redux"
const WeatherInfo = () => {
    const [weather, setWeather] = useState(null)
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
    useEffect(()=>{
        const getWeather = async ()=>{
            try {
                const res = await userRequest(TOKEN).get("weather?id=Vietnam")
                setWeather(res.data)

            } catch (error) {
                
            }
        }
        getWeather()
        // let x = setInterval(() =>{
        //     getWeather();
        // },5000)
        // return () => clearInterval(x)
    },[]) 
    useEffect(()=>{
        const getWeather = async ()=>{
            try {
                const res = await userRequest(TOKEN).get("weather?id=Vietnam")
                setWeather(res.data)

            } catch (error) {
                
            }
        }
        let x = setInterval(() =>{
            getWeather();
        },1000*60*60)
        return () => clearInterval(x)
    },[weather]) 
    // console.log(weather)
  return (
    <div className="featuredWeather">
      <div>Vietnam, {weather && weather.main.temp}F</div>
      <div className="weather-part">
      <span>{weather&& weather.weather[0].description}</span>
      <img className="img-weather" src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      </div>
    </div>
  )
}

export default WeatherInfo
