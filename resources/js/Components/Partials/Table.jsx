import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Table({ resource, placeholder, actions }) {
    const [query, setQuery] = useState({});

    const handleSearch = (e) => {
        setQuery({ ...query, search: e.target.value });
    }

    const handlePerPage = (e) => {
        setQuery({ ...query, per_page: e.target.value });
    }

    const handleSort = (column, direction) => {
        console.log(column, direction);
        setQuery({ ...query, sort: {[column]: direction} });
    }


    useEffect(() => {
        const hydrateTable = setTimeout(() => {
            router.visit(location.pathname, { data: query, replace: true, preserveState: true });
        }, 250);
        return () => clearTimeout(hydrateTable);
    }, [query]);

    const ActionComponent = ({actionName, row}) => {
        const Action = actions[actionName];
        return Action ? <Action row={row} /> : <><p>Lan fad lo</p></>;
    }

    return (
        <div className="grid-wrapper">
            <div className="filters flex gap-4 justify-between items-center flex-wrap">
                <div className="col-span-3">
                    <div className="form-control mb-2">
                        <input type="Search" className="input input-bordered input-sm" placeholder="Search" value={query?.search ?? ''} onChange={handleSearch} />
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="form-control mb-2">
                        <select className="select select-bordered select-sm" defaultValue={resource?.per_page ?? ''} onChange={handlePerPage}>
                            {resource?.pagination?.length > 0 && resource?.pagination?.map((item, index) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-pin-rows mb-2">
                    <thead>
                        <tr>
                            {
                                resource?.columns?.length > 0 && resource?.columns?.map((column, index) => (
                                    <th key={index} className={`${column.is_sortable ? 'cursor-pointer ' : ''}`} onClick={() => handleSort(column.column, column.sort_by === 'asc' ? 'desc' : 'asc')}>
                                        <span>{column.label}</span>
                                        {column.is_sortable && <button className="sort-icon float-right">
                                            {
                                                column.sort_by === '' ? '' : column.sort_by === 'desc' ? <i className="bx bx-down-arrow-alt text-lg leading-none"></i> : <i className="bx bx-up-arrow-alt text-lg leading-none"></i>
                                            }
                                        </button>}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {resource?.data?.length > 0 ? resource?.data?.map((item, index) => (
                            <tr key={index}>
                                {
                                    resource?.columns?.length > 0 && resource?.columns?.map((column, i) => {
                                        return (column.is_action ? <td key={i}><ActionComponent actionName={column.column} row={item} /></td> : <td key={i}>{item[column.column]}</td>)
                                    })
                                }
                            </tr>
                        )) : <tr>
                            <td colSpan={resource?.columns?.length} className="text-center">{placeholder ?? 'No rows found'}</td>
                        </tr>}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center">
                <p>Showing {resource?.from} to {resource?.to} of {resource?.total} entries</p>
                <div className="join">
                    {Array.from({ length: resource?.last_page }, (_, index) => (
                        <button key={index} className={"join-item btn btn-sm " + (resource?.current_page === index + 1 ? 'btn-active' : '')}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
