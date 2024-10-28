import ImplantTable from '../implantsTable/ImplantsTable';
import SearchBar from '../searchBar/SearchBar';
import ScrollTop from '../scrollTop/ScrollTop';
// import logo from './logo-enel.png';
// import "./FilterableImplantsTable.css";
import { useEffect, useState } from "react";

function FilterableImplantsTable(props) {
    const [filterText, setFilterText] = useState('');
    const [availabilityOnly, setAvailabilityOnly] = useState(false);
    const [operabilityOnly, setOperabilityOnly] = useState(false);
    const [selectCategory, setSelectCategory] = useState([]);
    const [selectCountry, setSelectCountry] = useState([]);
    const [enelImplants, setImplants] = useState([]);

    useEffect(() => {
        async function download() {
            fetch("http://127.0.0.1:8080/api/implants/")
                .then(response => response.json())
                .then(formatted_data => {
                    setImplants(formatted_data)
                });
        }
        download();
    },
        []
    )

    return (
        <>
            <SearchBar
                filterText={filterText}
                enelImplants={enelImplants}
                selectCategory={selectCategory}
                selectCountry={selectCountry}
                operabilityOnly={operabilityOnly}
                availabilityOnly={availabilityOnly}
                onFilterTextChange={setFilterText}
                selectCategoryChange={setSelectCategory}
                selectCountryChange={setSelectCountry}
                operabilityOnlyChange={setOperabilityOnly}
                availabilityOnlyChange={setAvailabilityOnly} />
            <ImplantTable
                enelImplants={enelImplants}
                filterText={filterText}
                selectCategory={selectCategory}
                selectCountry={selectCountry}
                operabilityOnly={operabilityOnly}
                availabilityOnly={availabilityOnly} />
        </>
    );
}

export default FilterableImplantsTable;