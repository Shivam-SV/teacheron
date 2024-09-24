import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { formHandler } from "../../../_utils/commons";
import Select from "react-select";

export default function SubjectsForm({user, onSubmit}){
    const [subjects, setSubjects] = useState([]);
    const [levels, setLevels] = useState([]);
    const getSubjects = async() => {
        let subjects = await fetch(route('api.subjects')).then(res => res.json());
        setSubjects(subjects);
    }
    const getLevels = async() => {
        let levels = await fetch(route('api.levels')).then(res => res.json());
        setLevels(levels.map(l => ({value: l.id, label: l.name})));
    }
    useEffect(() => {
        getSubjects();
        getLevels();
        return () => {
            setSubjects([]);
            setLevels([]);
        };
    }, []);
    const userSelectedSubjects =user?.user_subjects?.length && user?.user_subjects?.map(us => ({id: us.id, subject_id: us.subject.id, levels_id: us.levels.map(l => l.id)}));
    const subjectRowTemplate = {id: '',subject_id:"",levels_id: []};
    const {data, setData, processing, errors, post, reset} = useForm(
        userSelectedSubjects && userSelectedSubjects.length > 0 ? {userSubjects:[...userSelectedSubjects, {...subjectRowTemplate} ]}: {userSubjects:[{...subjectRowTemplate}]}
    );
    const addRow = () => setData('userSubjects', [...data.userSubjects, {...subjectRowTemplate}]);
    const removeRow = (i) => setData('userSubjects', data.userSubjects.filter((e, index) => index !== i));

    const updateUserSubjects = (index, key, value) => {
        let rows = data.userSubjects;
        rows[index][key] = value;
        setData('userSubjects', rows);
    }

    return (
        <form action={route('profile.update-subjects', btoa(user.id))} onSubmit={formHandler(post, () => {
            reset('userSubjects');
            onSubmit();
        })}>
            {data.userSubjects.length > 0 ? data.userSubjects.map((r, i) => {
                return (
                    <div className="grid grid-cols-12 gap-4 flex-wrap items-end" key={i}>
                        <div className="col-span-5 mb-2">
                            <div className="form-control">
                                {i === 0 ? <label htmlFor={"subject" + i}>Subject</label> : <></>}
                                <select className="select select-bordered" id={"subject" + i} onChange={(e) => updateUserSubjects(i, 'subject_id', e.target.value)} defaultValue={r.subject_id}>
                                    <option value="" disabled hidden className="italic text-neutral/40">--Select subjects--</option>
                                    {subjects.length > 0 ? subjects.map(s => {
                                        return <option key={s.id} value={s.id}>{s.name}</option>
                                    }) : <></>}
                                </select>
                            </div>
                            { errors && errors[`userSubjects.${i}.subject_id`] && <span className="text-error">{errors[`userSubjects.${i}.subject_id`].toString().replace(`userSubjects.${i}.subject_id`, 'Subject')}</span>}
                        </div>
                        <div className="col-span-5 mb-2">
                            <div className="form-control">
                                {i === 0 ? <label htmlFor={"level_from" + i}>Levels</label> : <></>}
                                <Select isMulti defaultValue={r.levels_id.map(lId => levels.find(l => l.value === lId))} onChange={(o, e) => updateUserSubjects(i, 'levels_id', o.map(v => v.value))} options={levels}></Select>
                            </div>
                            {errors && errors[`userSubjects.${i}.levels_id`] && <span className="text-error">{errors[`userSubjects.${i}.levels_id`].toString().replace(`userSubjects.${i}.levels_id`, 'Level')}</span>}
                        </div>
                        <div className="col-span-2 mb-2 text-center">
                            { i === (data.userSubjects.length - 1) ?
                                <button type="button" className="btn btn-ghost" onClick={addRow}><i className="bx bx-plus text-lg"></i></button> :
                                <button type="button" className="btn btn-ghost" onClick={() => removeRow(i)}><i className="bx bx-minus text-lg"></i></button>
                            }
                        </div>
                    </div>
                );
            }) : <em className="text-neutral/40">No added subject</em>}
            <div className="modal-action justify-center">
                <button className="btn btn-primary w-1/4">{processing && <i className='bx bx-loader-alt bx-spin' ></i>} Save</button>
            </div>
        </form>
    );
}
