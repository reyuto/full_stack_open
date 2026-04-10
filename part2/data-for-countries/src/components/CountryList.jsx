const CountryList = ({data, fetchCountry, countryData}) => {
  const names = data.map(country => country.name.common)

  return (
    <div>
      <ul className="country-list">
        {names.map(name => 
          <li key={name}>
            {name} 
            &nbsp;<button onClick={() => fetchCountry(name)}>show</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default CountryList;