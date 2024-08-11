import { useRef, useState } from "react";
import Layout from "../../../Layouts/AdminLayout";
import Grid from "../../../Components/Partials/Grid";
import { router, useForm } from "@inertiajs/react";
import { formHandler } from "../../../Helpers/appHelper";
import DeleteRowPopup from "../../../Components/Partials/DeleteRowPopup";

export default function level({columns, experties, auth}){
    const defaultFormValues = {
        level_id: '',
        level_name: '',
        experties_as: experties[0],
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
    const [isHydrated, setIsHydrated] = useState(false);
    const [deletableRowId, setDeletableRowId] = useState(null);

    const {processing, post, put, data, setData, errors} = useForm(defaultFormValues);

    const onSuccess = () => {
        modelRef.current.close();
        setData(defaultFormValues);
        setIsHydrated(true);
    }

    const onRowEdit = (event, row) => {
        setData({
            level_name: row.level_name,
            experties_as: row.experties_as,
            level_id: row.id
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
                setIsHydrated(true)
            }
        });
    }

    const stylizeExperties = (r) => {
        r.experties_as = <div className={"badge " + (badgeColors[r.experties_as] ?? '')}>{r.experties_as.ucfirst()}</div>
        return r;
    }

    return (
        <Layout title="Level"
            cta={<><button onClick={() => modelRef.current.showModal()} className="btn btn-primary"><i className="bx bx-plus text-lg"></i> Level</button></>}>

        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <Grid
                    url={location.href}
                    haveActions={true}
                    onRowEdit={onRowEdit}
                    onRowDelete={onRowDelete}
                    onRowsRender={stylizeExperties}
                    columns={columns}
                    placeholder="No Rows Found"
                    hydration={{value:isHydrated, set: setIsHydrated}}
                    />
            </div>
        </div>


        <dialog ref={modelRef} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add Level</h3>
                <form action={isEditing ? route('supadmin.level.update', data.level_id) : route('supadmin.level.store')} onSubmit={formHandler((isEditing ? put : post), onSuccess)}>
                    <div className="py-4">
                        <div className="form-control mb-2">
                            <label htmlFor="level_name">Level Name <span className="text-error">*</span></label>
                            <input value={data.level_name} onInput={(e) => setData('level_name', e.target.value)} type="text" className="input input-bordered" id="level_name" placeholder="Eg: Matrix / Senior Studies" />
                            {errors.level_name && <span className="text-error">{errors.level_name}</span>}
                        </div>
                        <div className="form-control mb-2">
                            <label htmlFor="meta" className="mb-1">Experties</label>
                            <select name="experties_as" id="experties_as" className="select select-bordered" defaultValue={data.experties_as} onChange={(e) => setData('experties_as', e.target.value)}>
                                { experties.length > 0 ? experties.map(e => {
                                    return <option key={e} value={e} >{e.ucfirst()}</option>
                                }) : <option className="italic">No experties defined</option> }
                            </select>
                            {errors.experties_as && <span className="text-error">{errors.experties_as}</span>}
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
