import { useForm } from "@inertiajs/react";
import Coin from "../../Elements/Coin";
import { formHandler } from "../../../_utils/commons";

export default function ChangePrice({userId, currentPrice, onComplete, onCancel}){
    const priceForm = useForm({
        price: 0,
        userId
    });
    return (
        <>
            <form action={ route('supadmin.teacher.change-price', btoa(userId)) } method="post" onSubmit={ formHandler(priceForm.post, () => {priceForm.reset(); onComplete()}) }>
                <div className="grid grid-cols-12 gap-4 items-center mb-8">
                    {
                        currentPrice ? <>
                            <div className="col-span-5 self-end">
                                <p>Update Price</p>
                                <h4 className="text-xl">from <Coin price={currentPrice} /></h4>
                            </div>
                            <div className="col-span-1 self-end">
                                <i className="bx bx-right-arrow-alt bx-md"></i>
                            </div>
                            <div className="col-span-6">
                                <label htmlFor="price">Price</label>
                                <input type="number" className="input input-bordered w-full" value={priceForm.data.price} onInput={e => priceForm.setData('price', e.target.value)} />
                                {priceForm?.errors?.price && <span className="text-xs text-red-500">{priceForm.errors.price}</span>}
                            </div>
                        
                        </> : <>
                            <div className="col-span-12">
                                <label htmlFor="price">price</label>
                                <input type="number" className="input input-bordered w-full"/>
                            </div>
                        </>
                    }
                </div>
                <div className="flex items-center gap-4">
                    <button className="btn btn-sm btn-primary flex-1">Save</button>
                    <button className="btn btn-sm btn-ghost flex-1 " onClick={() => {priceForm.reset(); onCancel()}}>Cancel</button>
                </div>
            </form>
        </>
    );
}