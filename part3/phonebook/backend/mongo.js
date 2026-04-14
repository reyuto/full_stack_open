const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

let name = "", number = "";

// DO NOT SAVE THE PASSWORD TO GITHUB
const password = process.argv[2]

if (process.argv.length >= 5) {
  name = process.argv[3]
  number = process.argv[4]
}

const url = `mongodb+srv://fullstack:${password}@cluster0.aqslax2.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
  console.log('phonebook:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}