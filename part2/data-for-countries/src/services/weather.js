import axios from "axios"

const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY
const baseUrl = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`
const iconUrl = (icon) => `https://openweathermap.org/payload/api/media/file/${icon}.png`

const getWeather = (city) => {
  const request = axios.get(baseUrl(city))
  return request.then(res => { 
    console.log(res.data)
    return res.data
  })
  .catch((error) => {
    console.log(error)
    return null
  })
}

export default { getWeather, iconUrl }