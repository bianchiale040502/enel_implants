function SearchBar({
    filterText,
    availabilityOnly,
    onFilterTextChange,
    availabilityOnlyChange
}) {
    return (
        <form>
            <input
                type="text"
                value={filterText} placeholder="Search..."
                onChange={(e) => onFilterTextChange(e.target.value)} />
            <label>
                <input
                    type="checkbox"
                    checked={availabilityOnly}
                    onChange={(e) => availabilityOnlyChange(e.target.checked)} />
                {' '}
                Solo gli impianti disponibili
            </label>
        </form>
    );
}

export default SearchBar;