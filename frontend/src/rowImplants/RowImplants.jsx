function RowImplants({ enelImplant }) {
    const implantName = enelImplant.availability ? enelImplant.name :
        <span style={{ color: 'red' }}>
            {enelImplant.name}
        </span>;

    return (
        <tr>
            <td>{implantName}</td>
            <td>{enelImplant.category}</td>
        </tr>
    );
}

export default RowImplants;