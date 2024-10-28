function RowImplants({ enelImplant }) {

    return (
        <>
            <tr>
                <td>{enelImplant.name}</td>
                <td>{enelImplant.category}</td>
                <td>{enelImplant.country}</td>
                <td>{enelImplant.rated_power}</td>
                <td>{enelImplant.num_unita_presenti}</td>
                <td>{enelImplant.operability}</td>
                <td>{enelImplant.availability}</td>
            </tr>
        </>
    );
}

export default RowImplants;