import axios from 'axios'

// full name of country ${baseUrl}/name/${CountryName}
// complete list of countries ${baseUrl}/all
const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const oneCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getAll = () => {
  const request = axios.get(allCountriesUrl)
  return request.then(res => res.data)
}

const one = (name) => {
  const request = axios.get(`${oneCountryUrl}/${name}`)
  return request.then(res => res.data)
}


export default { getAll, one }
