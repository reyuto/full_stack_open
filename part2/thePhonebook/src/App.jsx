import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import AddNewPerson from './components/AddNewPerson'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const fetchPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }

  useEffect(fetchPersons, [])
  
  const filteredPersons = persons.filter(
    person => 
      person.name
        .toLocaleLowerCase()
        .indexOf(filter.toLocaleLowerCase()) > -1
    );

  const addNewPerson = (event) => {
    event.preventDefault()

    // empty validation
    if (newName.trim() === "" || newNumber.trim() === "") return
    // duplicate validation
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }
    if (persons.find(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to the phonebook`)
      setNewNumber('')
      return
    }

    const personObj = {
      name: newName, 
      number: newNumber,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={setFilter} />
      <h3>add a new</h3>
      <AddNewPerson 
        addNewPerson={addNewPerson} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App