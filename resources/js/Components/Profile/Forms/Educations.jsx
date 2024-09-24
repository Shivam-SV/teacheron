import { useForm } from "@inertiajs/react";
import { formHandler } from "../../../_utils/commons";
import { DateTime } from "luxon";

export default function EducationForm({user, onSuccess}){
    const defaultEducation = {name: '', started_at: '', ended_at: '', institute_name: '', obtained_score: '', max_score: '', user_id: user.id};
    const {data, setData, errors, processing, post, reset} = useForm({
        education: user?.qualifications?.length > 0 ? [... user.qualifications.map(q => ({...q,ended_at: DateTime.fromISO(q.ended_at).toFormat('yyyy-LL'), started_at: DateTime.fromISO(q.started_at).toFormat('yyyy-LL')}))] :  [{...defaultEducation}]
    });
    const updateForm = (key, index, value) => {
        let obj = data.education;
        obj[index][key] = value;
        setData('education', obj);
    }

    const AddAnotherEducation = () => {
        setData('education', [...data.education, {...defaultEducation}]);
    }

    return (
        <form action={route('profile.update-educations', btoa(user.id))} onSubmit={formHandler(post, () => {reset('education');onSuccess()})}>
            {data?.education?.length > 0 && data.education.map((edu, i) => {
                return (
                    <div className="grid gap-4 grid-cols-12 p-2" key={i}>
                        <div className="col-span-2">
                            <div className="form-control">
                                {i === 0 && <label htmlFor="name">Course name</label>}
                                <input className="input input-bordered" type="text" name="name" id="name" value={edu.name} onChange={e => updateForm('name', i, e.target.value)} />
                                { errors && errors[`education.${i}.name`] && <span className="text-error">{errors[`education.${i}.name`].toString().replace(`education.${i}.name`, 'Course name')}</span>}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="form-control">
                                {i === 0 && <label htmlFor="institute_name">Institute Name</label>}
                                <input className="input input-bordered" type="text" name="institute_name" id="institute_name" value={edu.institute_name} onChange={e => updateForm('institute_name', i, e.target.value)} />
                                { errors && errors[`education.${i}.institute_name`] && <span className="text-error">{errors[`education.${i}.institute_name`].toString().replace(`education.${i}.institute_name`, 'Institute name')}</span>}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="form-control">
                                {i === 0 && <label htmlFor="started_at">Started At</label>}
                                <input className="input input-bordered" type="month" name="started_at" id="started_at" value={edu.started_at} onChange={e => updateForm('started_at', i, e.target.value)} />
                                { errors && errors[`education.${i}.started_at`] && <span className="text-error">{errors[`education.${i}.started_at`].toString().replace(`education.${i}.started_at`, 'Started at date')}</span>}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="form-control">
                                {i === 0 && <label htmlFor="ended_at">Ended At</label>}
                                <input className="input input-bordered" type="month" name="ended_at" id="ended_at" value={edu.ended_at} onChange={e => updateForm('ended_at', i, e.target.value)} />
                                { errors && errors[`education.${i}.ended_at`] && <span className="text-error">{errors[`education.${i}.ended_at`].toString().replace(`education.${i}.ended_at`, 'Ended at date')}</span>}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="form-control">
                                {i === 0 && <label htmlFor="obtained_score">Ontained marks </label>}
                                <input className="input input-bordered" type="number" name="obtained_score" id="obtained_score" step='1' min="0" value={edu.obtained_score} onChange={e => updateForm('obtained_score', i, e.target.value)} />
                                { errors && errors[`education.${i}.obtained_score`] && <span className="text-error">{errors[`education.${i}.obtained_score`].toString().replace(`education.${i}.obtained_score`, 'Obtained marks')}</span>}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="form-control">
                                {i === 0 && <label htmlFor="max_score">Max marks </label>}
                                <input className="input input-bordered" type="number" name="max_score" id="max_score" step='1' min="0" value={edu.max_score} onChange={e => updateForm('max_score', i, e.target.value)} />
                                { errors && errors[`education.${i}.max_score`] && <span className="text-error">{errors[`education.${i}.max_score`].toString().replace(`education.${i}.max_score`, 'Max Score')}</span>}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="mt-4 flex justify-end items-center gap-2">
                <button type="button" onClick={AddAnotherEducation} className="btn btn-ghost text-primary"><i className="bx bx-plus text-lg valign-center"></i> Add Education</button>
                <button className="btn btn-primary" disabled={processing}>{processing && <i className='bx bx-loader-alt bx-spin' ></i>} <i className="bx bx-save text-lg valign-center"></i> Save</button>
            </div>
        </form>
    );
}
