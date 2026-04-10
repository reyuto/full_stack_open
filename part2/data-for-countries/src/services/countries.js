import axios from 'axios'

// full name of country ${baseUrl}/name/${CountryName}
// complete list of countries ${baseUrl}/all
const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const oneCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

let ALL_DATA = []

  const getFilteredCountries = (search, alldata) => {
    const searchString = search.trim().toLowerCase()
    return alldata?.filter(
      country => {
        const name = country.name.common.toLowerCase()
        return name.indexOf(searchString) > -1
      }
    )
  }

const getAllFiltered = (search) => {
  if (ALL_DATA.length !== 0) return Promise.resolve(getFilteredCountries(search, ALL_DATA));

  const request = axios.get(allCountriesUrl)
  return request.then(res => {
    if (res.data.length) {
      ALL_DATA = [...res.data]
      return getFilteredCountries(search, ALL_DATA)
    }
  })
}

const getCountry = (name) => {
  const request = axios.get(`${oneCountryUrl}/${name}`)
  return request.then(res => res.data)
}


export default { getAllFiltered, getCountry }
