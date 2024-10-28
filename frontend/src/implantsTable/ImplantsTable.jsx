import RowImplants from "../rowImplants/RowImplants"

function ImplantTable({
    enelImplants,
    filterText,
    selectCategory,
    selectCountry,
    operabilityOnly,
    availabilityOnly
}) {
    console.log(selectCategory)

    const rowsImplants = [];

    enelImplants.forEach((enelImplant) => {
        if (
            enelImplant.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (selectCategory.length && !selectCategory.includes(enelImplant.category)) {
            return
        }
        if (selectCountry.length && !selectCountry.includes(enelImplant.country)) {
            return
        }
        if (availabilityOnly && !enelImplant.availability) {
            return;
        }
        if (operabilityOnly && !enelImplant.operability) {
            return;
        }
        rowsImplants.push(
            <RowImplants
                enelImplant={enelImplant}
                key={enelImplant.id}
            />
        )
    });

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type of plant</th>
                        <th>Country</th>
                        <th>Rated power in MW</th>
                        <th>Number of units</th>
                        <th>Operability</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {rowsImplants}
                </tbody>
            </table>
        </>
    )
}

export default ImplantTable