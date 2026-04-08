const Person = ({name, phone}) => <div>{name} {phone}</div>

const Persons = ({persons}) => 
  persons.map(
    ({name, phone, id}) => 
      <Person name={name} phone={phone} key={id} />
  )

export default Persons