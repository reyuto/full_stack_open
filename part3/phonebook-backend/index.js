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