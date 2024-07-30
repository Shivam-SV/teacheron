import { useRef } from "react";
import Layout from "../../Layouts/AppLayout";
import Select from 'react-select'
import { useForm } from "@inertiajs/react";
import { formHandler } from "../../Helpers/appHelper";
export default function Create({phoneNumbers, subjects, levels, auth, purposes}) {
    const phoneModal = useRef(null);
    const phoneForm = useForm('phoneNumber', {phone: ''});
    return (
        <Layout>
            <div className="container mx-auto">
                <div className="card">
                    <div className="card-body">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="sm:col-span-6 col-span-12">
                                <div className="form-control">
                                    <label className="label" htmlFor="title">Title</label>
                                    <input type="text" id="title" className="input input-bordered" placeholder="Add a title" />
                                </div>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <div className="form-control">
                                    <label className="label pt-0" htmlFor="contact">Your working phone number <div className="tooltip tooltip-left" onClick={() => phoneModal.current.showModal()} data-tip="Click to add new phone number"><button className="btn btn-sm label-text-sm">+</button></div></label>
                                    <select name="contact" id="contact" className="select select-bordered">
                                        <option value="" className="italic text-neutral/30" >-- Select Phone --</option>
                                        {phoneNumbers?.length > 0 ? phoneNumbers.map(p => {
                                            return <option key={p} value={p}>{p}</option>
                                        }) : <></>}
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="form-control">
                                    <label className="label" htmlFor="description">Description</label>
                                    <textarea name="description" id="description" className="input input-bordered" placeholder="Give a brief description about your requirement specification"></textarea>
                                </div>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <div className="form-control">
                                    <label className="label" htmlFor="subjects">Subjects</label>
                                    <Select options={subjects.map(s => {
                                        return {value: s.id, label: s.name};
                                    })} isMulti id="subjects" placeholder="Select subjects you need"></Select>
                                </div>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <div className="form-control">
                                    <label className="label" htmlFor="level_id">Experties Level</label>
                                    <select name="level_id" id="level_id" className="select select-bordered">
                                        <option value="" className="italic text-neutral/30" >-- Select Experties Level --</option>
                                        {levels?.length > 0 ? levels.map(l => {
                                            return <option key={l.id} value={l.id}>{l.level_name}</option>
                                        }) : <></>}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <div className="form-control">
                                    <label className="label" htmlFor="needs">Needs for</label>
                                    <select name="needs" id="needs" className="select select-bordered">
                                        <option value="" className="italic text-neutral/30" >-- Select Your Need --</option>
                                        {purposes?.length > 0 ? purposes.map(p => {
                                            return <option key={p} value={p}>{p.split('_').join(' ').ucfirst()}</option>
                                        }) : <></>}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <div className="form-control">
                                <label className="label" htmlFor="gender_preferance"><span>Gender Preferance</span> <small>(if any)</small></label>
                                <select name="gender_preferance" id="gender_preferance" className="select select-bordered">
                                    <option value="any">Any</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                </div>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <label className="label">Budge</label>
                                <div className="join">
                                    <input type="number" className="input input-bordered join-item w-full" id="min_budget" placeholder="Min Budget" />
                                    <input type="number" className="input input-bordered join-item w-full" id="max_budget" placeholder="Max Budget" />
                                </div>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <div className="form-control">
                                    <label className="label" htmlFor="language_preferrance">Language Preference <small>(if Any)</small></label>
                                    <Select options={{}} id="language_preferrance" placeholder="Select languages you understande"></Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <dialog ref={phoneModal} className="modal">
                <div className="modal-box">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold text-2xl">Add a new phone number</h3>
                        <button className="btn btn-sm btn-circle btn-ghost" onClick={() => phoneModal.current.close()}>✕</button>
                    </div>
                    <form action={route('profile.add-phone-number', btoa(auth.id))} onSubmit={formHandler(phoneForm.post, () => phoneModal.current.close())}>
                        <div className="form-control">
                            <label htmlFor="phone" className="label">Phone Number</label>
                            <div className="join">
                                <input type="tel" value={phoneForm.data.phone} onInput={(e) => phoneForm.setData('phone', e.target.value)} className="input input-bordered join-item grow" placeholder="Your working Phone" />
                                <button className="btn btn-primary join-item" disabled={phoneForm.processing}>{phoneForm.processing && <i className="bx bx-loading-alt bx-spin"></i>} Save</button>
                            </div>
                            {phoneForm.errors?.phone && <span className="text-error">{phoneForm.errors?.phone}</span>}
                        </div>
                    </form>
                </div>
            </dialog>
        </Layout>
    );
}
