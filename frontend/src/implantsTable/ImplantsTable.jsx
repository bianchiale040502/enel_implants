import RowImplants from "../rowImplants/RowImplants";

function ImplantTable({ enelImplants, filterText, availabilityOnly }) {
    const rowsImplants = [];

    enelImplants.forEach((enelImplant) => {
        if (
            enelImplant.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (availabilityOnly && !enelImplant.availability) {
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
                        <th>Category</th>
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