import {placeholderImage} from '../../Helpers/appHelper';

export default function Post({content}){
    return (
        <div className="card w-[20rem] shadow">
            <div className="card-body p-4">
                <div className="flex gap-2 items-center mb-2">
                    <img src={placeholderImage('50x50', content.title.substring(0, 1))} alt="" className='rounded' />
                    <div className="flex-1">
                        <h2 className="text-base font-semibold">{content.title}</h2>
                    </div>
                    <button className='btn btn-ghost text-lg btn-sm'><i className='bx bx-dots-horizontal-rounded'></i></button>
                </div>
                <div className='flex-1 text-sm mb-2 text-neutral/70'>{content.description.limit(150)}</div>
                <div className="flex items-center">
                    <p className='flex-1'>{content.price} <span className='text-primary'>{content.budget_currency_code}</span></p>
                    <button className="btn btn-sm btn-primary"><i class='bx bxs-dollar-circle text-yellow-400 text-lg'></i> 130</button>
                </div>
            </div>
        </div>
    );
}
