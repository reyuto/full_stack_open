const Person = ({person, handleClick}) => {
  const {name, id, number} = person

  return (
    <li>
      {name} {number}
      <button onClick={() => handleClick(id, name)}>delete</button>
    </li>
  )
}

const Persons = ({persons, handleRemovePerson}) => 
{
  return (
    <ul>
      {persons?.map(
        (person) => 
          <Person person={person} key={person.id} handleClick={handleRemovePerson}/>
      )}
    </ul>
  )
}

export default Persons