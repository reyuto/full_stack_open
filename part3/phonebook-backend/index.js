const express = require('express')

let directory = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()
app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(directory)
})


const VERY_LARGE_NUMBER = 9999999999
const generateId = () => {
  let nextId = Math.floor(Math.random() * VERY_LARGE_NUMBER)
  while (directory.find(p => p.id === nextId)) {
    nextId = Math.floor(Math.random() * VERY_LARGE_NUMBER)
  }

  return nextId
}

const validateRequest = (body) => {
  if (!body.name && !body.number) {
    return "missing name and number"
  }

  if (!body.name) {
    return "missing name"
  }

  if (!body.number) {
    return "missing number"
  }

  if (directory.find(p => p.name === body.name)) {
    return "name must be unique"
  }
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const error = validateRequest(body)
  if (error) {
    return response.status(400).json({ error })
  }

  const person = {
    id: String(generateId()),
    name: body.name,
    number: body.number
  }

  directory = directory.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = directory.find(person => person.id === id)

  if (!person) {
    return response.status(404).end()
  }

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  directory = directory.filter(p => p.id !== id)
  response.status(204).end()
})


app.get('/info', (request, response) => {
  response.send(`<div>The phonebook has entries for ${directory.length} people</div><br /><div>${new Date().toString()}</div>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})