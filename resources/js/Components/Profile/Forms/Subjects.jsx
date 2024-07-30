import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { formHandler } from "../../../Helpers/appHelper";

export default function SubjectsForm({user, onSubmit}){
    const [subjects, setSubjects] = useState([]);
    const [levels, setLevels] = useState([]);
    const getSubjects = async() => {
        let subjects = await fetch(route('api.subjects')).then(res => res.json());
        setSubjects(subjects);
    }
    const getLevels = async() => {
        let levels = await fetch(route('api.levels')).then(res => res.json());
        setLevels(levels);
    }
    useEffect(() => {
        getSubjects();
        getLevels();
        return () => {
            setSubjects([]);
            setLevels([]);
        };
    }, []);
    const subjectRowTemplate = {subject_id:"",level_from_id:"",level_to_id:""};
    const {data, setData, processing, errors, post, reset} = useForm({
        userSubjects: [
            {...subjectRowTemplate}
        ]
    });

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
                        <div className="col-span-4 mb-2">
                            <div className="form-control">
                                {i === 0 ? <label htmlFor={"subject" + i}>Subject</label> : <></>}
                                <select className="select select-bordered" id={"subject" + i} onChange={(e) => updateUserSubjects(i, 'subject_id', e.target.value)} defaultValue={r.subject_id}>
                                    <option value="" disabled selected hidden className="italic text-neutral/40">--Select subjects--</option>
                                    {subjects.length > 0 ? subjects.map(s => {
                                        return <option key={s.id} value={s.id}>{s.name}</option>
                                    }) : <></>}
                                </select>
                            </div>
                            { errors?.userSubjects && errors?.userSubjects[i]?.subject_id && <span className="text-error">{errors.userSubjects[i].subject_id}</span>}
                        </div>
                        <div className="col-span-3 mb-2">
                            <div className="form-control">
                                {i === 0 ? <label htmlFor={"level_from" + i}>Level From</label> : <></>}
                                <select className="select select-bordered" id={"level_from" + i} onChange={(e) => updateUserSubjects(i, 'level_from_id', e.target.value)} defaultValue={r.level_from_id}>
                                    <option value="" disabled selected hidden className="italic text-neutral/40">--Select levels--</option>
                                    {levels.length > 0 ? levels.map(l => {
                                        return <option key={l.id} value={l.id}>{l.level_name}</option>
                                    }) : <></>}
                                </select>
                            </div>
                            {errors?.userSubjects && errors?.userSubjects[i]?.level_from_id && <span className="text-error">{errors.userSubjects[i].level_from_id}</span>}
                        </div>
                        <div className="col-span-3 mb-2">
                            <div className="form-control">
                                {i === 0 ? <label htmlFor={"level_to" + i}>Level From</label> : <></>}
                                <select className="select select-bordered" id={"level_to" + i} onChange={(e) => updateUserSubjects(i, 'level_to_id', e.target.value)} defaultValue={r.level_to_id}>
                                    <option value="" disabled selected hidden className="italic text-neutral/40">--Select levels--</option>
                                    {levels.length > 0 ? levels.map(l => {
                                        return <option key={l.id} value={l.id}>{l.level_name}</option>
                                    }) : <></>}
                                </select>
                            </div>
                            {errors?.userSubjects && errors?.userSubjects[i]?.level_to_id && <span className="text-error">{errors.userSubjects[i].level_to_id}</span>}
                        </div>
                        <div className="col-span-2 mb-2">
                            { i === 0 ?
                                <button type="button" className="btn btn-ghost" onClick={addRow}><i className="bx bx-plus text-lg"></i></button> :
                                <button type="button" className="btn btn-ghost" onClick={() => removeRow(i)}><i className="bx bx-minus text-lg"></i></button>
                            }
                        </div>
                    </div>
                );
            }) : <em className="text-neutral/40">No added subject</em>}
            <div className="modal-action justify-center">
                <button className="btn btn-primary w-1/4">Save</button>
            </div>
        </form>
    );
}
