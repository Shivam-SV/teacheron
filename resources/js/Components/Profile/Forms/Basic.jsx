import { router, useForm } from "@inertiajs/react";
import { formHandler } from "../../../Helpers/appHelper";
import { useState } from "react";
import Contact from "./Contact";

export default function Basic({user, countries}){
    const {post, data, setData, errors, processing} = useForm({
        name: user.name,
        email: user.email,
        gender: user.gender,
        date_of_birth: user.date_of_birth?.split('T')[0] || '',
        address: user.address || '',
        bio: user.bio || '',
        country_id: user.country_id || ''
    });
    const [contactCount, setContactCount] = useState(1);

    return (
        <>
            <form action={route('profile.update-basic', btoa(user.id))} onSubmit={formHandler(post)}>
                <div className="grid grid-cols-12 gap-4 items-end">
                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                        <label htmlFor="name" className="block">Name</label>
                        <input type="text" id="name" className="input input-bordered w-full" value={data.name} onInput={(e) => setData('name', e.target.value)} />
                        { errors.name && <span className="text-error">{errors.name}</span> }
                    </div>
                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                        <label htmlFor="email" className="block">Email</label>
                        <input type="email" name="email" id="email" readOnly className="input input-bordered w-full" placeholder="primary-email@domain.com" value={data.email} onInput={(e) => setData('email', e.target.value)} />
                        { errors.email && <span className="text-error">{errors.email}</span> }
                    </div>
                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                        <label htmlFor="gender" className="block">Gender</label>
                        <select id="gender" className="select select-bordered w-full" defaultValue={data.gender} onChange={(e) => setData('gender', e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="not specified">Not Specified</option>
                        </select>
                        { errors.gender && <span className="text-error">{errors.gender}</span> }
                    </div>
                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                        <label htmlFor="dob" className="block">Date of Birth</label>
                        <input type="date" id="dob" className="input input-bordered w-full" value={data.date_of_birth} onInput={(e) => setData('date_of_birth', e.target.value)} />
                        { errors.date_of_birth && <span className="text-error">{errors.date_of_birth}</span> }
                    </div>
                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                        <label htmlFor="address" className="block">Address</label>
                        <input type="text" id="address" className="input input-bordered w-full" placeholder="123, streets, in this world" value={data.address} onInput={(e) => setData('address', e.target.value)}/>
                        { errors.address && <span className="text-error">{errors.address}</span> }
                    </div>
                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                        <label htmlFor="country_id" className="block">Country</label>
                        <select name="country_id" className="select select-bordered w-full" id="country_id" defaultValue={data.country_id} onChange={e => setData('country_id', e.target.value)}>
                            {countries.length > 0 && countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                        <label htmlFor="bio" className="block">Summary</label>
                        <textarea name="bio" id="bio" cols="30" rows="10" className="input input-bordered w-full" placeholder="Something about yourself" defaultValue={data.bio} onInput={e => setData('bio', e.target.value)}></textarea>
                        { errors.bio && <span className="text-error">{errors.bio}</span> }
                    </div>
                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 sm:text-left text-center">
                        <button type="submit" disabled={processing} className="btn btn-primary text-lg mb-2">{processing && <i className='bx bx-loader-alt bx-spin' ></i>} Save</button>
                    </div>
                </div>
            </form>
            <hr className="my-8" />
            <div className="flex items-center">
                <h4 className="text-lg font-semibold mb-4 grow">Contacts</h4>
                <button className="btn btn-sm btn-ghost" onClick={(e) => setContactCount(contactCount+1)}><i className="bx bx-plus text-lg"></i></button>
            </div>
            <div className="p-2">
                <p className="text-sm text-neutral/75 mb-4">Existing</p>
                {user?.user_contacts?.length > 0 && user?.user_contacts.map(contact => {
                    return (<div key={contact.id} className="inline-flex items-center">
                        <span className="mr-4 p-1">{contact.phone ? 'Phone' : 'Email'}</span>
                        <span className="p-1">{contact.phone ?? contact.email}</span>
                        <button className="btn btn-sm btn-ghost"><i className="bx bx-trash text-error"></i></button>
                    </div>);
                })}
                <hr className="my-6" />
                <p className="text-sm text-neutral/75 mb-4">Add new</p>
                {contactCount > 0 && [...Array(contactCount).keys()].map(i => {
                    return (<Contact key={i} />);
                })};
            </div>
        </>
    );
}
