import Layout from "../../../Layouts/AdminLayout";
import { useRef, useState } from "react";
import Grid from "../../../Components/Partials/Grid";
import { appendActionColumn, defaultActionButtons, rowsFetcher } from "../../../Helpers/gridHelper";
import { formHandler } from "../../../Helpers/appHelper";
import { router, useForm } from "@inertiajs/react";
import DeleteRowPopup from "../../../Components/Partials/DeleteRowPopup";

export default function Subjects({columns, auth}){
    const defaultFormValues = {
        subject_id: '',
        name: '',
        meta: '',
        created_by_user_id: auth.id
    };
    const modelRef = useRef(null);
    const DeleteRef = useRef(null);
    const [deletableRowId, setDeletableRowId] = useState(null);

    const {processing, post, put, data, setData, errors} = useForm(defaultFormValues);
    const [isEditing, setIsEditing] = useState(false);
    columns = appendActionColumn(columns);

    const {reload, rows} = rowsFetcher({
        url: location.href,
        onRowsFetched(r){
            r.actions = defaultActionButtons(r, onRowEdit, onRowDelete);
            return r;
        }
    })


    const onRowEdit = (event, row) => {
        setData({
            name: row.name,
            meta: row.meta,
            subject_id: row.id
        })
        setIsEditing(true);
        modelRef.current.showModal()
    }

    const onRowDelete = (event, row) => {
        setDeletableRowId(row.id);
        DeleteRef.current.showModal();
    }

    const deleteSubject = () => {
        router.delete(`/supadmin/subject/${deletableRowId}/delete`, {
            onFinish(){
                DeleteRef.current.close();
                reload()
            }
        });
    }

    const onSuccess = () => {
        modelRef.current.close();
        setData(defaultFormValues);
        reload();
    }

    return (
        <Layout title="Subjects"
            cta={<><button onClick={() => modelRef.current.showModal()} className="btn btn-primary"><i className="bx bx-plus text-lg"></i> Subject</button></>}>
            <div className="card bg-base-100">
                <div className="card-body">
                    <Grid
                    columns={columns}
                    data={rows}
                    placeholder="No Rows Found"
                     />
                </div>
            </div>

            <dialog ref={modelRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Subject</h3>
                    <form action={isEditing ? `/supadmin/subject/${data.subject_id}/update` : "/supadmin/subject/store"} onSubmit={formHandler((isEditing ? put : post), onSuccess)}>
                        <div className="py-4">
                            <div className="form-control mb-2">
                                <label htmlFor="name">Name <span className="text-error">*</span></label>
                                <input value={data.name} onInput={(e) => setData('name', e.target.value)} type="text" className="input input-bordered" id="name" placeholder="Eg: Python / Physics" />
                                {errors.name && <span className="text-error">{errors.name}</span>}
                            </div>
                            <div className="form-control mb-2">
                                <label htmlFor="meta" className="mb-1">Description</label>
                                <textarea defaultValue={data.meta} onInput={(e) => setData('meta', e.target.value)} name="meta" id="meta" placeholder="give a brief about the subject, to clarify the users" className="input input-bordered"></textarea>
                                {errors.meta && <span className="text-error">{errors.meta}</span>}
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="submit" disabled={processing} className="btn btn-primary">{processing && <i className='bx bx-loader-alt bx-spin' ></i>} Save</button>
                            <button type="button" onClick={() => modelRef.current.close()} className="btn">Close</button>
                        </div>
                    </form>
                </div>
            </dialog>

            <DeleteRowPopup popupRef={DeleteRef} confirmCallback={deleteSubject} />
        </Layout>
    );
}
