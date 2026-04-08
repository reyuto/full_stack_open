const AddNewPerson = ({addNewName, newName, setNewName, newPhone, setNewPhone}) => {

  return (
    <div>
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
    </div>
  )
}

export default AddNewPerson;