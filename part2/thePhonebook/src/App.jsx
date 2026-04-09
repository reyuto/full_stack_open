import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddNewPerson from './components/AddNewPerson'
import Persons from './components/Persons'
import PersonAPI from './services/person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    PersonAPI.getAll()
      .then(results => setPersons(results))
  }, [])
  
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
      return
    }
    if (persons.find(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to the phonebook`)
      return
    }

    PersonAPI.create({
      name: newName.trim(), 
      number: newNumber.trim(),
    })
    .then(person => {
    
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    })    

    
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