import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function LoginCard() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const [togglePassword, setTogglePassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };
    return (
        <div className="flex items-center justify-center">
            <div
                className="card border w-[22rem]"
                style={{ "--padding-card": "1.5rem" }}
            >
                <div className="card-body p-8 pb-3">
                    <h2 className="text-4xl font-extrabold">Welcome back!</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
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
                            <button className="btn btn-primary">
                                <i className="bx bx-lock"></i> Sign up
                            </button>
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
                    </form>
                </div>
            </div>
        </div>
    );
}
