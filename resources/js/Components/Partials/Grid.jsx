export default function Grid({columns, data, placeholder}){
    return (
        <div className="overflow-x-auto">
            <table className="table table-pin-rows">
                <thead>
                    <tr>
                        {columns ? columns.map(c => {
                            return <th key={c.field}>{c.title}</th>
                        }) : <></>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map( (r, i) => {
                        return <tr key={i}>{columns ? columns.map(col => {
                            return <td key={col.field}>{r[col.field] ?? ''}</td>
                        }) : <></>}</tr>
                    }) : (placeholder ? <tr><td colSpan={columns.length} className="italic text-base-300 text-center">{placeholder}</td></tr> : <></>)}
                </tbody>
            </table>
        </div>
    );
}
