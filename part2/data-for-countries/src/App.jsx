import { useEffect, useState } from "react"
import countriesAPI from "./services/countries"
import weatherAPI from "./services/weather"
import Country from "./components/Country"
import CountryList from "./components/CountryList"

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(search.trim().length < 2) return;
    countriesAPI
      .getAllFiltered(search)
      .then((records) => {
        if (records.length === 1) {
          setCountry(records[0])
          setCountries(records)
        } else {
          setCountries(records)
          setCountry(null)
        }
        setLoading(false)
      })
  }, [search])

  useEffect(() => {
    if (country === null) return;

    weatherAPI
      .getWeather(country.capital[0])
      .then((record) => {
        setWeather(record)
      })
  }, [country])

  const fetchCountry = (countryName) => {
    setCountry(countries.find(country => country.name.common === countryName))
  }

  const renderCountries = () => {
    if (search.trim().length < 2) return null;

    // if (!countries?.length || !search.trim()) return null;
    // const filteredCountries = getFilteredCountries()
    const len = countries?.length;

    if (len === 1) return <Country data={country} weatherData={weather} />
    else if (len > 1 && len <= 10) {
      return (
        <>
          <CountryList data={countries} fetchCountry={fetchCountry} />
          <Country data={country} weatherData={weather} />
        </>
      )

    }
    else if (len > 10) return <div>Too many matches, specify another filter</div>
    else return <div>No such country.</div>
  }

  return (
    <div className="content">
      <label>find countries: <input placeholder="start typing" value={search} onChange={(e) => setSearch(e.target.value)} /></label>

      {!loading ? renderCountries() : <div>fetching...</div>}
    </div>
  )
}

export default App