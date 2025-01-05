import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { formHandler } from "../../_utils/commons";

export default function RegisterCard({roles}) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: 1,
    });
    const [togglePassword, setTogglePassword] = useState(false);

    return (
        <div className="flex items-center justify-center">
            <div
                className="card border min-w-[22rem]"
                style={{ "--padding-card": "1.5rem" }}
            >
                <div className="card-body p-8 pb-3">
                    <h2 className="text-4xl font-extrabold">Howdy! user</h2>
                    <p className="text-neutral">
                        Register yourself as a teacherOn member
                    </p>
                </div>
                <div className="card-body">
                    <form onSubmit={formHandler(post)} action="/register">
                        <div className="mb-6">
                            <div className="form-control mb-2">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    id="name"
                                    name="name"
                                    className="input input-bordered w-full max-w-xs"
                                    value={data.name}
                                    onInput={(e) => setData('name', e.target.value)}
                                />
                                {errors.name &&  <p className="text-error">{errors.name}</p>}
                            </div>
                            <div className="form-control mb-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="your name@domain.com"
                                    id="email"
                                    name="email"
                                    className="input input-bordered w-full max-w-xs"
                                    value={data.email}
                                    onInput={(e) => setData('email', e.target.value)}
                                />
                                {errors.email &&  <p className="text-error">{errors.email}</p>}
                            </div>
                            <div className="form-control mb-2">
                                <label htmlFor="password">Password</label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input
                                        type={togglePassword ? 'text' : "password"}
                                        placeholder="Your secrets"
                                        id="password"
                                        name="password"
                                        className="grow"
                                        value={data.password}
                                        onInput={(e) => setData('password', e.target.value)}
                                    />
                                    {togglePassword ? <i role="button" onClick={() => setTogglePassword(!togglePassword)} className="bx bx-hide text-xl"></i> : <i role="button" onClick={() => setTogglePassword(!togglePassword)} className="bx bx-show text-xl"></i>}
                                </label>
                                {errors.password &&  <p className="text-error">{errors.password}</p>}
                            </div>
                            <div className="form-control mb-2">
                                <label htmlFor="role">Register me as a</label>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    id="role"
                                    name="role"
                                    defaultValue={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                >
                                    {roles ? (
                                        roles.map((role) => {
                                            return (
                                                <option
                                                    key={role?.id}
                                                    value={role.id}
                                                >
                                                    {role.name.ucfirst()}
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option disabled hidden>
                                            Select a Role
                                        </option>
                                    )}
                                </select>
                                {errors.role &&  <p className="text-error">{errors.role}</p>}
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <button className="btn btn-primary w-full" disabled={processing}>
                            {processing && <i className='bx bx-loader-alt bx-spin' ></i>} <i className="bx bx-lock"></i> Sign in
                            </button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="tooltip" data-tip="Sign-up with google" >
                            <a type="button" className="btn glass btn-circle" href="/google/redirect">
                                <i className="bx bxl-google text-2xl"></i>
                            </a>
                        </div>
                        <p className="text-center"> <Link href="/login" className="link underline-offset-2">Sign up</Link> with existing account</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
