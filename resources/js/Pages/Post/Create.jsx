import { useRef } from "react";
import Layout from "../../Layouts/AppLayout";
import Select from 'react-select'
import { useForm } from "@inertiajs/react";
import { formHandler } from "../../Helpers/appHelper";
export default function Create({ phoneNumbers, subjects, levels, auth, purposes, languages }) {
    const phoneModal = useRef(null);
    const phoneForm = useForm('phoneNumber', { phone: '' });

    const createPostForm = useForm('post', {
        title: '',
        description: '',
        contact: '',
        subjects: [],
        level_id: '',
        purpose: '',
        gender_preferance: '',
        min_budget: '',
        max_budget: '',
        language_preferrance: []
    });
    return (
        <Layout>
            <div className="container mx-auto">
                <div className="card">
                    <div className="card-body">
                        <form action={route('post.store')} method="post" onSubmit={formHandler(createPostForm.post)}>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="title">Title</label>
                                        <input value={createPostForm.data.title} onChange={(e) => createPostForm.setData('title', e.target.value)} type="text" id="title" className="input input-bordered" placeholder="Add a title" />
                                        {createPostForm.errors?.title && <span className="text-error">{createPostForm.errors?.title}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label pt-0" htmlFor="contact">Your working phone number <div className="tooltip tooltip-left" onClick={() => phoneModal.current.showModal()} data-tip="Click to add new phone number"><button type="button" className="btn btn-sm label-text-sm">+</button></div></label>
                                        <select value={createPostForm.data.contact} onChange={(e) => createPostForm.setData('contact', e.target.value)} name="contact" id="contact" className="select select-bordered">
                                            <option value="" className="italic text-neutral/30" >-- Select Phone --</option>
                                            {phoneNumbers?.length > 0 ? phoneNumbers.map(p => {
                                                return <option key={p} value={p}>{p}</option>
                                            }) : <></>}
                                        </select>
                                        {createPostForm.errors?.contact && <span className="text-error">{createPostForm.errors?.contact}</span>}
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="description">Description</label>
                                        <textarea value={createPostForm.data.description} onChange={(e) => createPostForm.setData('description', e.target.value)} name="description" id="description" className="input input-bordered" placeholder="Give a brief description about your requirement specification"></textarea>
                                        {createPostForm.errors?.description && <span className="text-error">{createPostForm.errors?.description}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="subjects">Subjects</label>
                                        <Select options={subjects.map(s => {
                                            return { value: s.id, label: s.name };
                                        })} isMulti id="subjects" defaultValue={createPostForm.data.subjects} placeholder="Select subjects you need" onChange={(e) => createPostForm.setData('subjects', e.map(s => s.value))}></Select>
                                        {createPostForm.errors?.subjects && <span className="text-error">{createPostForm.errors?.subjects}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="level_id">Experties Level</label>
                                        <select value={createPostForm.data.level_id} onChange={(e) => createPostForm.setData('level_id', e.target.value)} name="level_id" id="level_id" className="select select-bordered">
                                            <option value="" className="italic text-neutral/30" >-- Select Experties Level --</option>
                                            {levels?.length > 0 ? levels.map(l => {
                                                return <option key={l.id} value={l.id}>{l.level_name}</option>
                                            }) : <></>}
                                        </select>
                                        {createPostForm.errors?.level_id && <span className="text-error">{createPostForm.errors?.level_id}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="purpose_id">Needs for</label>
                                        <select value={createPostForm.data.purpose} onChange={(e) => createPostForm.setData('purpose', e.target.value)} name="purpose" id="purpose" className="select select-bordered">
                                            <option value="" className="italic text-neutral/30" >-- Select Your Need --</option>
                                            {purposes?.length > 0 ? purposes.map(p => {
                                                return <option key={p} value={p}>{p.split('_').join(' ').ucfirst()}</option>
                                            }) : <></>}
                                        </select>
                                        {createPostForm.errors?.purpose && <span className="text-error">{createPostForm.errors?.purpose}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="gender_preferance"><span>Gender Preferance</span> <small>(if any)</small></label>
                                        <select value={createPostForm.data.gender_preferance} onChange={(e) => createPostForm.setData('gender_preferance', e.target.value)} name="gender_preferance" id="gender_preferance" className="select select-bordered">
                                            <option value="any">Any</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        {createPostForm.errors?.gender_preferance && <span className="text-error">{createPostForm.errors?.gender_preferance}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <label className="label">Budge</label>
                                    <div className="join flex">
                                        <input value={createPostForm.data.min_budget} onChange={(e) => createPostForm.setData('min_budget', e.target.value)} type="number" className="input input-bordered join-item w-full" id="min_budget" placeholder="Min Budget" />
                                        <input value={createPostForm.data.max_budget} onChange={(e) => createPostForm.setData('max_budget', e.target.value)} type="number" className="input input-bordered join-item w-full" id="max_budget" placeholder="Max Budget" />
                                    </div>
                                    {createPostForm.errors?.min_budget && <span className="text-error">{createPostForm.errors?.min_budget}</span>}
                                    {createPostForm.errors?.max_budget && <span className="text-error">{createPostForm.errors?.max_budget}</span>}
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="language_preferrance">Language Preference <small>(if Any)</small></label>
                                        <Select isMulti defaultValue={createPostForm.data.language_preferrance} onChange={(e) => createPostForm.setData('language_preferrance', e.map(l => l.value))} options={languages.map(l => { return { value: l.id, label: l.name } })} id="language_preferrance" placeholder="Select languages you understande"></Select>
                                        {createPostForm.errors?.language_preferrance && <span className="text-error">{createPostForm.errors?.language_preferrance}</span>}
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <button className="btn btn-primary" disabled={createPostForm.processing}>{createPostForm.processing && <i className="bx bx-loading-alt bx-spin"></i>} Create Post</button>
                                </div>
                            </div>
                        </form>
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
