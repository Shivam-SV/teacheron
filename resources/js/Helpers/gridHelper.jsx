import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function rowsFetcher({url, onRowsFetched}){
    const [rows, setrows] = useState([]);

    // Helps to send the request to the server
    async function Requester(){
        try{
            let res = await axios.get(url);
            res = res.data.map(r => onRowsFetched(r));
            setrows(res)
        }catch(e){
            console.log(e);
            toast.error("Error while connecting with the server");
        }
    }

    useEffect(() => {
        Requester()
    }, []);

    return {reload: Requester, rows};
}

export function appendActionColumn(columns){
    return [
        ...columns,
        {title: 'Actions', field: 'actions'}
    ]
}

export function defaultActionButtons(row, editableCallback = null, destroyCallback = null){
    return (
        <>
            {editableCallback ? <button onClick={(e) => editableCallback(e, row)} className="btn btn-outline btn-circle btn-sm btn-accent mr-1"><i className="bx bx-edit text-lg"></i></button> : <></>}
            {destroyCallback ? <button onClick={(e) => destroyCallback(e, row)} className="btn btn-outline btn-circle btn-sm btn-error"><i className="bx bx-trash text-lg"></i></button> : <></>}
        </>
    )
}
