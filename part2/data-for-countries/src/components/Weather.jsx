import WeatherAPI from '../services/weather'

const Weather = ({weatherData}) => {
  if (weatherData === null) return null;

  const {name, weather, main, wind} = weatherData

  return (
    <div className="weather">
      <h2>Weather in {name}</h2>
      <div>Temperature {main.temp} Celsius</div>
      <div style={{border: '1px solid #eee', borderRadius: '50px', display: 'flex', justifySelf: 'left', marginBlock: '10px'}}>
        <img src={WeatherAPI.iconUrl(weather[0].icon)} alt={weather[0].main} width="50" height="50" />
      </div>
      <div>Wind {wind.speed}m/s</div>
    </div>
  )
} 

export default Weather