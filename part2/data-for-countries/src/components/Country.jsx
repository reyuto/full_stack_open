import Weather from "./Weather";

const Country = ({data, weatherData}) => {
  if (data === null) return null;

  const { name, capital, area, population, languages, flags } = data

  return (
    <div className="country">
      <h1>{name.common}</h1>
      <div><b>Capital</b> {capital.join(", ")}</div>
      <div><b>Area</b> {area}</div>
      <div><b>Population</b> {population}</div>
      <h2>Languages</h2>
      <ul>
        {Object.keys(languages).map((key) => <li key={key}>{languages[key]}</li>)}
      </ul>
      <h2>Flag</h2>
      <div style={{border: '1px solid grey', display: 'flex', justifySelf: 'left'}}>
        <img src={flags.png} alt={flags.alt} width="320" height="160" />
      </div>
      <Weather weatherData={weatherData} />
    </div>
  )
}

export default Country;