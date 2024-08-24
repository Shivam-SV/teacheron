import { useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";
import { formHandler } from "../../../Helpers/appHelper";
import { useState } from "react";

export default function Contact(){
    const auth = usePage().props.auth;
    const {data, setData, processing, post, errors} = useForm({
        type: 'phone',
        value: '',
        otp: '',
    });

    const [isOtpSent, setIsOtpSent] = useState(false);

    const sendOTP = async () => {
        let res = await axios.post(route('profile.send-otp-to-contact', btoa(auth.id)), data);
        if(res.data.status) setIsOtpSent(true);
        toast[res.data.status ? 'success' : 'error'](res.data.message);
    }

    return (
        <form action={route('profile.verify-otp-and-save-contact', btoa(auth.id))} onSubmit={formHandler(post)}>
            <div className="inline-flex flex-wrap gap-2 items-end m-2">
                <div className="form-control">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" defaultValue={data.type} onChange={(e) => setData('type', e.target.value)} className="select select-bordered">
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="value">{data.type == 'phone' ? 'Contact' : 'Email'}</label>
                    <input type={data.type == 'phone' ? "tel" : 'email'} className="input input-bordered" value={data.value} onInput={e => setData('value', e.target.value)} placeholder="Your contact" />
                </div>
                {
                    isOtpSent ?
                        <>
                            <div className="form-control">
                                <label htmlFor="otp">OTP</label>
                                <input type='tel' className="input input-bordered" value={data.otp} onInput={e => setData('otp', e.target.value)} placeholder="Check your 6 digits OTP" />
                            </div>
                            <div>
                                <button disabled={processing} className="btn btn-primary">{processing && <i className='bx bx-loader-alt bx-spin' ></i>} Verify & Save</button>
                            </div>
                        </> :
                        <div>
                            <button type="button" onClick={sendOTP} className="btn btn-primary">Send OTP</button>
                        </div>
                }
            </div>
        </form>
    );
}
