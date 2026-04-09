import axios from 'axios'


const baseUrl = 'http://localhost:3001/persons'

// GET
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

// POST
const create = (person) => {
  const request = axios.post(baseUrl, person)
  return request.then(res => res.data)
}

// PUT


// DELETE
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}

export default { getAll, create, remove }