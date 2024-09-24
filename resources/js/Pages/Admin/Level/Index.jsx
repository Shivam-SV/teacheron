import { useRef, useState } from "react";
import Layout from "../../../Layouts/AdminLayout";
import Grid from "../../../Components/Partials/Grid";
import { router, useForm } from "@inertiajs/react";
import { formHandler } from "../../../_utils/commons";
import Confirm from "../../../Components/Partials/Confirm";
import Table from "../../../Components/Partials/Table";
import CreatableSelect from 'react-select/creatable';

export default function level({levels, auth}){
    const defaultFormValues = {
        id: '',
        name: '',
        group_name: "",
        tags: [],
        created_by_user_id: auth.id
    };
    const badgeColors = {
        beginner: 'badge-primary',
        intermediate: 'badge-secondary',
        expert: 'badge-accent',
        professional: ''
    };

    const modelRef = useRef(null);
    const DeleteRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [deletableRowId, setDeletableRowId] = useState(null);

    const {processing, post, put, data, setData, errors} = useForm(defaultFormValues);

    const onSuccess = () => {
        modelRef.current.close();
        setData(defaultFormValues);
        setIsEditing(false);
    }

    const onRowEdit = (event, row) => {
        setData({
            name: row.name,
            group_name: row.group_name,
            tags: row.tags.split(', '),
            id: row.id,
            created_by_user_id: auth.id
        })
        setIsEditing(true);
        modelRef.current.showModal()
    }

    const onRowDelete = (event, row) => {
        setDeletableRowId(row.id);
        DeleteRef.current.showModal();
    }

    const deleteSubject = () => {
        router.delete(route('supadmin.level.destroy', deletableRowId), {
            onFinish(){
                DeleteRef.current.close();
            }
        });
    }

    return (
        <Layout title="Level"
            cta={<><button onClick={() => modelRef.current.showModal()} className="btn btn-primary"><i className="bx bx-plus text-lg"></i> Level</button></>}>

        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <Table
                    resource={levels}
                    placeholder="No Levels Found"
                    actions={{
                        action: ({row})=>{
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
                <h3 className="font-bold text-lg">Add Level</h3>
                <form action={isEditing ? route('supadmin.level.update', data.id) : route('supadmin.level.store')} onSubmit={formHandler((isEditing ? put : post), onSuccess)}>
                    <div className="py-4">
                        <div className="form-control mb-2">
                            <label htmlFor="name">Level Name <span className="text-error">*</span></label>
                            <input value={data.name} onInput={(e) => setData('name', e.target.value)} type="text" className="input input-bordered" id="name" placeholder="Eg: Matrix / Senior Studies" />
                            {errors.name && <span className="text-error">{errors.name}</span>}
                        </div>
                        <div className="form-control mb-2">
                            <label htmlFor="group_name">Level Group Name <span className="text-error">*</span></label>
                            <input value={data.group_name} onInput={(e) => setData('group_name', e.target.value)} type="text" className="input input-bordered" id="group_name" placeholder="Eg: Courses / Std" />
                            {errors.group_name && <span className="text-error">{errors.group_name}</span>}
                        </div>
                        <div className="form-control mb-2">
                            <label htmlFor="tags">Tags <span className="text-error">*</span></label>
                            <CreatableSelect options={[]} isClearable value={data.tags?.map(v => ({label: v, value: v}))} isMulti onChange={value => setData('tags', value.map(v => v.value))} placeholder="Tags for better search" />
                            {errors.tags && <span className="text-error">{errors.tags}</span>}
                        </div>
                    </div>
                    <div className="modal-action">
                        <button type="submit" disabled={processing} className="btn btn-primary">{processing && <i className='bx bx-loader-alt bx-spin' ></i>} Save</button>
                        <button type="button" onClick={() => modelRef.current.close()} className="btn">Close</button>
                    </div>
                </form>
            </div>
        </dialog>

        <Confirm popupRef={DeleteRef} onConfirm={deleteSubject} type='error' iconClass="bx-trash" title="Are you sure?" message="Deleteing this level will also delete the levels under the subjects associated with it." />
        </Layout>
    );
}
