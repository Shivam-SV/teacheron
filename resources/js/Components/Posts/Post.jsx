import { Link } from '@inertiajs/react';
import {placeholderImage} from '../../Helpers/appHelper';

export default function Post({content}){
    console.log(content);
    return (
        <Link className="w-[25rem] rounded-xl border-neutral/70 shadow p-4" href={route('post.view', btoa(content.id))} >
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center mb-2">
                    <img src={placeholderImage('50x50', content.title.substring(0, 1))} alt="" className='rounded' />
                    <div className="flex-1">
                        <h2 className="text-base font-semibold">{content.title}</h2>
                        <p className="text-xs text-neutral/40">{content.posted_since}</p>
                    </div>
                    <button className='btn btn-ghost text-lg btn-sm tooltip' data-tip="Save for later"><i class='bx bx-bookmark' ></i></button>
                </div>
                <div className='flex gap-2 flex-wrap'>
                    {content?.subjects && content.subjects.map(s => {
                        return <div key={s.id} className="bg-base-200 rounded-full text-xs font-medium flex items-center py-1 px-2">
                        <span>{s.name}</span>
                    </div>
                    })}
                </div>
                <div className='flex-1 my-4'>{content.description.limit(150)}</div>
                <address className='text-sm text-neutral/60'><i class='bx bxs-map-pin mr-1 text-base align-middle'></i> {content.address}</address>
                <div className="flex items-center">
                    <p className='flex-1'>{content.budget} <span className='text-primary'>{content.budget_currency_code}</span></p>
                    <button className="btn btn-sm btn-primary"><i className='bx bxs-dollar-circle text-yellow-400 text-lg'></i> 130</button>
                </div>
            </div>
        </Link>
    );
}
