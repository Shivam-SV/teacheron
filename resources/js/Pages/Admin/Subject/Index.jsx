import Layout from "../../../Layouts/AdminLayout";
import { useRef, useState } from "react";
import { formHandler } from "../../../_utils/commons";
import { router, useForm } from "@inertiajs/react";
import Confirm from "../../../Components/Partials/Confirm";
import Table from "../../../Components/Partials/Table";

export default function Subjects({subjects, auth}){
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
            }
        });
    }

    const onSuccess = () => {
        modelRef.current.close();
        reset('meta', 'name', 'subject_id');
        setIsEditing(false);
    }

    return (
        <Layout title="Subjects"
            cta={<><button onClick={() => modelRef.current.showModal()} className="btn btn-primary"><i className="bx bx-plus text-lg"></i> Subject</button></>}>
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <Table
                        resource={subjects}
                        placeholder="No Subjects Found"
                        actions={{
                            action:({row}) => {
                                return (
                                    <>
                                        <button className="btn btn-primary btn-sm mr-1" onClick={(e) => onRowEdit(e, row)}><i className="bx bx-edit"></i> Edit</button>
                                        <button className="btn btn-error btn-sm" onClick={(e) => onRowDelete(e, row)}><i className="bx bx-trash"></i> Delete</button>
                                    </>
                                )
                            }
                        }}
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

            <Confirm popupRef={DeleteRef} confirmCallback={deleteSubject} type='error' iconClass="bx-trash" title="Are you sure?" message="Deleting this subject will also delete all the related data." />
        </Layout>
    );
}
