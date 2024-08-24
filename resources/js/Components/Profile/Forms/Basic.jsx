import { router, useForm } from "@inertiajs/react";
import { formHandler } from "../../../Helpers/appHelper";
import { useState } from "react";
import Contact from "./Contact";

export default function Basic({user}){
    console.log(user);
    const {post, data, setData, errors, processing} = useForm({
        name: user.name,
        email: user.email,
        gender: user.gender,
        date_of_birth: user.date_of_birth?.split('T')[0] || '',
        address: user.address || '',
        bio: user.bio || ''
    })

    const [contactCount, setContactCount] = useState(1);

    return (
        <>
            <form action={route('profile.update-basic', btoa(user.id))} onSubmit={formHandler(post)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor="name" className="block">Name</label>
                        <input type="text" id="name" className="input input-bordered w-full" value={data.name} onInput={(e) => setData('name', e.target.value)} />
                        { errors.name && <span className="text-error">{errors.name}</span> }
                    </div>
                    <div>
                        <label htmlFor="email" className="block">Email</label>
                        <input type="email" name="email" id="email" readOnly className="input input-bordered w-full" placeholder="primary-email@domain.com" value={data.email} onInput={(e) => setData('email', e.target.value)} />
                        { errors.email && <span className="text-error">{errors.email}</span> }
                    </div>
                    <div>
                        <label htmlFor="gender" className="block">Gender</label>
                        <select id="gender" className="select select-bordered w-full" defaultValue={data.gender} onChange={(e) => setData('gender', e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="not specified">Not Specified</option>
                        </select>
                        { errors.gender && <span className="text-error">{errors.gender}</span> }
                    </div>
                    <div>
                        <label htmlFor="dob" className="block">Date of Birth</label>
                        <input type="date" id="dob" className="input input-bordered w-full" value={data.date_of_birth} onInput={(e) => setData('date_of_birth', e.target.value)} />
                        { errors.date_of_birth && <span className="text-error">{errors.date_of_birth}</span> }
                    </div>
                    <div>
                        <label htmlFor="address" className="block">Address</label>
                        <input type="text" id="address" className="input input-bordered w-full" placeholder="123, streets, in this world" value={data.address} onInput={(e) => setData('address', e.target.value)}/>
                        { errors.address && <span className="text-error">{errors.address}</span> }
                    </div>
                    <div>
                        <label htmlFor="bio" className="block">Summary</label>
                        <textarea name="bio" id="bio" cols="30" rows="10" className="input input-bordered w-full" placeholder="Something about yourself" defaultValue={data.bio} onInput={e => setData('bio', e.target.value)}></textarea>
                        { errors.bio && <span className="text-error">{errors.bio}</span> }
                    </div>
                    <div >
                        <button type="submit" disabled={processing} className="btn btn-primary text-lg mb-2">{processing && <i className='bx bx-loader-alt bx-spin' ></i>} Save</button>
                    </div>
                </div>
            </form>
            <hr className="my-8" />
            <div className="flex items-center">
                <h4 className="text-lg font-semibold mb-4 grow">Contacts</h4>
                <button className="btn btn-sm btn-ghost" onClick={(e) => setContactCount(contactCount+1)}><i className="bx bx-plus text-lg"></i></button>
            </div>
            <div>
                {contactCount > 0 && [...Array(contactCount).keys()].map(i => {
                    return (<Contact key={i} />);
                })};
            </div>
        </>
    );
}
