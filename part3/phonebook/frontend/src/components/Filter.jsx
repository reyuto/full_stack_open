const Filter = ({ filter, handleFilterChange }) => {

  return (
    <div>
      <label>filter shown with 
        <input value={filter} onChange={(e) => handleFilterChange(e.target.value)} placeholder='start typing'/>
      </label>
    </div>
  )
}

export default Filter