import { Link, usePage } from '@inertiajs/react';
import {placeholderImage} from '../../_utils/commons';
import { buyPost, savePost, unsavePost } from '../../_utils/apis';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import Confirm from '../Partials/Confirm';
import Coin from '../Elements/Coin';

export default function Post({content, onNoAuth, readonly}){
    const {auth} = usePage().props;
    const [isSaved, setIsSaved] = useState(content?.saves?.length > 0);
    const buyPostRef = useRef(null);
    readonly = readonly ?? (auth.id === content.created_by_user_id);

    const handleSavePost = (event) => {
        event.preventDefault();
        if(auth){
            if(isSaved) unsavePost(btoa(content.id)).then(res => res.status && setIsSaved(!isSaved)).catch(res => toast.error(res.message));
            else savePost(btoa(content.id)).then(res => res.status && setIsSaved(!isSaved)).catch(res => toast.error(res.message));
        }else onNoAuth();
    }

    const launchBuyModal = (e) => {
        e.preventDefault();
        if(auth){
            buyPostRef.current.showModal();
        }else onNoAuth();
    }

    const handlePostBuy = (event) => {
        event.preventDefault();
        if(auth){
            buyPostRef.current.close();
            buyPost(btoa(content.id));
        }else onNoAuth();
    }
    return (
        <>
            <Link className="w-[25rem] rounded-xl border-neutral/70 shadow p-4" href={route('post.view', btoa(content.id))} >
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center mb-2">
                        <img src={placeholderImage('50x50', content.title.substring(0, 1))} alt="" className='rounded' />
                        <div className="flex-1">
                            <h2 className="text-base font-semibold">{content.title}</h2>
                            <p className="text-xs text-neutral/40">{content.posted_since}</p>
                        </div>
                        {!readonly && <button className='btn btn-ghost text-lg btn-sm tooltip' data-tip={isSaved ? "Saved":"Save for later"} onClick={handleSavePost}><i className={isSaved ? 'bx bxs-bookmark' :'bx bx-bookmark'} ></i></button>}
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                        {content?.subjects && content.subjects.map(s => {
                            return <div key={s.id} className="bg-base-200 rounded-full text-xs font-medium flex items-center py-1 px-2">
                            <span>{s.name}</span>
                        </div>
                        })}
                    </div>
                    <div className='flex-1 my-4'>{content.description.limit(150)}</div>
                    <address className='text-sm text-neutral/60'><i className='bx bxs-map-pin mr-1 text-base align-middle'></i> {content.address}</address>
                    <div className="flex items-center">
                        <p className='flex-1'>{content.budget} <span className='text-primary'>{content.budget_currency_code}</span></p>
                        {!readonly && <button className="btn btn-sm btn-primary" onClick={launchBuyModal}><Coin price={content.price} /></button>}
                    </div>
                </div>
            </Link>
            <Confirm type="confirm" popupRef={buyPostRef} onConfirm={handlePostBuy} message={`Buying this post may cost you around ${content.price} <i class='bx bxs-dollar-circle text-yellow-400 text-lg align-middle'></i> , Do you want to proceed?`} />
        </>
    );
}
