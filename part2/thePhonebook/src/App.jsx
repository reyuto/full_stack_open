import { useState } from 'react'

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
      <label>filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder='start typing'/></label>
      <h2>add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          <label>name: </label><input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <label>phone: </label><input value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <div key={person.name}>{person.name} ({person.phone})</div>)}
    </div>
  )
}

export default App