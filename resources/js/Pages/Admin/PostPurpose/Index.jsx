import { useRef, useState } from "react";
import Table from "../../../Components/Partials/Table";
import Layout from "../../../Layouts/AdminLayout";
import { formHandler } from "../../../Helpers/appHelper";
import { router, useForm } from "@inertiajs/react";
import DeleteRowPopup from "../../../Components/Partials/DeleteRowPopup";

export default function PostPurposes({postPurposes}){
    const defaultFormValues = {
        id: '',
        name: '',
        description: '',
    };
    const modelRef = useRef(null);
    const DeleteRef = useRef(null);
    const [deletableRowId, setDeletableRowId] = useState(null);

    const {processing, post, put, data, setData, errors, reset} = useForm(defaultFormValues);
    const [isEditing, setIsEditing] = useState(false);

    const onSuccess = () => {
        modelRef.current.close();
        reset('id', 'name', 'description');
        setIsEditing(false);
    }

    const deletePostPurpose = () => {
        router.delete(route('supadmin.post-purpose.destroy', deletableRowId), {
            onFinish(){
                DeleteRef.current.close();
            }
        });
    }

    const onRowEdit = (event, row) => {
        setData({
            name: row.name,
            description: row.description,
            id: row.id
        })
        setIsEditing(true);
        modelRef.current.showModal()
    }

    const onRowDelete = (event, row) => {
        setDeletableRowId(row.id);
        DeleteRef.current.showModal();
    }

    return (
        <Layout title="Post Purposes"
            cta={<><button onClick={() => modelRef.current.showModal()} className="btn btn-primary"><i className="bx bx-plus text-lg"></i> Post Purposes</button></>}>
            <div className="card bg-white">
                <div className="card-body">
                    <Table
                        resource={postPurposes}
                        placeholder="No Post Purposes Found"
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
                    <h3 className="font-bold text-lg">Add Post Purpose</h3>
                    <form action={isEditing ? route('supadmin.post-purpose.update', data.id) : route('supadmin.post-purpose.store')} onSubmit={formHandler((isEditing ? put : post), onSuccess)}>
                        <div className="py-4">
                            <div className="form-control mb-2">
                                <label htmlFor="name">Name <span className="text-error">*</span></label>
                                <input value={data.name} onInput={(e) => setData('name', e.target.value)} type="text" className="input input-bordered" id="name" placeholder="A post creation purpose" />
                                {errors.name && <span className="text-error">{errors.name}</span>}
                            </div>
                            <div className="form-control mb-2">
                                <label htmlFor="description" className="mb-1">Description</label>
                                <textarea value={data.description} onInput={(e) => setData('description', e.target.value)} name="description" id="description" placeholder="A brief about the post purpose" className="input input-bordered"></textarea>
                                {errors.description && <span className="text-error">{errors.description}</span>}
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="submit" disabled={processing} className="btn btn-primary">{processing && <i className='bx bx-loader-alt bx-spin' ></i>} Save</button>
                            <button type="button" onClick={() => modelRef.current.close()} className="btn">Close</button>
                        </div>
                    </form>
                </div>
            </dialog>

            <DeleteRowPopup popupRef={DeleteRef} confirmCallback={deletePostPurpose} />
        </Layout>
    );
}
