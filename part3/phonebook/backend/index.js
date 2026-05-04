require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('request-body', (request) =>
  JSON.stringify(request.body),
)

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :request-body}',
    {
      skip: (request) => request.method !== 'POST',
    },
  ),
)

// GET ALL
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

// POST
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  const person = new Person({ name, number })

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch(error => next(error))
})

// PUT
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

// GET BY ID
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((data) => {
      console.log(`DELETE: ${data.name} was removed from the phonebook!`)
      response.status(204).end()
    })
    .catch(error => next(error))
})

// GET INFO
app.get('/info', (request, response) => {
  Person.countDocuments({}).then((value) =>
    response.send(
      `<div>The phonebook has entries of ${value} people</div><br /><div>${new Date().toString()}</div>`,
    ),
  )
})

// 404
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

// 400
app.use((error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
