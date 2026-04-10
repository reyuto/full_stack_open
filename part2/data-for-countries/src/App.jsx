import { useEffect, useState } from "react"
import countriesAPI from "./services/countries"
import Country from "./components/Country"
import CountryList from "./components/CountryList"

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countriesAPI
      .getAll()
      .then((records) => {
        setCountries(records)
      })
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCountry(null)
  }

  const fetchCountry = (countryName) => {
    countriesAPI
      .one(countryName)
      .then(record => {
        setCountry(record)
      })
  }

  const getFilteredCountries = () => {
    const searchString = search.trim().toLowerCase()
    return countries?.filter(
      country => {
        const name = country.name.common.toLowerCase()
        return name.indexOf(searchString) > -1
      }
    )
  }

  const renderCountries = () => {
    if (!countries?.length || !search.trim()) return null;
    const filteredCountries = getFilteredCountries()
    const len = filteredCountries?.length;

    if (!len) return <div>No such country.</div>
    else if (len === 1) return <Country data={filteredCountries[0]} />
    else if (len > 1 && len <= 10) {
      return (
        <>
          <CountryList data={filteredCountries} fetchCountry={fetchCountry} />
          <Country data={country} />
        </>
      )

    }
    else return <div>Too many matches, specify another filter</div>
  }

  return (
    <div className="content">
      <label>find countries: <input value={search} onChange={handleSearch} /></label>

      {renderCountries()}
    </div>
  )
}

export default App