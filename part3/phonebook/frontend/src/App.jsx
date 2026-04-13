import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddNewPerson from './components/AddNewPerson'
import Persons from './components/Persons'
import PersonAPI from './services/person'

const Notification = ({message}) => message ? <div className={message.type}>{message.text}</div> : null

const App = () => {
  const [persons, setPersons] = useState(null) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    PersonAPI.getAll()
      .then(results => setPersons(results))
  }, [])
  
  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons?.filter(
    person => 
      person.name
        .toLocaleLowerCase()
        .indexOf(filter.toLocaleLowerCase()) > -1
  );

  const updatePersonNumber = (existingPerson, newNumber) => {
    const updateNumber = confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)

    if (!updateNumber) return

    const updatedPerson = {...existingPerson, number: newNumber}
    PersonAPI
      .update(existingPerson.id, updatedPerson)
      .then(() => {
        setPersons(persons => persons.map(p => p.id === existingPerson.id ? updatedPerson : p))
        setMessage({text: `Number updated from ${existingPerson.number} to ${newNumber}`, type: "success"})
        setTimeout(() => setMessage(null), 2000)
        resetForm()
      })
      .catch((error) => {
        console.log(error)
        setMessage({text: `Information of ${existingPerson.name} has already been removed from server`, type: "error"})
        setTimeout(() => setMessage(null), 2000)
        setPersons(persons.filter(p => p.id !== existingPerson.id))
      })
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    // empty validation
    if (newName.trim() === "" || newNumber.trim() === "") return
    
    // duplicate validation
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        updatePersonNumber(existingPerson, newNumber)
      } else {
        setMessage({text: `${newName} is already added to the phonebook`, type: "error"})
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      } 
      return
    }

    PersonAPI.create({
      name: newName.trim(), 
      number: newNumber.trim(),
    })
    .then(person => {
      setPersons(persons.concat(person))
      setMessage({text: `Added ${person.name}`, type: "success"})
      setTimeout(() => setMessage(null), 2000)
      resetForm()
    })  
  }

  const handleRemovePerson = (id, name) => {
    if (confirm(`Delete ${name}?`) !== true) return;
    
    PersonAPI
      .remove(id)
      .then(() => {
        setMessage({text: `Removed ${name}`, type: "success"})
        setTimeout(() => setMessage(null), 2000)
      })
      .catch((error) => {
        console.log(error)
        setMessage({text: `${name} does not exist on server`, type: "error"})
        setTimeout(() => setMessage(null), 2000)
      })
      .finally(() => setPersons(persons.filter(p => p.id !== id)))
  }

  return (
    <div className='App'>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons persons={filteredPersons} handleRemovePerson={handleRemovePerson} />
    </div>
  )
}

export default App