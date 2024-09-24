import { router, useForm } from "@inertiajs/react";
import { formHandler } from "../../../_utils/commons";
import { useEffect } from "react";

export default function CreatePayment({userId, onSuccess}){
    const defaultPaymentForm = {
        amount: '',
        currency_code: 'USD',
        payment_method_id: 4, // admin
        type: 'payment',
        user_id: userId
    }
    const defaultCoinsForm = {
        amount: '',
        payment_method_id: 4, //admin
        type: 'coin',
        currency_code: 'USD',
        user_id: userId
    };
    const PaymentForm = useForm(defaultPaymentForm);
    const CoinsForm = useForm(defaultCoinsForm);
    useEffect(() => {
        console.log(userId);
        PaymentForm.setData('user_id', userId);
        CoinsForm.setData('user_id', userId);
    }, [userId]);
    return (
        <div className="py-2">
            <div role="alert" className="alert alert-warning mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-xs"> TeacherOn strongly recommends you for not to making adding payments from admin side, If you are sure then use this method, either ask the user to make the payments from there wallets directly.</span>
            </div>

            <form action={route('supadmin.teacher.fill-wallet')} onSubmit={formHandler(PaymentForm.post, () => {PaymentForm.reset(); onSuccess()})}>
                <div className="flex items-end gap-2 flex-wrap">
                    <div className="form-control ">
                        <label className="form-label" htmlFor="amount">Amount <small>(actual payment not coins)</small></label>
                        <input type="text" className="input input-bordered" value={PaymentForm.data.amount} onInput={e => PaymentForm.setData('amount', e.target.value)} placeholder="Eg. 5" />
                        {PaymentForm?.errors?.amount && <span className="text-error">{PaymentForm?.errors?.amount}</span>}
                    </div>
                    <div className="form-control ">
                        <label htmlFor="form-label">Currency code</label>
                        <select className="select select-bordered" disabled defaultValue={PaymentForm.data.currency_code} onChange={e => PaymentForm.setData('currency_code', e.target.value)}>
                            <option value="USD">USD</option>
                        </select>
                        {PaymentForm?.errors?.currency_code && <span className="text-error">{PaymentForm?.errors?.currency_code}</span>}
                    </div>
                    <div className="">
                        <button className="btn btn-primary" disabled={PaymentForm.processing || CoinsForm.processing}>{PaymentForm.processing && <i className='bx bx-loader-alt bx-spin' ></i>} Fill Coins</button>
                    </div>
                </div>
            </form>
            <div className="divider">OR</div>
            <form action={route('supadmin.teacher.fill-wallet')} onSubmit={formHandler(CoinsForm.post, () => {CoinsForm.reset(); onSuccess()})}>
                <div className="flex items-end gap-2 flex-wrap">
                    <div className="form-control">
                        <label className="form-label" htmlFor="amount">Coins <small>(Not Actual payment)</small></label>
                        <input type="text" className="input input-bordered" placeholder="Eg. 100" value={CoinsForm.data.amount} onInput={e => CoinsForm.setData('amount', e.target.value)} />
                        {CoinsForm?.errors?.currency_code && <span className="text-error">{CoinsForm?.errors?.currency_code}</span>}
                    </div>
                    <div>
                        <button className="btn btn-primary" disabled={PaymentForm.processing || CoinsForm.processing} >{CoinsForm.processing && <i className='bx bx-loader-alt bx-spin' ></i>} Fill Coins</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
