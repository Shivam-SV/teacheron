import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function rowsFetcher({url, onRowsFetched}){
    const [rows, setrows] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [rawResponse, setRawResponse] = useState([]);

    // Helps to send the request to the server
    async function Requester(){
        try{
            let res = await axios.get(url);
            setRawResponse(res.data);
            setPagination(res.data.links);
            res = res.data.data.map(r => onRowsFetched(r));
            setrows(res)
        }catch(e){
            console.log(e);
            toast.error("Error while connecting with the server");
        }
    }

    useEffect(() => {
        Requester()
    }, []);

    return {reload: Requester, rows, paginationLinks: pagination, rawResponse};
}

export function appendActionColumn(columns){
    return [
        ...columns,
        {title: 'Actions', field: 'actions'}
    ]
}

export function MakePaginationComponent({serverData}){
    const {current_page, last_page, path} = serverData;
    return (
       <div className="join">
            {[...Array(last_page).keys()].map(i => {
                return <Link key={i} href={`${path}?page=${i+1}`} as="button" className={`join-item btn btn-sm ` + (current_page === (i+1) ? 'btn-active' : '')} >{i+1}</Link>
            })}
       </div>
    );
}

export function defaultActionButtons(row, editableCallback = null, destroyCallback = null){
    return (
        <>
            {editableCallback ? <button onClick={(e) => editableCallback(e, row)} className="btn btn-outline btn-circle btn-sm btn-accent mr-1"><i className="bx bx-edit text-lg"></i></button> : <></>}
            {destroyCallback ? <button onClick={(e) => destroyCallback(e, row)} className="btn btn-outline btn-circle btn-sm btn-error"><i className="bx bx-trash text-lg"></i></button> : <></>}
        </>
    )
}
