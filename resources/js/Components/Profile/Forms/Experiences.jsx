import { useForm } from "@inertiajs/react";
import { formHandler } from "../../../_utils/commons";
import { DateTime } from "luxon";

export default function ExperienceForm({user, onSuccess, submitButtonLabel}){
    const defaultExperience = {user_id: user.id, organisation_name: '',organisation_type: '',designation: '', started_at: '',ended_at: '', description_about_role: ''};
    const {data, setData, errors, processing, post, reset} = useForm({
        experience: user?.user_experience?.length > 0 ? [... user.user_experience.map(q => ({...q,ended_at: q.ended_at ? DateTime.fromISO(q.ended_at).toFormat('yyyy-LL') : '', started_at: DateTime.fromISO(q.started_at).toFormat('yyyy-LL')}))] :  [{...defaultExperience}]
    });

    const updateForm = (key, index, value) => {
        let obj = data.experience;
        obj[index][key] = value;
        setData('experience', obj);
    }

    const AddAnotherExperience = () => {
        setData('experience', [...data.experience, {...defaultExperience}]);
    }
    return (
        <form action={route('profile.update-experience', btoa(user.id))} onSubmit={formHandler(post, onSuccess)}>
            {data?.experience?.length > 0 && data.experience.map((exp, i) => {
                return(
                    <div className="grid gap-4 grid-cols-12 p-2 mb-4 border-b" key={i}>
                        <div className="lg:col-span-2 md:col-span-4 col-span-6">
                            <div className="form-control">
                                <label htmlFor="organisation_name">Organisation name</label>
                                <input className="input input-bordered" type="text" name="organisation_name" id="organisation_name" value={exp.organisation_name} onChange={e => updateForm('organisation_name', i, e.target.value)} placeholder="ABC Company" />
                                { errors && errors[`experience.${i}.organisation_name`] && <span className="text-error">{errors[`experience.${i}.organisation_name`].toString().replace(`experience.${i}.organisation_name`, 'Organisation name')}</span>}
                            </div>
                        </div>
                        <div className="lg:col-span-2 md:col-span-4 col-span-6">
                            <div className="form-control">
                                <label htmlFor="organisation_type">Organisation type</label>
                                <input className="input input-bordered" type="text" name="organisation_type" id="organisation_type" value={exp.organisation_type} onChange={e => updateForm('organisation_type', i, e.target.value)} placeholder="Textile/ IT/ Manufacturing" />
                                { errors && errors[`experience.${i}.organisation_type`] && <span className="text-error">{errors[`experience.${i}.organisation_type`].toString().replace(`experience.${i}.organisation_type`, 'Organisation type')}</span>}
                            </div>
                        </div>
                        <div className="lg:col-span-2 md:col-span-4 col-span-6">
                            <div className="form-control">
                                <label htmlFor="designation">Designation</label>
                                <input className="input input-bordered" type="text" name="designation" id="designation" value={exp.designation} onChange={e => updateForm('designation', i, e.target.value)} placeholder="Manager/ Supervisor/ Sales Executive" />
                                { errors && errors[`experience.${i}.designation`] && <span className="text-error">{errors[`experience.${i}.designation`].toString().replace(`experience.${i}.designation`, 'Designation')}</span>}
                            </div>
                        </div>
                        <div className="lg:col-span-2 md:col-span-4 col-span-6">
                            <div className="form-control">
                                <label htmlFor="started_at">Started At</label>
                                <input className="input input-bordered" type="month" name="started_at" id="started_at" value={exp.started_at} onChange={e => updateForm('started_at', i, e.target.value)} />
                                { errors && errors[`experience.${i}.started_at`] && <span className="text-error">{errors[`experience.${i}.started_at`].toString().replace(`experience.${i}.started_at`, 'Started at')}</span>}
                            </div>
                        </div>
                        <div className="lg:col-span-2 md:col-span-4 col-span-6">
                            <div className="form-control">
                                <label htmlFor="ended_at">Ended At</label>
                                <input className="input input-bordered" type="month" name="ended_at" id="ended_at" value={exp.ended_at} onChange={e => updateForm('ended_at', i, e.target.value)} />
                                <small className="text-xs">Leave blank if still working</small>
                                { errors && errors[`experience.${i}.ended_at`] && <span className="text-error">{errors[`experience.${i}.ended_at`].toString().replace(`experience.${i}.ended_at`, 'Ended at')}</span>}
                            </div>
                        </div>
                        <div className="lg:col-span-2 md:col-span-4 col-span-6">
                            <div className="form-control">
                                <label htmlFor="description_about_role">Description about role</label>
                                <textarea className="input input-bordered" name="description_about_role" id="description_about_role" value={exp.description_about_role} onChange={e => updateForm('description_about_role', i, e.target.value)} ></textarea>
                                { errors && errors[`experience.${i}.description_about_role`] && <span className="text-error">{errors[`experience.${i}.description_about_role`].toString().replace(`experience.${i}.description_about_role`, 'Description about role')}</span>}
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="mt-4 flex justify-end items-center gap-2">
                <button type="button" onClick={AddAnotherExperience} className="btn btn-ghost text-primary"><i className="bx bx-plus text-lg valign-center"></i> Add Experience</button>
                <button className="btn btn-primary" disabled={processing}>{processing && <i className='bx bx-loader-alt bx-spin' ></i>} {submitButtonLabel || <><i className="bx bx-save text-lg valign-center"></i> Save</>}</button>
            </div>
        </form>
    );
}
