const Person = ({name, number}) => <div>{name} {number}</div>

const Persons = ({persons}) => 
  persons.map(
    ({name, number, id}) => 
      <Person name={name} number={number} key={id} />
  )

export default Persons