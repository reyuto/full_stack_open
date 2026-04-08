import { useState } from 'react'
import Filter from './components/Filter'
import AddNewPerson from './components/AddNewPerson'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '123-456-7890', id: '1' },
    { name: 'Albert Einstien', phone: '123', id: '2' },
    { name: 'Johnathan Burger', phone: '456-7890', id: '3' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  
  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);

  const addNewName = (event) => {
    event.preventDefault()

    // empty validation
    if (newName.trim() === "" || newPhone.trim() === "") return
    // duplicate validation
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }
    if (persons.find(person => person.phone === newPhone)) {
      alert(`${newPhone} is already added to the phonebook`)
      setNewPhone('')
      return
    }

    const personObj = {
      name: newName, 
      phone: newPhone,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(personObj))
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={setFilter} />
      <h3>add a new</h3>
      <AddNewPerson 
        addNewName={addNewName} 
        setNewName={setNewName} 
        setNewPhone={setNewPhone}
        newName={newName}
        newPhone={newPhone}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App