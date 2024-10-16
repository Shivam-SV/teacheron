import { useState } from "react";
import { savePost, unsavePost } from "../../_utils/apis";
import { avatarImage } from "../../_utils/commons";

export default function Post({ post, readonly }) {
    const [isSaved, setIsSaved] = useState(post?.saves?.length > 0);
    const handleSavePost = (event) => {
        event.preventDefault();
        if(isSaved) unsavePost(btoa(post.id)).then(res => res.status && setIsSaved(!isSaved)).catch(res => toast.error(res.message));
        else savePost(btoa(post.id)).then(res => res.status && setIsSaved(!isSaved)).catch(res => toast.error(res.message));
    }
    return (
        <div className="max-w-[1000px] mx-auto border-neutral/30 shadow p-2 my-4">
            <div className="mb-6">
                <div className="flex items-center p-2 gap-1">
                    <img src={avatarImage(post.title, 'random')} alt="" className='rounded mr-4' />
                    <div className="grow">
                        <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold">{post.title}</h1>
                        <div className="flex gap-2">
                            <p className="text-sm text-neutral/40">{post.posted_since}</p>
                        </div>
                    </div>
                    <p className=""><i className='bx bx-show-alt align-middle'></i> {post.impressions_count}</p>
                    {readonly ? '' :
                        <><button className='btn btn-ghost text-lg btn-sm tooltip' data-tip="Save for later"><i className='bx bx-bookmark align-middle' ></i></button>
                    <button className="btn btn-sm btn-primary"><i className='bx bxs-dollar-circle text-yellow-400 text-lg'></i> {Math.abs(post.price)}</button></>}
                </div>
                <div className="flex flex-wrap gap-1 my-2">
                    <div className="bg-base-200 rounded-full text-xs font-medium flex items-center py-1 px-2">
                        <i className='bx bxs-map-pin mr-2 align-middle' ></i><span>{post.address}</span>
                    </div>
                    {post.subjects.length > 0 && post.subjects.map(s => {
                        return <div key={s.id} className="bg-base-200 rounded-full text-xs font-medium flex items-center py-1 px-2">
                            <span>{s.name}</span>
                        </div>
                    })}
                    {post.level !== undefined && <>
                        <div className="bg-base-200 rounded-full text-xs font-medium flex items-center py-1 px-2">
                            <span>{post.level.name}</span>
                        </div>
                    </>}
                    <div className="bg-base-200 rounded-full text-xs font-medium flex items-center py-1 px-2">
                        <span className="mr-2">Prefered:</span><span>{post?.language_preference?.map(l => l.name)}</span>
                    </div>
                    <div className="bg-base-200 rounded-full text-xs font-medium flex items-center py-1 px-2">
                        <span className="mr-2">Gender:</span><span>{post.gender_preference.ucfirst()}</span>
                    </div>
                </div>
            </div>
            <div className="mb-6 py-2 px-4">
                <p className="text-lg text-neutral">{post.description}</p>
            </div>
            <div className="p-2 flex flex-wrap items-center">
                <em className="flex-1">Posted by: {post.user.name}</em>
                <p>{post.budget} <span className='text-primary'>{post.budget_currency_code}</span></p>
            </div>
        </div>
    );
}