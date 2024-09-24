import { useRef } from "react";
import Layout from "../../Layouts/AppLayout";
import Select from 'react-select'
import { useForm } from "@inertiajs/react";
import { formHandler } from "../../_utils/commons";
export default function Create({auth, userPhoneNumbers, countries, purposes, levels, subjects, languages}) {
    const phoneModal = useRef(null);
    const phoneForm = useForm('phoneNumber', { phone: '' });

    const createPostForm = useForm('post', {
        title: '',
        user_phone_id: '',
        address: '',
        country_id: '',
        description: '',
        purpose_id:'',
        level_id:'',
        subjects_id: [],
        budget_currency_code:'',
        gender_preferance: '',
        min_budget: '',
        max_budget: '',
        language_preferrances_id: [],
        created_by_user_id: auth.id
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
                                        <label className="label pt-0" htmlFor="user_phone_id">Your working phone number <div className="tooltip tooltip-left" onClick={() => phoneModal.current.showModal()} data-tip="Click to add new phone number"><button type="button" className="btn btn-sm label-text-sm">+</button></div></label>
                                        <select value={createPostForm.data.user_phone_id} onChange={(e) => createPostForm.setData('user_phone_id', e.target.value)} name="user_phone_id" id="user_phone_id" className="select select-bordered">
                                            <option value="" className="italic text-neutral/30" >-- Select Phone --</option>
                                            {userPhoneNumbers?.length > 0 ? userPhoneNumbers.map(p => {
                                                return <option key={p.id} value={p.id}>{p.phone}</option>
                                            }) : <></>}
                                        </select>
                                        {createPostForm.errors?.user_phone_id && <span className="text-error">{createPostForm.errors?.user_phone_id}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label pt-0" htmlFor="address">Address</label>
                                        <input type="text" value={createPostForm.data.address} onInput={(e) => createPostForm.setData('address', e.target.value)} name="address" id="address" className="input input-bordered" placeholder="123, rock town streets" />
                                        {createPostForm.errors?.address && <span className="text-error">{createPostForm.errors?.address}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label pt-0" htmlFor="country_id">Country</label>
                                        <select value={createPostForm.data.country_id} onInput={(e) => createPostForm.setData('country_id', e.target.value)} name="country_id" id="country_id" className="select select-bordered">
                                            <option value="" className="italic text-neutral/30" >-- Select country --</option>
                                            {countries?.length > 0 ? countries.map(c => {
                                                return <option key={c.id} value={c.id}>{c.name}</option>
                                            }) : <></>}
                                        </select>
                                        {createPostForm.errors?.country_id && <span className="text-error">{createPostForm.errors?.country_id}</span>}
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
                                        <Select options={Object.entries(subjects)?.map(([id ,subject]) => {
                                            return { value: id, label: subject };
                                        })} isMulti id="subjects_id" defaultValue={createPostForm.data.subjects_id} placeholder="Select subjects you need" onChange={(e) => createPostForm.setData('subjects_id', e.map(s => s.value))}></Select>
                                        {createPostForm.errors?.subjects_id && <span className="text-error">{createPostForm.errors?.subjects_id}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="level_id">Experties Level</label>
                                        <select value={createPostForm.data.level_id} onChange={(e) => createPostForm.setData('level_id', e.target.value)} name="level_id" id="level_id" className="select select-bordered">
                                            <option value="" className="italic text-neutral/30" >-- Select Experties Level --</option>
                                            { Object.entries(levels)?.map(([id, level]) => {
                                                return <option key={id} value={id}>{level}</option>
                                            })}
                                        </select>
                                        {createPostForm.errors?.level_id && <span className="text-error">{createPostForm.errors?.level_id}</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="purpose_id">Needs for</label>
                                        <select value={createPostForm.data.purpose_id} onChange={(e) => createPostForm.setData('purpose_id', e.target.value)} name="purpose_id" id="purpose_id" className="select select-bordered">
                                            <option value="" className="italic text-neutral/30" >-- Select Your Need --</option>
                                            {Object?.entries(purposes)?.map(([id, purpose]) => {
                                                return <option key={id} value={id}>{purpose}</option>
                                            })}
                                        </select>
                                        {createPostForm.errors?.purpose_id && <span className="text-error">{createPostForm.errors?.purpose_id}</span>}
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
                                        <div>
                                            <input value={createPostForm.data.min_budget} onChange={(e) => createPostForm.setData('min_budget', e.target.value)} type="number" className="input input-bordered join-item w-full" id="min_budget" placeholder="Min Budget" />
                                            {createPostForm.errors?.min_budget && <span className="text-error">{createPostForm.errors?.min_budget}</span>}
                                        </div>
                                        <div>
                                            <input value={createPostForm.data.max_budget} onChange={(e) => createPostForm.setData('max_budget', e.target.value)} type="number" className="input input-bordered join-item w-full" id="max_budget" placeholder="Max Budget" />
                                            {createPostForm.errors?.max_budget && <span className="text-error">{createPostForm.errors?.max_budget}</span>}
                                        </div>
                                        <div>
                                            <select className="select select-bordered join-item" name="budget_currency_code" id="budget_currency_code" defaultValue={createPostForm.data.budget_currency_code} onChange={(e) => createPostForm.setData('budget_currency_code', e.target.value)}>
                                                <option>-- Select your prefer currency --</option>
                                                {countries?.length > 0 ? countries.map(c => {
                                                    return <option key={c.id} value={c.code}>{c.code} ({c.symbol})</option>
                                                }) : <></>}
                                            </select>
                                            {createPostForm.errors?.budget_currency_code && <span className="text-error">{createPostForm.errors?.budget_currency_code}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-6 col-span-12">
                                    <div className="form-control">
                                        <label className="label" htmlFor="language_preferrance">Language Preference <small>(if Any)</small></label>
                                        <Select isMulti defaultValue={createPostForm.data.language_preferrance} onChange={(e) => createPostForm.setData('language_preferrance', e.map(l => l.value))} options={Object.entries(languages)?.map(([id, language]) => { return { value: id, label: language } })} id="language_preferrance" placeholder="Select languages you understande"></Select>
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
