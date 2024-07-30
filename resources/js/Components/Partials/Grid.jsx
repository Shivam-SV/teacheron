import { usePage } from "@inertiajs/react";
import { appendActionColumn, defaultActionButtons, MakePaginationComponent, rowsFetcher } from "../../Helpers/gridHelper";
export default function Grid({columns, url, placeholder, hydration, haveActions, onRowEdit, onRowDelete, onRowsRender}){
    const {defaultPageSize, pageSizes} = usePage().props
    columns = haveActions ? appendActionColumn(columns) : columns;

    const onRowsFetched = (r) => {
        if(haveActions) r.actions = defaultActionButtons(r, onRowEdit, onRowDelete);
        if(onRowsRender) r = onRowsRender(r);
        return r;
    }

    const {reload, rows, paginationLinks, rawResponse} = rowsFetcher({url,onRowsFetched});

    if(hydration.value){
        reload();
        hydration.set(false);
    }

    return (
        <div className="grid-wrapper">
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
                        {rows.length > 0 ? rows.map( (r, i) => {
                            return <tr key={i}>{columns ? columns.map(col => {
                                return <td key={col.field}>{r[col.field] ?? ''}</td>
                            }) : <></>}</tr>
                        }) : (placeholder ? <tr><td colSpan={columns.length} className="italic text-base-300 text-center">{placeholder}</td></tr> : <></>)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={columns.length}>
                                <div className="flex justify-between items-center">
                                    <div className="">
                                        {rows.length ? <p className="text-neutral/50 italic">Showing {rawResponse.from} to {rawResponse.to}, {rawResponse.total} total</p> : <></>}
                                    </div>
                                    <div className="">
                                        <div className="flex gap-2">
                                            <div>
                                                { pageSizes.length > 0 ?
                                                    <select name="pageSizes" id="pageSizes" className="select select-bordered select-sm" defaultValue={defaultPageSize}>
                                                        {pageSizes.map(p => {
                                                            return <option key={p} value={p}>{p}</option>
                                                        })}
                                                    </select> :
                                                <></> }

                                            </div>
                                            {rows.length > 0 ? <MakePaginationComponent serverData={rawResponse} /> : <></>}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
