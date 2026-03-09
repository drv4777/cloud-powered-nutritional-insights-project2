function FilterControls({ searchValue, selectedDietType, dietOptions, onSearchChange, onDietTypeChange }) {
  return (
    <div className="control-row">
      <input
        type="text"
        placeholder="Search by Diet Type"
        value={searchValue}
        onChange={onSearchChange}
      />
      <select value={selectedDietType} onChange={onDietTypeChange}>
        <option value="all">All Diet Types</option>
        {dietOptions
          .filter((option) => option !== 'all')
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  )
}

export default FilterControls
