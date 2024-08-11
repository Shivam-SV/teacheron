import Layout from "../../../Layouts/AdminLayout";
import { useRef, useState } from "react";
import Grid from "../../../Components/Partials/Grid";
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

    const {processing, post, put, data, setData, errors, reset} = useForm(defaultFormValues);
    const [isEditing, setIsEditing] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

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
        router.delete(route('supadmin.subject.destroy', deletableRowId), {
            onFinish(){
                DeleteRef.current.close();
                setIsHydrated(true)
            }
        });
    }

    const onSuccess = () => {
        modelRef.current.close();
        reset('meta', 'name', 'subject_id');
        setIsHydrated(true);
    }

    return (
        <Layout title="Subjects"
            cta={<><button onClick={() => modelRef.current.showModal()} className="btn btn-primary"><i className="bx bx-plus text-lg"></i> Subject</button></>}>
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <Grid
                        url={location.href}
                        haveActions={true}
                        onRowEdit={onRowEdit}
                        onRowDelete={onRowDelete}
                        columns={columns}
                        placeholder="No Rows Found"
                        hydration={{value:isHydrated, set: setIsHydrated}}
                     />
                </div>
            </div>

            <dialog ref={modelRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Subject</h3>
                    <form action={isEditing ? route('supadmin.subject.update', data.subject_id) : route('supadmin.subject.store')} onSubmit={formHandler((isEditing ? put : post), onSuccess)}>
                        <div className="py-4">
                            <div className="form-control mb-2">
                                <label htmlFor="name">Name <span className="text-error">*</span></label>
                                <input value={data.name} onInput={(e) => setData('name', e.target.value)} type="text" className="input input-bordered" id="name" placeholder="Eg: Python / Physics" />
                                {errors.name && <span className="text-error">{errors.name}</span>}
                            </div>
                            <div className="form-control mb-2">
                                <label htmlFor="meta" className="mb-1">Description</label>
                                <textarea value={data.meta} onInput={(e) => setData('meta', e.target.value)} name="meta" id="meta" placeholder="give a brief about the subject, to clarify the users" className="input input-bordered"></textarea>
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
