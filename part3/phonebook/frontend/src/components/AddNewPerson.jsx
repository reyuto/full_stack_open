const AddNewPerson = ({
    addNewPerson,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
}) => {
    return (
        <div>
            <form onSubmit={addNewPerson}>
                <div>
                    <label>name: </label>
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter Name"
                    />
                </div>
                <div>
                    <label>phone: </label>
                    <input
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        placeholder="11-111111"
                    />
                </div>
                <div>
                    <button className="submit" type="submit">
                        add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddNewPerson
