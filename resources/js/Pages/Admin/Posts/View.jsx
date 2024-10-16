import Layout from "../../../Layouts/AdminLayout";
import PostDetail from "../../../Components/Posts/PostDetail";
import Confirm from "../../../Components/Partials/Confirm";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { updatePageProps, updatePostPrice, updatePostStatus } from "../../../_utils/apis";
import { usePage } from "@inertiajs/react";
import { DateTime } from "luxon";

export default function ViewPost({ post, postStatuses, postActivities }) {
    const auth = usePage().props.auth;
    const StatusConfirmRef = useRef(null);
    const postStatusSelectRef = useRef(null);
    const [postStatus, setPostStatus] = useState(post.status);
    const [postPrice, setPostPrice] = useState(post.price);
    const [isPriceUpdating, setIsPriceUpdating] = useState(false);

    const changePostStatus = (event) => {
        updatePostStatus(btoa(post.id), postStatusSelectRef.current.value).then(res => {
            toast[res.data.status ? 'success' : 'error'](res.data.message);
            if(res.data.status) StatusConfirmRef.current.close();
            updatePageProps('post', 'postActivities');
        }).catch(res => {toast.error(res.data.message)});
    }

    const updatePrice = (event) => {
        setIsPriceUpdating(true);
        event.preventDefault();
        updatePostPrice(btoa(post.id), postPrice).then(res => {
            toast[res.data.status ?'success' : 'error'](res.data.message);
            setIsPriceUpdating(false);
            updatePageProps('post', 'postActivities');
        }).catch(res => {toast.error(res.data.message); setIsPriceUpdating(false);});
    }
    return (
        <Layout title="Post Detail">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-9">
                    <div className="bg-base-100 rounded-lg">
                        <PostDetail post={post} readonly={true} />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="bg-base-100 rounded-lg p-4 my-4">
                        <div className="form-control mb-4">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select name="status" id="status" className="select select-bordered" ref={postStatusSelectRef} onChange={(e) => {StatusConfirmRef.current.showModal()}} defaultValue={postStatus}>
                                {postStatuses.map(status => {
                                    return <option key={status} value={status}>{status.replace("-", " ").ucfirst()}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="status" className="form-label">Price (in Coins)</label>
                            <form className="join" onSubmit={updatePrice}>
                                <input type="text" className="input join-item input-bordered" defaultValue={postPrice} onChange={(e) => setPostPrice(e.target.value)} inputMode="numeric" name="price" id="price" placeholder="Price in Coins" />
                                <button className="btn btn-primary join-item tooltip" data-tip="Update Price" disabled={isPriceUpdating} >{isPriceUpdating ? <i className="bx bx-loader bx-spin"></i> : <i className='bx bx-check text-lg'></i>} </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100">
                <div className="card-body">
                    <h3 className="card-title">Activity</h3>
                    {
                        postActivities.length > 0 ?
                        <div className="flex flex-wrap gap-4 items-center justify-start">
                            {postActivities.map(activity => {
                                return (
                                    <div key={activity.id} className="bg-base-100 my-1 p-2 inline-flex lg:w-[18rem] md:w-[25rem] w-full flex-wrap items-center shadow-sm border rounded-lg">
                                        <div className="px-2 border-r">
                                            <h5 className="text-base font-semibold">{auth.id === activity.user_id ? "You" : activity.user.name}</h5>
                                            <em className="text-xs text-neutral/50">{DateTime.fromISO(activity.created_at).toLocaleString(DateTime.DATE_MED)}</em>
                                        </div>
                                        <div className="px-2 flex-1">
                                            <h5 className="text-base font-semibold">{activity.column_name.replace("_", " ").ucfirst()}</h5>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-neutral/50">{activity.previous_value.replace("-", " ").ucfirst()}</p>
                                                <i className='bx bx-right-arrow-alt text-lg font-bold text-neutral/70'></i>
                                                <p className="text-sm text-neutral/50 text-right">{activity.updated_value.replace("-", " ").ucfirst()}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div> :
                        <p className="text-center italic text-neutral/50">No activity yet.</p>
                    }
                </div>
            </div>

            <Confirm
                popupRef={StatusConfirmRef}
                title="Confirm Status Change"
                message={"Are you sure you want to change the status of this post?"}
                type="warning"
                iconClass="bx-question-mark"
                confirmButtonText="Yes, change status"
                cancelButtontext="No, cancel"
                onConfirm={changePostStatus}
                onCancel={() => {postStatusSelectRef.current.value = postStatus}}
            />
        </Layout>
    );
}

