import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { formHandler } from "../../_utils/commons";

export default function LoginCard({message, title}) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const [togglePassword, setTogglePassword] = useState(false);

    return (
        <div className="flex items-center justify-center">
            <div
                className="card shadow w-[22rem]"
                style={{ "--padding-card": "1.5rem" }}
            >
                <div className="card-body p-8 pb-3">
                    <h2 className="text-4xl font-extrabold">{ title || "Welcome back!" }</h2>
                    {message && <p className="text-neutral/60">{message}</p>}
                </div>
                <div className="card-body">
                    <form onSubmit={formHandler(post)} action="/login">
                        <div className="mb-4">
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
                        </div>
                        <div className="flex justify-between items-center">
                            <button className="btn btn-primary w-full" disabled={processing}>
                            {processing && <i className='bx bx-loader-alt bx-spin' ></i>} <i className="bx bx-lock"></i> Sign up
                            </button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="flex justify-center items-center">
                        <div
                            className="tooltip"
                            data-tip="Sign-in with google"
                        >
                            <a
                                type="button"
                                className="btn glass btn-circle"
                                href="/google/redirect"
                            >
                                <i className="bx bxl-google text-2xl"></i>
                            </a>
                        </div>
                    </div>
                    <p className="text-center"> <Link href="/sign-in" className="link underline-offset-2">Sign up</Link> with new account</p>
                </div>
            </div>
        </div>
    );
}
