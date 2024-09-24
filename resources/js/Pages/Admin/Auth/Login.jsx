import { useForm } from "@inertiajs/react";
import Layout from "../../../Layouts/AdminAuthLayout";
import { formHandler } from "../../../_utils/commons";

export default function login(){
    const {data, setData, post, processing, errors} = useForm({
        email: '',
        password: '',
        role: 'admin'
    })
    return (
        <Layout>
            <div className="card sm:w-[25rem] w-full sm:mx-auto mx-4 text-base-100 shadow-sm bg-white/25 backdrop-blur-xl">
                <div className="card-body pb-4"><h2 className="text-3xl font-extrabold text-center">Howdy Admin</h2></div>
                <div className="card-body pt-4">
                    <form onSubmit={formHandler(post)}>
                        <div className="mb-4">
                            <div className="form-control">
                                <label htmlFor="email">Email</label>
                                <input type="email" value={data.email} onInput={(e) => setData('email', e.target.value)} className="input input-bordered text-black" id="email" placeholder="your-name@domain.com" />
                                {errors.email && <span className="text-error">{errors.email}</span>}
                            </div>
                            <div className="form-control">
                                <label htmlFor="password">Password</label>
                                <input type="password" value={data.password} onInput={(e) => setData('password', e.target.value)} className="input input-bordered text-black" id="password" placeholder="Some secrets" />
                                {errors.password && <span className="text-error">{errors.password}</span>}
                            </div>
                        </div>
                        <button className="btn btn-primary text-lg w-full" disabled={processing}>{processing && <i className='bx bx-loader-alt bx-spin' ></i>} Login</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
