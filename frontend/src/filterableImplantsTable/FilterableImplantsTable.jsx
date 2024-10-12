import ImplantTable from "../implantsTable/ImplantsTable";
import SearchBar from "../searchBar/SearchBar";
import { useState } from "react";

function FilterableImplantsTable({ enelImplants }) {
    const [filterText, setFilterText] = useState('');
    const [availabilityOnly, setAvailabilityOnly] = useState(false);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                availabilityOnly={availabilityOnly}
                onFilterTextChange={setFilterText}
                availabilityOnlyChange={setAvailabilityOnly} />
            <ImplantTable
                enelImplants={enelImplants}
                filterText={filterText}
                availabilityOnly={availabilityOnly} />
        </div>
    );
}

export default FilterableImplantsTable;