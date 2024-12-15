import { useEffect, useState } from 'react';

import { SnackBarProvider } from '../contextFiles/SnackBarContext';
import SearchBar from '../searchBar/SearchBar';
import ImplantTable from '../implantsTable/ImplantsTable';

function FilterableImplantsTable() {
    const [filterText, setFilterText] = useState('');
    const [operabilityOnly, setOperabilityOnly] = useState(false);
    const [availabilityOnly, setAvailabilityOnly] = useState(false);
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
    }, [])

    const category = [...new Set(enelImplants.map(implant => implant.category))];
    const country = [...new Set(enelImplants.map(implant => implant.country))];

    useEffect(() => {
        if (!Array.isArray(selectCategory)) setSelectCategory([]);
        if (!Array.isArray(selectCountry)) setSelectCountry([]);
    }, [selectCategory, selectCountry]);

    return (
        <>
            <SearchBar
                filterText={filterText}
                category={category}
                country={country}
                selectCategory={selectCategory}
                selectCountry={selectCountry}
                operabilityOnly={operabilityOnly}
                availabilityOnly={availabilityOnly}
                onFilterTextChange={setFilterText}
                selectCategoryChange={setSelectCategory}
                selectCountryChange={setSelectCountry}
                operabilityOnlyChange={setOperabilityOnly}
                availabilityOnlyChange={setAvailabilityOnly}
            />
            <div style={{ paddingTop: "16px" }} />
            <SnackBarProvider>
                <ImplantTable
                    enelImplants={enelImplants}
                    selectEnelImplant={setImplants}
                    filterText={filterText}
                    selectCategory={Array.isArray(selectCategory) ? selectCategory : []}
                    selectCountry={Array.isArray(selectCountry) ? selectCountry : []}
                    operabilityOnly={operabilityOnly}
                    availabilityOnly={availabilityOnly}
                />
            </SnackBarProvider>
        </>
    );
}

export default FilterableImplantsTable;